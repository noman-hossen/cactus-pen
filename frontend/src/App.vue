<template>
  <div class="app">
    <div class="container">
      <header>
        <h1>🤖 AI Paragraph Writer</h1>
        <p>Generate natural language paragraphs using DeepSeek AI</p>
      </header>
      
      <main>
        <div class="generator-card">
          <div class="input-section">
            <label for="prompt">Enter your prompt:</label>
            <textarea
              id="prompt"
              v-model="prompt"
              placeholder="Write a paragraph about artificial intelligence..."
              rows="4"
              @keydown.enter.prevent="handleEnter"
            ></textarea>
            
            <div class="controls">
              <div class="token-control">
                <label for="maxTokens">Max Tokens:</label>
                <input
                  id="maxTokens"
                  v-model.number="maxTokens"
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                >
                <span>{{ maxTokens }}</span>
              </div>
              
              <button
                @click="generateParagraph"
                :disabled="loading || !prompt.trim()"
                class="generate-btn"
              >
                {{ loading ? '🔄 Generating...' : '✨ Generate Paragraph' }}
              </button>
            </div>
          </div>
          
          <div v-if="result" class="result-section">
            <h3>📝 Generated Paragraph:</h3>
            <div class="result-box">
              <p>{{ result }}</p>
            </div>
            <div class="result-actions">
              <button @click="copyToClipboard" class="action-btn">
                📋 Copy to Clipboard
              </button>
              <button @click="generateNew" class="action-btn">
                🆕 Generate New
              </button>
            </div>
          </div>
          
          <div v-if="error" class="error-section">
            <h3>⚠️ Error:</h3>
            <div class="error-box">
              <p>{{ error }}</p>
            </div>
            <button @click="clearError" class="action-btn">
              ❌ Clear Error
            </button>
          </div>
          
          <div v-if="loading" class="loading-section">
            <div class="spinner"></div>
            <p>AI is writing your paragraph... This may take a few seconds.</p>
          </div>
        </div>
        
        <div class="info-card">
          <h3>💡 Tips:</h3>
          <ul>
            <li>Be specific with your prompts for better results</li>
            <li>Increase max tokens for longer paragraphs</li>
            <li>Try different topics: technology, science, stories, etc.</li>
            <li>Edit the generated text as needed</li>
          </ul>
          
          <div class="examples">
            <h4>📚 Example Prompts:</h4>
            <div class="example-buttons">
              <button @click="setExample('Write a paragraph about the benefits of renewable energy.')" class="example-btn">
                Renewable Energy
              </button>
              <button @click="setExample('Describe how artificial intelligence is transforming healthcare.')" class="example-btn">
                AI in Healthcare
              </button>
              <button @click="setExample('Write a short story about a time-traveling historian.')" class="example-btn">
                Time Travel Story
              </button>
              <button @click="setExample('Explain quantum computing in simple terms.')" class="example-btn">
                Quantum Computing
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer>
        <p>
          Powered by <strong>DeepSeek-V3.2</strong> via Hugging Face Router API •
          Backend running on <code>localhost:3000</code>
        </p>
        <p class="status" :class="{ 'connected': isConnected }">
          {{ isConnected ? '✅ Connected to backend' : '❌ Backend not detected' }}
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const prompt = ref('')
const maxTokens = ref(300)
const result = ref('')
const error = ref('')
const loading = ref(false)
const isConnected = ref(false)

// Backend URL - change if your backend is on a different port/URL
const API_URL = 'http://localhost:3000/api/generate'

// Check backend connection on mount
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000')
    if (response.ok) {
      isConnected.value = true
    }
  } catch (err) {
    console.log('Backend not detected, make sure it\'s running on port 3000')
  }
})

const generateParagraph = async () => {
  if (!prompt.value.trim()) {
    error.value = 'Please enter a prompt'
    return
  }

  loading.value = true
  error.value = ''
  result.value = ''

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.value,
        model: 'deepseek-ai/DeepSeek-V3.2:novita',
        max_tokens: maxTokens.value
      })
    })

    const data = await response.json()

    if (response.ok && data.success) {
      result.value = data.result
    } else {
      error.value = data.message || data.error || 'Failed to generate paragraph'
    }
  } catch (err) {
    error.value = `Network error: ${err.message}. Make sure the backend is running.`
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(result.value)
    alert('Copied to clipboard!')
  } catch (err) {
    error.value = 'Failed to copy to clipboard'
  }
}

const generateNew = () => {
  result.value = ''
  prompt.value = ''
}

const clearError = () => {
  error.value = ''
}

const setExample = (examplePrompt) => {
  prompt.value = examplePrompt
  error.value = ''
  result.value = ''
}

const handleEnter = (e) => {
  if (e.ctrlKey || e.metaKey) {
    generateParagraph()
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5em;
}

header p {
  color: #666;
  font-size: 1.2em;
}

.generator-card, .info-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border-left: 5px solid #667eea;
}

.input-section {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  font-size: 1.1em;
}

textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  margin-bottom: 20px;
  transition: border-color 0.3s;
}

textarea:focus {
  outline: none;
  border-color: #667eea;
}

.controls {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.token-control {
  flex: 1;
  min-width: 200px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.token-control input[type="range"] {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
}

.token-control input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
}

.generate-btn {
  padding: 15px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 200px;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-section, .error-section {
  margin-top: 30px;
  animation: fadeIn 0.5s ease;
}

.result-section h3, .error-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.result-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  line-height: 1.8;
  margin-bottom: 20px;
  white-space: pre-wrap;
}

.error-box {
  background: #fee;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e74c3c;
  color: #c0392b;
  margin-bottom: 20px;
}

.result-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #e0e0e0;
}

.loading-section {
  text-align: center;
  padding: 30px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.info-card h3 {
  margin-bottom: 20px;
  color: #333;
}

.info-card ul {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.info-card li {
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
}

.info-card li:before {
  content: "✓";
  color: #667eea;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.examples h4 {
  margin-bottom: 15px;
  color: #333;
}

.example-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.example-btn {
  padding: 8px 16px;
  background: #e3e8ff;
  border: 2px solid #667eea;
  border-radius: 8px;
  color: #667eea;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.example-btn:hover {
  background: #667eea;
  color: white;
}

footer {
  text-align: center;
  margin-top: 40px;
  color: #666;
  font-size: 14px;
}

footer .status {
  margin-top: 10px;
  font-weight: bold;
}

footer .status.connected {
  color: #27ae60;
}

footer .status:not(.connected) {
  color: #e74c3c;
}

code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
  
  .generator-card, .info-card {
    padding: 20px;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .generate-btn {
    width: 100%;
  }
}
</style>