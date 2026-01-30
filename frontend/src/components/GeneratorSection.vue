<template>
  <div class="generator-wireframe">
    <h1>Generate Paragraphs with AI! 🌵</h1>
    <p class="subtitle">Input a topic and instantly get AI-generated content</p>

    <!-- Main Inputs Row -->
    <div class="input-row">
      <div class="input-group">
        <label for="topic">Topic/Subject</label>
        <input 
          v-model="topic"
          id="topic"
          type="text"
          placeholder="Enter your main topic..."
          class="topic-input"
          @keyup.enter="generateContent"
        />
      </div>

      <div class="input-group">
        <label for="context">Additional Context (Optional)</label>
        <input 
          v-model="context"
          id="context"
          type="text"
          placeholder="Any specific instructions or context..."
          class="topic-input"
        />
      </div>
    </div>

    <!-- Control Row 1: Dropdowns -->
    <div class="controls-row">
      <div class="control-group">
        <label for="contentType">Content Type</label>
        <select v-model="contentType" id="contentType" class="dropdown">
          <option value="paragraph">Paragraph</option>
          <option value="essay">Essay</option>
          <option value="letter">Letter</option>
          <option value="summary">Summary</option>
          <option value="report">Report</option>
          <option value="blog">Blog Post</option>
          <option value="story">Short Story</option>
        </select>
      </div>

      <div class="control-group">
        <label for="tone">Tone</label>
        <select v-model="tone" id="tone" class="dropdown">
          <option value="academic">Academic</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="creative">Creative</option>
          <option value="persuasive">Persuasive</option>
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>

      <div class="control-group">
        <label for="difficulty">Difficulty Level</label>
        <select v-model="difficulty" id="difficulty" class="dropdown">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>

    <!-- Control Row 2: Word Count Slider -->
    <div class="slider-row">
      <div class="slider-group">
        <div class="slider-header">
          <label for="wordCount">Word Count</label>
          <span class="word-count-value">{{ wordCount }} words</span>
        </div>
        <input 
          v-model="wordCount"
          id="wordCount"
          type="range"
          min="50"
          max="1000"
          step="50"
          class="word-slider"
          @input="updateSliderValue"
        />
        <div class="slider-labels">
          <span>50</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1000</span>
        </div>
      </div>
    </div>

    <!-- Generate Button -->
    <button 
      @click="generateContent"
      :disabled="loading || !topic.trim()"
      class="generate-btn"
    >
      <span v-if="loading" class="spinner-small"></span>
      {{ loading ? 'Generating...' : 'Generate Content' }}
    </button>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      {{ error }}
    </div>

    <!-- Output Section -->
    <div v-if="showOutput" class="output-section">
      <div class="output-header">
        <h2>📝 Generated Output</h2>
        <div class="output-stats">
          <div class="stat-badge">
            <i class="fas fa-font"></i>
            <span>{{ wordCountDisplay }} words</span>
          </div>
          <div class="stat-badge">
            <i class="fas fa-file-alt"></i>
            <span>{{ contentType }}</span>
          </div>
          <div class="stat-badge">
            <i class="fas fa-volume-up"></i>
            <span>{{ tone }}</span>
          </div>
          <div class="stat-badge">
            <i class="fas fa-chart-line"></i>
            <span>{{ difficulty }}</span>
          </div>
        </div>
      </div>
      
      <div class="output-content">
        <div class="content-wrapper">
          <pre>{{ result }}</pre>
        </div>
        <div class="copy-action">
          <button @click="copyToClipboard" class="copy-btn">
            <i class="fas fa-copy"></i>
            Copy to Clipboard
          </button>
        </div>
      </div>
      
      <!-- Export Actions -->
      <div class="export-actions">
        <h3>Export Options</h3>
        <div class="action-buttons">
          <button @click="downloadTXT" class="action-btn">
            <i class="fas fa-file-alt"></i>
            <span>TXT File</span>
          </button>
          
          <button @click="downloadPDF" class="action-btn primary">
            <i class="fas fa-file-pdf"></i>
            <span>PDF Export</span>
          </button>
          
          <button @click="shareContent" class="action-btn">
            <i class="fas fa-share-alt"></i>
            <span>Share</span>
          </button>
          
          <button @click="generateNew" class="action-btn secondary">
            <i class="fas fa-redo"></i>
            <span>New Content</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>AI is crafting your content...</p>
      <p class="loading-subtitle">This usually takes 10-30 seconds</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const topic = ref('')
const context = ref('')
const contentType = ref('paragraph')
const tone = ref('academic')
const difficulty = ref('medium')
const wordCount = ref(250)
const result = ref('')
const loading = ref(false)
const showOutput = ref(false)
const error = ref('')

