import { keyManager } from '../utils/keyManager';

export class HuggingFaceService {
  private apiUrl = 'https://router.huggingface.co/v1/chat/completions';
  private fallbackModels = [
    'mistralai/Mistral-7B-Instruct-v0.3',     // Good quality, often available
    'google/flan-t5-xxl',                     // Good for structured tasks
    'gpt2',                                   // Simple, always available
    'distilgpt2',                             // Lightweight GPT-2
    'EleutherAI/gpt-neo-125M',                // Alternative to GPT-2
    'microsoft/DialoGPT-small'                // Good for conversations
  ];

  constructor() {
    const totalKeys = keyManager.getTotalKeys();
    if (totalKeys === 0) {
      console.warn('[HF Service] No Hugging Face API keys found. Set HF_API_KEYS or HF_API_KEY environment variable.');
    } else {
      console.log(`[HF Service] Initialized with ${totalKeys} API key(s)`);
      console.log(`[HF Service] Models available: DeepSeek-V3.2 + ${this.fallbackModels.length} fallbacks`);
    }
  }

  async generate(
    prompt: string, 
    model?: string, 
    maxTokens?: number
  ): Promise<string> {
    const availableKeys = keyManager.getAvailableKeys();
    const totalKeys = keyManager.getTotalKeys();
    
    if (totalKeys === 0) {
      throw new Error('No API keys available. Please configure HF_API_KEYS environment variable.');
    }
    
    console.log(`[HF Service] Generating with ${availableKeys}/${totalKeys} available keys`);

    // Primary model: DeepSeek-V3.2, with fallbacks
    const modelsToTry = [
      model || 'deepseek-ai/DeepSeek-V3.2:novita',
      ...this.fallbackModels
    ];

    console.log(`[HF Service] Will try ${modelsToTry.length} models in sequence`);

    let attempts = 0;
    const maxAttempts = totalKeys * modelsToTry.length; // Try all combinations
    
    while (attempts < maxAttempts) {
      const keyInfo = keyManager.getNextKey();
      
      if (!keyInfo) {
        throw new Error('No available API keys');
      }
      
      const { key: apiKey, index: keyIndex } = keyInfo;
      
      for (const currentModel of modelsToTry) {
        attempts++;
        console.log(`[HF Service] Attempt ${attempts}/${maxAttempts}: Key ${keyIndex + 1}, Model ${currentModel}`);
        
        try {
          const result = await this.tryModel(prompt, currentModel, apiKey, maxTokens);
          
          if (result && result.trim().length > 0) {
            keyManager.recordSuccess(keyIndex);
            console.log(`[HF Service] ✓ Success with key ${keyIndex + 1} and model: ${currentModel}`);
            return result;
          } else {
            throw new Error('Empty response from model');
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Unknown error';
          console.log(`[HF Service] ✗ Failed with key ${keyIndex + 1} and model ${currentModel}: ${errorMessage}`);
          keyManager.recordFailure(keyIndex, errorMessage);
          
          // If key is unauthorized, don't try other models with it
          if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
            console.log(`[HF Service] Key ${keyIndex + 1} is unauthorized, skipping other models with this key`);
            break; // Break out of model loop for this key
          }
          
          // If model not found, continue to next model
          if (errorMessage.includes('Model') && errorMessage.includes('not found')) {
            console.log(`[HF Service] Model ${currentModel} not found, trying next model`);
            continue;
          }
          
          // If specific model is not accessible, continue to next model
          if (errorMessage.includes('not accessible') || errorMessage.includes('no access')) {
            console.log(`[HF Service] Model ${currentModel} not accessible, trying next model`);
            continue;
          }
          
          // For rate limits, try next key (not next model)
          if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
            console.log(`[HF Service] Key ${keyIndex + 1} rate limited, trying next key`);
            break; // Break to try next key
          }
          
          // For timeouts, try next model with same key
          if (errorMessage.includes('timeout') || errorMessage.includes('Timeout')) {
            console.log(`[HF Service] Model ${currentModel} timeout, trying next model`);
            continue;
          }
        }
      }
    }
    
