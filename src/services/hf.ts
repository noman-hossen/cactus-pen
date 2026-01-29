export class HuggingFaceService {
  private apiKey: string;
  private apiUrl = 'https://router.huggingface.co/v1/chat/completions';

  constructor() {
    this.apiKey = process.env.HF_API_KEY || '';
    if (!this.apiKey) {
      console.warn('HF_API_KEY is missing from environment variables');
    } else {
      console.log('HF_API_KEY loaded (first 5 chars):', this.apiKey.substring(0, 5) + '...');
    }
  }

  async generate(
    prompt: string, 
    model?: string, 
    maxTokens?: number
  ): Promise<string> {
    try {
      // CORRECT MODEL NAME: Use the exact format from your working HTML
      const targetModel = model || 'deepseek-ai/DeepSeek-V3.2:novita';
      console.log(`Generating with model: ${targetModel}`);
      console.log(`Prompt: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: targetModel,  // Use the correct model name
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: maxTokens || 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Hugging Face API error:', errorData);
        throw new Error(`HF API Error ${response.status}: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const result = data.choices?.[0]?.message?.content || '';
      
      if (!result) {
        console.warn('Empty response from Hugging Face:', data);
      }
      
      console.log(`Success! Generated ${result.length} characters`);
      return result.trim();

    } catch (error: any) {
      console.error('Hugging Face service error:', error.message);
      throw new Error(`Failed to generate: ${error.message}`);
    }
  }
}

export const hfService = new HuggingFaceService();