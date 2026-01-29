<template>
  <div class="paragraph-generator">
    <div class="form-group">
      <label for="prompt">Enter your prompt:</label>
      <textarea 
        id="prompt" 
        v-model="prompt" 
        placeholder="Write a short paragraph about renewable energy..."
        rows="4"
      ></textarea>
    </div>

    <div class="advanced-options" v-if="showAdvanced">
      <div class="form-group">
        <label for="model">Model:</label>
        <input 
          id="model" 
          v-model="model" 
          type="text" 
          placeholder="DeepSeek-V3.2"
        >
      </div>
      <div class="form-group">
        <label for="maxTokens">Max Tokens:</label>
        <input 
          id="maxTokens" 
          v-model="maxTokens" 
          type="number" 
          min="50" 
          max="1000"
        >
      </div>
    </div>

    <div class="controls">
      <button @click="toggleAdvanced" class="btn-secondary">
        {{ showAdvanced ? 'Hide' : 'Show' }} Advanced Options
      </button>
      <button 
        @click="generateParagraph" 
        :disabled="loading || !prompt.trim()"
        class="btn-primary"
      >
        {{ loading ? 'Generating...' : 'Generate Paragraph' }}
      </button>
    </div>

    <div v-if="result" class="result">
      <h3>Generated Paragraph:</h3>
      <div class="result-content">
        {{ result }}
      </div>
      <button @click="copyToClipboard" class="btn-secondary">
        Copy to Clipboard
      </button>
    </div>

    <div v-if="error" class="error">
      <h3>Error:</h3>
      <p>{{ error }}</p>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>AI is writing your paragraph...</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ParagraphGenerator',
  setup() {
    const prompt = ref('')
    const model = ref('DeepSeek-V3.2')
    const maxTokens = ref(300)
    const result = ref('')
    const error = ref('')
    const loading = ref(false)
    const showAdvanced = ref(false)

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    const generateParagraph = async () => {
      if (!prompt.value.trim()) {
        error.value = 'Please enter a prompt'
        return
      }

      loading.value = true
      error.value = ''
      result.value = ''

      try {

  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt.value,
      model: 'deepseek-ai/DeepSeek-V3.2:novita',  // Add this exact model name
      max_tokens: maxTokens.value
    })
  })
        const data = await response.json()

        if (response.ok) {
          result.value = data.result
        } else {
          error.value = data.message || 'Failed to generate paragraph'
        }
      } catch (err) {
        error.value = 'Network error. Please check your connection.'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const toggleAdvanced = () => {
      showAdvanced.value = !showAdvanced.value
    }

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(result.value)
        alert('Copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    return {
      prompt,
      model,
      maxTokens,
      result,
      error,
      loading,
      showAdvanced,
      generateParagraph,
      toggleAdvanced,
      copyToClipboard
    }
  }
}
</script>

<style scoped>
.paragraph-generator {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: #333;
}

textarea, input {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

textarea:focus, input:focus {
  outline: none;
  border-color: #667eea;
}

textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.advanced-options {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.advanced-options .form-group {
  flex: 1;
  min-width: 200px;
}

.controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 2;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  flex: 1;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.result {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.result h3 {
  margin-top: 0;
  color: #333;
}

.result-content {
  white-space: pre-wrap;
  line-height: 1.6;
  margin: 15px 0;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.error {
  padding: 20px;
  background: #fee;
  border-radius: 12px;
  border-left: 4px solid #e74c3c;
  color: #c0392b;
}

.loading {
  text-align: center;
  padding: 30px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>