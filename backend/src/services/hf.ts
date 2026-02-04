export class HuggingFaceService {
  private apiKey: string;
  private apiUrl = 'https://router.huggingface.co/v1/chat/completions';
  private fallbackModels = [
    'gpt2',
    'distilgpt2',
    'EleutherAI/gpt-neo-125M',
    'microsoft/DialoGPT-small'
  ];

  constructor() {
    this.apiKey = process.env.HF_API_KEY || '';
    if (!this.apiKey) {
      console.warn('HF_API_KEY is missing');
    }
  }

  async generate(
    prompt: string, 
    model?: string, 
    maxTokens?: number
  ): Promise<string> {
    const modelsToTry = [
      model || 'deepseek-ai/DeepSeek-V3.2:novita',
      ...this.fallbackModels
    ];

    for (const currentModel of modelsToTry) {
      try {
        console.log(`Trying model: ${currentModel}`);
        
        const result = await this.tryModel(prompt, currentModel, maxTokens);
        
        if (result) {
          console.log(`✓ Success with model: ${currentModel}`);
          return result;
        }
      } catch (error) {
        console.log(`✗ Failed with ${currentModel}:`, error.message);
        // Try next model
      }
    }
    
    throw new Error('All models failed. Please try again later.');
  }

  private async tryModel(
    prompt: string,
    model: string,
    maxTokens?: number
  ): Promise<string> {
    if (model.includes('gpt2') || model.includes('gpt-neo') || model.includes('DialoGPT')) {
      return this.useInferenceAPI(prompt, model, maxTokens);
    }
    
    // For chat models, use router API
    return this.useRouterAPI(prompt, model, maxTokens);
  }

  private async useRouterAPI(
    prompt: string,
    model: string,
    maxTokens?: number
  ): Promise<string> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens || 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Router API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || '';
  }

  private async useInferenceAPI(
    prompt: string,
    model: string,
    maxTokens?: number
  ): Promise<string> {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: maxTokens || 300,
            temperature: 0.7,
            return_full_text: false,
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Inference API error: ${response.status}`);
    }

    const data = await response.json();
    return data[0]?.generated_text?.trim() || '';
  }
}

export const hfService = new HuggingFaceService();