    throw new Error(`All ${attempts} attempts failed across ${totalKeys} keys and ${modelsToTry.length} models. Please check your API keys or try a simpler prompt.`);
  }

  private async tryModel(
    prompt: string,
    model: string,
    apiKey: string,
    maxTokens?: number
  ): Promise<string> {
    // Determine which API to use based on model
    if (this.isInferenceAPIModel(model)) {
      return this.useInferenceAPI(prompt, model, apiKey, maxTokens);
    }
    
    // For chat models, use router API
    return this.useRouterAPI(prompt, model, apiKey, maxTokens);
  }

  private isInferenceAPIModel(model: string): boolean {
    // Models that typically use the inference API (not router API)
    const inferenceModels = ['gpt2', 'distilgpt2', 'gpt-neo', 'DialoGPT', 'flan-t5'];
    return inferenceModels.some(inferenceModel => 
      model.toLowerCase().includes(inferenceModel.toLowerCase())
    );
  }

  private async useRouterAPI(
    prompt: string,
    model: string,
    apiKey: string,
    maxTokens?: number
  ): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      console.log(`[HF Service] Sending to Router API: ${model}`);
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: maxTokens || 300,
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Router API error (${response.status})`;
        
        if (errorText) {
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage += `: ${errorJson.error || errorText.substring(0, 200)}`;
          } catch {
            errorMessage += `: ${errorText.substring(0, 200)}`;
          }
        }
        
        // Provide specific error messages
        if (response.status === 401) {
          errorMessage = 'API key is invalid or unauthorized';
        } else if (response.status === 404) {
          errorMessage = `Model "${model}" not found or not accessible with this API key`;
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded for this API key';
        } else if (response.status === 503) {
          errorMessage = 'Model is currently overloaded, please try again';
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const result = data.choices?.[0]?.message?.content?.trim() || '';
      
      if (!result) {
        throw new Error('Empty response from model');
      }
      
      console.log(`[HF Service] Received ${result.length} chars from ${model}`);
      return result;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout (30s) for model ${model}`);
      }
      throw error;
    }
  }

  private async useInferenceAPI(
    prompt: string,
    model: string,
    apiKey: string,
    maxTokens?: number
  ): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // Longer timeout for inference API

    try {
      console.log(`[HF Service] Sending to Inference API: ${model}`);
      
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: maxTokens || 300,
              temperature: 0.7,
              return_full_text: false,
              do_sample: true,
              top_p: 0.95,
            }
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Inference API error (${response.status})`;
        
        if (errorText) {
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage += `: ${errorJson.error || errorText.substring(0, 200)}`;
          } catch {
            errorMessage += `: ${errorText.substring(0, 200)}`;
          }
        }
        
        // Provide specific error messages
        if (response.status === 401) {
          errorMessage = 'API key is invalid or unauthorized';
        } else if (response.status === 404) {
          errorMessage = `Model "${model}" not found on Inference API`;
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded for this API key';
        } else if (response.status === 503) {
          errorMessage = 'Model is loading, please try again in a few seconds';
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const result = data[0]?.generated_text?.trim() || '';
      
      if (!result) {
        // Try alternative response format
        const textResult = data.generated_text || data[0]?.text || '';
        if (textResult) {
          console.log(`[HF Service] Received ${textResult.length} chars from ${model} (alt format)`);
          return textResult.trim();
        }
        throw new Error('Empty response from model');
      }
      
      console.log(`[HF Service] Received ${result.length} chars from ${model}`);
      return result;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout (45s) for model ${model}`);
      }
      throw error;
    }
  }

  /**
   * Check which models are available with the current API keys
   */
  async getAvailableModels(): Promise<string[]> {
    const availableModels: string[] = [];
    const allModels = ['deepseek-ai/DeepSeek-V3.2:novita', ...this.fallbackModels];
    
    console.log(`[HF Service] Checking availability of ${allModels.length} models...`);
    
    for (const model of allModels) {
      const keyInfo = keyManager.getNextKey();
      if (!keyInfo) break;
      
      try {
        // Simple test request
        const testPrompt = 'Hello';
        const testResult = await this.tryModel(testPrompt, model, keyInfo.key, 5);
        
        if (testResult && testResult.trim().length > 0) {
          availableModels.push(model);
          console.log(`[HF Service] ✓ Model available: ${model}`);
        }
      } catch (error) {
        console.log(`[HF Service] ✗ Model not available: ${model} - ${error.message}`);
        // Don't record failure for this test
      }
    }
    
    return availableModels;
  }
}

export const hfService = new HuggingFaceService();