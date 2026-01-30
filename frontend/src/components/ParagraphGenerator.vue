<template>
  <div class="generator-container">
    <!-- Topic Input Section -->
    <div class="topic-section">
      <label for="topic">📝 What would you like to write about?</label>
      <input
        id="topic"
        v-model="topic"
        type="text"
        placeholder="Enter your topic (e.g., 'climate change', 'artificial intelligence', 'ancient Rome')"
        @keyup.enter="generateContent"
        class="topic-input"
      />
      <p class="topic-hint">Be specific for better results! Try: "benefits of renewable energy" or "impact of AI on healthcare"</p>
    </div>

    <!-- Controls Grid -->
    <div class="controls-grid">
      <!-- Content Type -->
      <div class="control-card">
        <label class="control-label">
          <span class="control-icon">📄</span>
          Content Type
        </label>
        <div class="control-options">
          <button
            v-for="type in contentTypes"
            :key="type.value"
            @click="contentType = type.value"
            :class="{ active: contentType === type.value }"
            class="control-btn"
          >
            {{ type.icon }} {{ type.label }}
          </button>
        </div>
      </div>

      <!-- Tone -->
      <div class="control-card">
        <label class="control-label">
          <span class="control-icon">🎭</span>
          Writing Tone
        </label>
        <div class="control-options">
          <button
            v-for="toneOption in tones"
            :key="toneOption.value"
            @click="tone = toneOption.value"
            :class="{ active: tone === toneOption.value }"
            class="control-btn"
          >
            {{ toneOption.icon }} {{ toneOption.label }}
          </button>
        </div>
      </div>

      <!-- Difficulty -->
      <div class="control-card">
        <label class="control-label">
          <span class="control-icon">⚡</span>
          Difficulty Level
        </label>
        <div class="control-options">
          <button
            v-for="level in difficultyLevels"
            :key="level.value"
            @click="difficulty = level.value"
            :class="{ active: difficulty === level.value }"
            class="control-btn"
          >
            {{ level.icon }} {{ level.label }}
          </button>
        </div>
      </div>

      <!-- Word Count -->
      <div class="control-card">
        <label class="control-label">
          <span class="control-icon">📏</span>
          Length: <strong>{{ wordCount }} words</strong>
        </label>
        <div class="slider-container">
          <input
            type="range"
            v-model="wordCount"
            min="50"
            max="500"
            step="10"
            class="word-slider"
          />
          <div class="slider-labels">
            <span>Short</span>
            <span>Medium</span>
            <span>Long</span>
          </div>
          <div class="word-presets">
            <button
              v-for="preset in wordPresets"
              :key="preset.value"
              @click="wordCount = preset.value"
              :class="{ active: wordCount === preset.value }"
              class="preset-btn"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Templates -->
    <div class="templates-section">
      <label class="control-label">
        <span class="control-icon">🚀</span>
        Quick Templates
      </label>
      <div class="templates-grid">
        <button
          v-for="template in quickTemplates"
          :key="template.label"
          @click="applyTemplate(template)"
          class="template-btn"
        >
          <span class="template-icon">{{ template.icon }}</span>
          <span class="template-label">{{ template.label }}</span>
          <span class="template-desc">{{ template.desc }}</span>
        </button>
      </div>
    </div>

    <!-- Generate Button -->
    <div class="generate-section">
      <button
        @click="generateContent"
        :disabled="loading || !topic.trim()"
        class="generate-button"
      >
        <span v-if="loading" class="loading-indicator">
          <span class="spinner"></span>
          Generating...
        </span>
        <span v-else>
          ✨ Generate {{ contentType }} →
        </span>
      </button>
      <p class="settings-summary" v-if="topic">
        Creating a <strong>{{ difficulty }}</strong> {{ contentType }} 
        in <strong>{{ tone }}</strong> tone about: "{{ topic }}"
      </p>
    </div>

    <!-- Results -->
    <div v-if="result" class="result-section">
      <div class="result-header">
        <h3>📝 Your Generated {{ contentType.charAt(0).toUpperCase() + contentType.slice(1) }}</h3>
        <div class="result-meta">
          <span class="meta-tag">{{ tone }}</span>
          <span class="meta-tag">{{ difficulty }}</span>
          <span class="meta-tag">{{ wordCount }} words</span>
        </div>
      </div>
      
      <div class="result-content">
        <p>{{ result }}</p>
      </div>

      <div class="result-actions">
        <button @click="copyToClipboard" class="action-btn">
          📋 Copy Text
        </button>
        <button @click="downloadPDF" class="action-btn primary">
          📄 Export as PDF
        </button>
        <button @click="regenerate" class="action-btn">
          🔄 Regenerate
        </button>
        <button @click="startNew" class="action-btn">
          🆕 New Topic
        </button>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-section">
      <div class="error-icon">⚠️</div>
      <h4>Unable to Generate</h4>
      <p>{{ error }}</p>
      <button @click="error = ''" class="action-btn">
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { jsPDF } from 'jspdf'

