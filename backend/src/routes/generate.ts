import { Hono } from 'hono';
import { hfService } from '../services/hf';
import { keyManager } from '../utils/keyManager';

const app = new Hono();

app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    
    // Accept both "topic" and "prompt" for compatibility
    const topic = body.topic || body.prompt;
    const { contentType = 'paragraph', tone = 'academic', wordCount = 250 } = body;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return c.json(
        { success: false, message: 'Topic is required' },
        400
      );
    }

    // Validate word count
    const parsedWordCount = parseInt(wordCount, 10);
    if (isNaN(parsedWordCount) || parsedWordCount < 50 || parsedWordCount > 2000) {
      return c.json(
        { success: false, message: 'Word count must be between 50 and 2000' },
        400
      );
    }

    console.log(`[Generate] Generating ${contentType} about: "${topic}"`);
    const stats = keyManager.getStatistics();
    console.log(`[Generate] API Key stats: ${stats.availableKeys}/${stats.totalKeys} available`);

    // Build the prompt using your EXACT structure
    const prompt = `write a ${contentType} about ${topic} around ${wordCount} words in a ${tone} tone`;

    console.log('[Generate] Sending prompt to AI');
    
    // Estimate tokens (approx 1.3 tokens per word)
    const maxTokens = Math.ceil(parsedWordCount * 1.3);
    
    const result = await hfService.generate(prompt, undefined, maxTokens);

    // Update statistics after successful generation
    const updatedStats = keyManager.getStatistics();

    return c.json({
      success: true,
      result: result,
      metadata: {
        contentType,
        tone,
        wordCount: parsedWordCount,
        generatedWords: result.trim().split(/\s+/).length,
        timestamp: new Date().toISOString(),
        api_keys: {
          total: updatedStats.totalKeys,
          available: updatedStats.availableKeys,
          success_rate: Math.round(updatedStats.successRate * 100) / 100,
        }
      }
    });

  } 
    }
    
    // Check if all keys are rate limited
    if (stats.availableKeys === 0 && stats.totalKeys > 0) {
      return c.json(
        { 
          success: false, 
          message: 'All API keys are currently rate limited. Please try again in a minute.',
          error_type: 'rate_limit',
          retry_after: 60,
          keys_rate_limited: stats.rateLimitedKeys,
        }, 
        429
      );
    }
    
    // Handle specific error types
    if (error.message.includes('Request timeout')) {
      return c.json(
        { 
          success: false, 
          message: 'Request timed out. The AI service may be overloaded.',
          error_type: 'timeout',
          solution: 'Try again with a shorter word count or wait a few moments'
        },    } catch (error: any) {
      console.error('[Generate] Error:', error.message);
      
      const stats = keyManager.getStatistics();
      
      // Better error messages
      if (error.message.includes('No API keys available')) {
        return c.json(
          { 
            success: false, 
            message: 'No API keys configured. Please set up Hugging Face API keys.',
            error_type: 'api_config',
            solution: 'Add HF_API_KEYS environment variable with comma-separated API keys'
          }, 
          500
        );
      }
      
      // Check if it's a model availability error
      if (error.message.includes('not found') || error.message.includes('not accessible')) {
        return c.json(
          { 
            success: false, 
            message: `Model access error: ${error.message}`,
            error_type: 'model_access',
            solution: 'Your API keys may not have access to the requested model. The system will try alternative models.'
          }, 
          500
        );
      }
      
      // Check if all attempts failed
      if (error.message.includes('All') && error.message.includes('attempts failed')) {
        return c.json(
          { 
            success: false, 
            message: 'All API keys and models failed. This could be due to: 1) Invalid API keys, 2) Rate limits on all keys, 3) Network issues',
            error_type: 'all_failed',
            api_key_status: {
              total_keys: stats.totalKeys,
              available_keys: stats.availableKeys,
              rate_limited_keys: stats.rateLimitedKeys,
            },
            solution: 'Please check your API keys have proper access, or try again later.'
          }, 
          500
        );
      }
      
      // Handle rate limits
      if (error.message.includes('Rate limit')) {
        return c.json(
          { 
            success: false, 
            message: 'Rate limit exceeded. Please try again in a minute.',
            error_type: 'rate_limit',
            retry_after: 60,
            keys_rate_limited: stats.rateLimitedKeys,
          }, 
          429
        );
      }
      
      // Handle timeouts
      if (error.message.includes('timeout') || error.message.includes('Timeout')) {
        return c.json(
          { 
            success: false, 
            message: 'Request timed out. The AI service may be overloaded.',
            error_type: 'timeout',
            solution: 'Try again with a shorter prompt or wait a few moments'
          }, 
          504
        );
      }
      
      // Generic error
      return c.json(
        { 
          success: false, 
          message: error.message || 'Failed to generate content',
          error_type: 'generation_failed',
          api_key_status: {
            total_keys: stats.totalKeys,
            available_keys: stats.availableKeys,
          }
        }, 
        500
      );
    }
  }
});

// Add admin endpoints for API key management
app.get('/api/keys/status', async (c) => {
  const stats = keyManager.getStatistics();
  
  return c.json({
    success: true,
    status: 'ok',
    data: {
      keys: stats.keys.map(key => ({
        index: key.index,
        masked_key: key.maskedKey,
        success_count: key.successCount,
        failure_count: key.failureCount,
        is_rate_limited: key.isRateLimited,
        rate_limit_until: key.rateLimitUntil,
        last_used: key.lastUsed,
        consecutive_failures: key.consecutiveFailures,
      })),
      summary: {
        total_keys: stats.totalKeys,
        available_keys: stats.availableKeys,
        rate_limited_keys: stats.rateLimitedKeys,
        total_success: stats.totalSuccess,
        total_failures: stats.totalFailures,
        success_rate: Math.round(stats.successRate * 100) / 100,
      }
    }
  });
});

// Optional: Endpoint to manually reset a key's rate limit
app.post('/api/keys/:index/reset', async (c) => {
  const index = parseInt(c.req.param('index'), 10);
  
  if (isNaN(index) || index < 0) {
    return c.json({ success: false, message: 'Invalid key index' }, 400);
  }
  
  keyManager.resetRateLimit(index);
  
  return c.json({
    success: true,
    message: `Rate limit reset for key ${index}`,
    key_index: index,
  });
});

export default app;