const API_URL = 'http://localhost:3000/api/generate'

// Computed properties
const wordCountDisplay = computed(() => {
  return result.value ? result.value.trim().split(/\s+/).length : wordCount.value
})

const updateSliderValue = (event) => {
  wordCount.value = parseInt(event.target.value)
}

const generateContent = async () => {
  error.value = ''
  result.value = ''
  showOutput.value = false
  
  if (!topic.value.trim()) {
    error.value = 'Please enter a topic'
    return
  }

  loading.value = true

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: topic.value,
        context: context.value,
        contentType: contentType.value,
        tone: tone.value,
        difficulty: difficulty.value,
        wordCount: wordCount.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP error ${response.status}`)
    }

    if (data.success) {
      result.value = data.result
      showOutput.value = true
    } else {
      error.value = data.message || 'Failed to generate content'
    }

  } catch (err) {
    console.error('Error:', err)
    error.value = `Error: ${err.message}. Make sure the backend server is running.`
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(result.value)
    // Show temporary success message
    const btn = event.target.closest('button')
    const originalText = btn.innerHTML
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!'
    setTimeout(() => {
      btn.innerHTML = originalText
    }, 2000)
  } catch (err) {
    error.value = 'Failed to copy to clipboard'
  }
}

const downloadTXT = () => {
  const content = `
CACTUS-PEN AI GENERATED CONTENT
================================
Topic: ${topic.value}
Context: ${context.value || 'None'}
Type: ${contentType.value}
Tone: ${tone.value}
Difficulty: ${difficulty.value}
Target Word Count: ${wordCount.value}
Generated: ${new Date().toLocaleString()}

${result.value}
================================
Generated by CactusPen AI - Free AI writing assistant
  `
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `cactuspen-${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const downloadPDF = () => {
  try {
    const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>CactusPen AI - Generated Content</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #0aecd0;
        }
        .header h1 {
          color: #1a2a24;
          margin-bottom: 10px;
        }
        .metadata {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 30px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }
        .metadata-item {
          display: flex;
          flex-direction: column;
        }
        .metadata-label {
          font-weight: bold;
          color: #666;
          font-size: 0.9em;
        }
        .metadata-value {
          font-size: 1.1em;
          color: #1a2a24;
        }
        .content {
          font-size: 14px;
          line-height: 1.8;
          text-align: justify;
        }
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          text-align: center;
          color: #666;
          font-size: 0.9em;
        }
        @media print {
          body {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🌵 CactusPen AI</h1>
        <p>AI-Powered Writing Assistant</p>
      </div>
      
      <div class="metadata">
        <div class="metadata-item">
          <span class="metadata-label">Topic:</span>
          <span class="metadata-value">${topic.value}</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Context:</span>
          <span class="metadata-value">${context.value || 'None'}</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Content Type:</span>
          <span class="metadata-value">${contentType.value}</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Tone:</span>
          <span class="metadata-value">${tone.value}</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Difficulty:</span>
          <span class="metadata-value">${difficulty.value}</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Word Count:</span>
          <span class="metadata-value">${wordCountDisplay.value}</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Generated:</span>
          <span class="metadata-value">${new Date().toLocaleString()}</span>
        </div>
      </div>
      
      <div class="content">
        ${result.value.replace(/\n/g, '<br>')}
      </div>
      
      <div class="footer">
        <p>Generated by CactusPen AI - Free AI writing assistant for students</p>
        <p>🌵 No login required • 📄 PDF Export • 🔒 Privacy First</p>
      </div>
    </body>
    </html>
    `
    
    const printWindow = window.open('', '_blank')
    printWindow.document.write(pdfContent)
    printWindow.document.close()
    
    printWindow.onload = function() {
      printWindow.print()
      printWindow.onafterprint = function() {
        printWindow.close()
      }
    }
    
  } catch (err) {
    console.error('PDF generation error:', err)
    error.value = 'Failed to generate PDF. Please try again.'
  }
}

const shareContent = () => {
  if (navigator.share) {
    navigator.share({
      title: `CactusPen AI: ${topic.value}`,
      text: result.value.substring(0, 100) + '...',
      url: window.location.href,
    })
    .catch(console.error)
  } else {
    copyToClipboard()
    alert('Content copied to clipboard. You can now paste and share it.')
  }
}

const generateNew = () => {
  topic.value = ''
  context.value = ''
  result.value = ''
  showOutput.value = false
  error.value = ''
  contentType.value = 'paragraph'
  tone.value = 'academic'
  difficulty.value = 'medium'
  wordCount.value = 250
}
</script>

<style scoped>
/* Color Variables */
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --secondary-dark: #7b886b;
  --text-light: #f5f9f7;
  --text-dark: #1a2a24;
  --glass-bg: rgba(255, 255, 255, 0.92);
  --glass-border: rgba(138, 187, 146, 0.2);
}

.generator-wireframe {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(123, 136, 107, 0.15);
  margin-bottom: 40px;
  position: relative;
}

.generator-wireframe h1 {
  margin-bottom: 12px;
  color: var(--text-dark);
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary-dark), var(--secondary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: var(--secondary-dark);
  margin-bottom: 35px;
  font-size: 1.1rem;
  opacity: 0.8;
}

/* Input Row */
.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .input-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 8px;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
}

.topic-input {
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  border: 2px solid rgba(138, 187, 146, 0.3);
  border-radius: 10px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-dark);
}

.topic-input:focus {
  outline: none;
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(10, 236, 208, 0.1);
}

.topic-input::placeholder {
  color: var(--secondary-light);
  opacity: 0.6;
}

/* Controls Row */
.controls-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .controls-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

.control-group {
  display: flex;
  flex-direction: column;
}

.control-group label {
  margin-bottom: 8px;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
}

.dropdown {
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  border: 2px solid rgba(138, 187, 146, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-dark);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%237b886b' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 16px;
}

.dropdown:focus {
  outline: none;
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(10, 236, 208, 0.1);
}

/* Slider Row */
.slider-row {
  margin-bottom: 30px;
}

.slider-group {
  display: flex;
  flex-direction: column;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.slider-header label {
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
}

.word-count-value {
  color: var(--primary-dark);
  font-weight: 700;
  font-size: 1.1rem;
}

.word-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--primary-light), var(--primary-dark));
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}

.word-slider:hover {
  opacity: 1;
}

.word-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary-dark);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.word-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary-dark);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: var(--secondary-dark);
  font-size: 0.85rem;
  opacity: 0.7;
}

/* Generate Button */
.generate-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, var(--primary-dark), var(--secondary-light));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(10, 236, 208, 0.3);
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.spinner-small {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Error Message */
.error-message {
  margin-top: 20px;
  padding: 16px 20px;
  background: rgba(231, 76, 60, 0.1);
  border-left: 4px solid #e74c3c;
  border-radius: 8px;
  color: #c0392b;
  font-size: 0.95em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.error-message i {
  font-size: 1.2em;
}

/* Output Section */
.output-section {
  margin-top: 40px;
  padding: 30px;
  background: rgba(148, 221, 188, 0.05);
  border-radius: 12px;
  border: 2px solid var(--glass-border);
  animation: fadeIn 0.5s ease;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.output-header h2 {
  color: var(--text-dark);
  font-size: 1.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.output-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat-badge {
  padding: 8px 14px;
  background: white;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 500;
  color: var(--text-dark);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-badge i {
  color: var(--primary-dark);
  font-size: 0.9em;
}

.output-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 1px solid var(--glass-border);
}

.content-wrapper {
  background: #f9f9f9;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.content-wrapper pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.7;
  color: var(--text-dark);
  font-size: 1.05em;
  margin: 0;
  font-family: inherit;
}

.copy-action {
  display: flex;
  justify-content: flex-end;
}

.copy-btn {
  padding: 12px 24px;
  background: var(--primary-light);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.copy-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(10, 236, 208, 0.2);
}

/* Export Actions */
.export-actions {
  padding-top: 25px;
  border-top: 2px solid var(--glass-border);
}

.export-actions h3 {
  margin-bottom: 25px;
  color: var(--text-dark);
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.action-btn {
  padding: 16px;
  border: 2px solid var(--glass-border);
  background: white;
  color: var(--text-dark);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(138, 187, 146, 0.2);
  border-color: var(--primary-dark);
}

.action-btn.primary {
  border-color: var(--primary-dark);
  background: var(--primary-dark);
  color: white;
}

.action-btn.primary:hover {
  background: #09d9bf;
  border-color: #09d9bf;
  box-shadow: 0 8px 20px rgba(10, 236, 208, 0.3);
}

.action-btn.secondary {
  border-color: var(--secondary-dark);
  color: var(--secondary-dark);
}

.action-btn.secondary:hover {
  background: var(--secondary-dark);
  color: white;
}

.action-btn i {
  font-size: 1.1em;
}

/* Loading State */
.loading-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  z-index: 10;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(148, 221, 188, 0.2);
  border-top: 4px solid var(--primary-dark);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 25px;
}

.loading-state p {
  color: var(--text-dark);
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 5px;
}

.loading-subtitle {
  color: var(--secondary-dark);
  font-size: 0.9em;
  opacity: 0.7;
  margin-top: 5px;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>