const API_URL = 'http://localhost:3000/api/generate'

// User inputs (no prompt visible)
const topic = ref('')
const contentType = ref('paragraph')
const tone = ref('academic')
const difficulty = ref('easy')
const wordCount = ref(200)

// Results and states
const result = ref('')
const metadata = ref({})
const error = ref('')
const loading = ref(false)

// Options
const contentTypes = [
  { value: 'paragraph', label: 'Paragraph', icon: '📄' },
  { value: 'essay', label: 'Essay', icon: '📝' },
  { value: 'letter', label: 'Letter', icon: '✉️' },
  { value: 'summary', label: 'Summary', icon: '📊' },
  { value: 'report', label: 'Report', icon: '📋' }
]

const tones = [
  { value: 'academic', label: 'Academic', icon: '🎓' },
  { value: 'casual', label: 'Casual', icon: '😊' },
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
  { value: 'persuasive', label: 'Persuasive', icon: '💡' }
]

const difficultyLevels = [
  { value: 'easy', label: 'Easy', icon: '🌟' },
  { value: 'medium', label: 'Medium', icon: '⚡' },
  { value: 'pro', label: 'Pro', icon: '🚀' }
]

const wordPresets = [
  { value: 100, label: 'Short (100 words)' },
  { value: 250, label: 'Medium (250 words)' },
  { value: 400, label: 'Long (400 words)' }
]

const quickTemplates = [
  { 
    icon: '🏫', 
    label: 'Academic Paper', 
    desc: 'Formal research style',
    settings: { contentType: 'essay', tone: 'academic', difficulty: 'pro', wordCount: 350 }
  },
  { 
    icon: '💼', 
    label: 'Business Report', 
    desc: 'Professional analysis',
    settings: { contentType: 'report', tone: 'professional', difficulty: 'medium', wordCount: 300 }
  },
  { 
    icon: '✉️', 
    label: 'Friendly Letter', 
    desc: 'Casual correspondence',
    settings: { contentType: 'letter', tone: 'casual', difficulty: 'easy', wordCount: 200 }
  },
  { 
    icon: '🎨', 
    label: 'Creative Writing', 
    desc: 'Imaginative storytelling',
    settings: { contentType: 'paragraph', tone: 'creative', difficulty: 'pro', wordCount: 250 }
  },
  { 
    icon: '📚', 
    label: 'Study Notes', 
    desc: 'Educational summary',
    settings: { contentType: 'summary', tone: 'academic', difficulty: 'medium', wordCount: 150 }
  }
]

const generateContent = async () => {
  if (!topic.value.trim()) {
    error.value = 'Please enter a topic'
    return
  }

  loading.value = true
  error.value = ''
  result.value = ''

  try {
    const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: topic.value,  // Change from 'topic' to 'prompt'
      mode: contentType.value,  // Change from 'contentType' to 'mode'
      tone: tone.value,
      difficulty: difficulty.value,
      wordCount: wordCount.value
    })
  })

    const data = await response.json()
    
    if (response.ok && data.success) {
      result.value = data.result
      metadata.value = data.metadata || {}
    } else {
      error.value = data.message || 'Failed to generate content'
    }
  } catch (err) {
    error.value = `Connection error: ${err.message}`
  } finally {
    loading.value = false
  }
}

