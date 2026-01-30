import { Hono } from 'hono';
import { hfService } from '../services/hf';

const app = new Hono();

app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    const { topic, contentType, tone, difficulty, wordCount } = body;
    
    if (!topic) return c.json({ error: 'Topic required' }, 400);
    
    // Simple prompt like before
    const prompt = `Write a ${contentType} about ${topic} in ${tone} tone`;
    
    const maxTokens = Math.ceil(wordCount * 1.3);
    const result = await hfService.generate(prompt, undefined, maxTokens);
    
    return c.json({ success: true, result });
    
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});
// Helper function to construct system prompts (hidden from user)
function constructSystemPrompt(
  contentType: string, 
  tone: string, 
  difficulty: string,
  wordCount: number
): string {
  
  const contentTypeMap: Record<string, string> = {
    paragraph: `Write a single, well-structured paragraph of approximately ${wordCount} words.`,
    essay: `Write a structured essay of approximately ${wordCount} words with introduction, body paragraphs, and conclusion.`,
    letter: `Write a letter of approximately ${wordCount} words with appropriate greeting, body, and closing.`,
    summary: `Write a concise summary of approximately ${wordCount} words focusing on key points.`,
    report: `Write a factual report of approximately ${wordCount} words with clear sections and objective language.`
  };

  const toneMap: Record<string, string> = {
    academic: `Use formal, scholarly language with proper terminology.`,
    casual: `Use conversational, friendly language.`,
    professional: `Use business-appropriate, clear, and concise language.`,
    creative: `Use descriptive, engaging language with vivid imagery.`,
    persuasive: `Use convincing arguments and rhetorical devices.`
  };

  const difficultyMap: Record<string, string> = {
    easy: `Use simple vocabulary and straightforward sentence structures for beginners.`,
    medium: `Use moderate vocabulary with some complex sentences. Include explanations where needed.`,
    pro: `Use sophisticated vocabulary, complex sentence structures, and nuanced analysis.`
  };

  // ADD THIS LINE AT THE BEGINNING:
  return `
Write in English.

${contentTypeMap[contentType] || contentTypeMap.paragraph}
${toneMap[tone] || toneMap.academic}
${difficultyMap[difficulty] || difficultyMap.easy}

Respond with only the requested content, no meta-commentary or notes about the task.
`;
}

export default app;