const applyTemplate = (template) => {
  contentType.value = template.settings.contentType
  tone.value = template.settings.tone
  difficulty.value = template.settings.difficulty
  wordCount.value = template.settings.wordCount
  
  if (topic.value) {
    generateContent()
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(result.value)
    alert('Copied to clipboard!')
  } catch (err) {
    error.value = 'Failed to copy text'
  }
}

const downloadPDF = () => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(18)
  doc.text('AI-Generated Content', 20, 20)
  
  // Metadata
  doc.setFontSize(10)
  doc.text(`Topic: ${topic.value}`, 20, 30)
  doc.text(`Type: ${contentType.value} • Tone: ${tone.value} • Difficulty: ${difficulty.value}`, 20, 35)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 40)
  
  // Content
  doc.setFontSize(12)
  const lines = doc.splitTextToSize(result.value, 170)
  doc.text(lines, 20, 50)
  
  doc.save(`ai-content-${Date.now()}.pdf`)
}

const regenerate = () => {
  if (topic.value.trim()) {
    generateContent()
  }
}

const startNew = () => {
  topic.value = ''
  result.value = ''
  error.value = ''
}
</script>

<style scoped>
.generator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

/* Topic Section */
.topic-section {
  margin-bottom: 40px;
}

.topic-section label {
  display: block;
  font-size: 1.2em;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
}

.topic-input {
  width: 100%;
  padding: 18px 20px;
  font-size: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.3s;
  background: #f8f9fa;
}

.topic-input:focus {
  outline: none;
  border-color: #3498db;
  background: white;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.topic-hint {
  margin-top: 10px;
  color: #7f8c8d;
  font-size: 0.95em;
}

/* Controls Grid */
.controls-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .controls-grid {
    grid-template-columns: 1fr;
  }
}

.control-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
  border-left: 4px solid #3498db;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.control-icon {
  font-size: 1.3em;
}

.control-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.control-btn {
  padding: 12px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  color: #34495e;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.control-btn:hover:not(.active) {
  border-color: #3498db;
  transform: translateY(-2px);
}

/* Slider */
.slider-container {
  margin-top: 15px;
}

.word-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #3498db, #2ecc71);
  outline: none;
  -webkit-appearance: none;
}

.word-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 3px solid #3498db;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: #7f8c8d;
  font-size: 0.9em;
}

.word-presets {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.preset-btn {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #34495e;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9em;
}

.preset-btn.active {
  background: #2ecc71;
  color: white;
  border-color: #2ecc71;
}

/* Templates */
.templates-section {
  margin-bottom: 40px;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.template-btn {
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.template-btn:hover {
  border-color: #3498db;
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(52, 152, 219, 0.1);
}

.template-icon {
  font-size: 1.8em;
  margin-bottom: 5px;
}

.template-label {
  font-weight: 600;
  color: #2c3e50;
}

.template-desc {
  font-size: 0.85em;
  color: #7f8c8d;
}

/* Generate Section */
.generate-section {
  text-align: center;
  margin: 40px 0;
}

.generate-button {
  padding: 20px 50px;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 300px;
}

.generate-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
}

.generate-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.settings-summary {
  margin-top: 15px;
  color: #7f8c8d;
  font-size: 0.95em;
}

/* Results */
.result-section {
  margin-top: 40px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 15px;
  animation: fadeIn 0.5s ease;
}

.result-header {
  margin-bottom: 25px;
}

.result-header h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.result-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.meta-tag {
  padding: 6px 12px;
  background: #3498db;
  color: white;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
}

.result-content {
  padding: 25px;
  background: white;
  border-radius: 12px;
  line-height: 1.8;
  margin-bottom: 25px;
  font-size: 1.1em;
}

.result-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 12px 24px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.action-btn.primary {
  background: #3498db;
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Error State */
.error-section {
  padding: 30px;
  background: #fee;
  border-radius: 15px;
  text-align: center;
  margin-top: 30px;
  border: 2px solid #e74c3c;
}

.error-icon {
  font-size: 3em;
  margin-bottom: 15px;
}

.error-section h4 {
  color: #c0392b;
  margin-bottom: 10px;
}

.error-section p {
  color: #e74c3c;
  margin-bottom: 20px;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>