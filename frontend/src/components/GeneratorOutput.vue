
<template>
  <!-- Toast Messages - placed BEFORE the conditional so they're always in DOM -->
  <div v-if="toasts.showGenerated" class="toast toast-success">
    <i class="fas fa-check-circle"></i>
    <span>✅ Content generated!</span>
  </div>
  
  <div v-if="toasts.showCopied" class="toast toast-success">
    <i class="fas fa-copy"></i>
    <span>📋 Copied to clipboard!</span>
  </div>
  
  <!-- Output Section -->
  <div v-if="store.showOutput" class="output-section">
    <div class="output-card">
      <div class="content-section">
        <h2 class="content-name">{{ store.topic }}</h2>
        
        <div class="output-meta">
          <div class="meta-tag">
            <span>{{ store.contentType }}</span>
          </div>
          
          <div class="meta-stats">
            <span class="word-count">
              <i class="fas fa-align-left"></i>
              {{ store.wordCountDisplay }} words
            </span>
            <span class="tone-badge">
              <i class="fas fa-magic"></i>
              {{ store.tone }}
            </span>
          </div>
        </div>

        <div class="content-text-container">
          <p class="result-text">{{ store.result }}</p>
        </div>
      </div>
      
      <div class="action-buttons">
        <button @click="handleCopy" class="action-btn copy-btn" title="Copy to clipboard">
          <i class="fas fa-copy"></i>
          <span>COPY</span>
        </button>
        
        <button @click="store.downloadPDF()" class="action-btn export-btn">
          <i class="fas fa-file-pdf"></i>
          <span>EXPORT PDF</span>
        </button>
        
        <button @click="store.generateNew()" class="action-btn generate-btn">
          <i class="fas fa-redo"></i>
          <span>GENERATE NEW</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()

// Simple toast state
const toasts = reactive({
  showGenerated: false,
  showCopied: false
})

// Show generated toast when content appears
watch(() => store.showOutput, (newVal) => {
  if (newVal && store.result) {
    showGeneratedToast()
  }
})

const showGeneratedToast = () => {
  toasts.showGenerated = true
  setTimeout(() => {
    toasts.showGenerated = false
  }, 3000) // Show for only 1 second
}

const handleCopy = async () => {
  const success = await store.copyToClipboard()
  if (success) {
    toasts.showCopied = true
    setTimeout(() => {
      toasts.showCopied = false
    }, 1000) // Show for only 1 second
  }
}
</script>

<style scoped>
/* Toast Styles - Updated for bottom position and 1 second duration */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10000;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease, fadeOut 0.3s ease 0.7s forwards;
  font-weight: 600;
  min-width: 250px;
  text-align: center;
  justify-content: center;
}

.toast-success {
  background: linear-gradient(135deg, #10b981, #0da271);
  color: white;
  border: 2px solid #059669;
}

.toast i {
  font-size: 1.3em;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Mobile toast */
@media (max-width: 768px) {
  .toast {
    bottom: 15px;
    left: 15px;
    right: 15px;
    transform: none;
    min-width: auto;
    padding: 10px 16px;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Color Palette */
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --text-dark: #1a2a24;
  --text-muted: #6b7c6d;
  --border-color: #e0e7e2;
  --bg-light: #f8f9fa;
  --white: #ffffff;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.1);
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulseSubtle {
  0% { box-shadow: 0 0 0 0 rgba(10, 236, 208, 0.2); }
  70% { box-shadow: 0 0 0 6px rgba(10, 236, 208, 0); }
  100% { box-shadow: 0 0 0 0 rgba(10, 236, 208, 0); }
}

.output-section {
  margin-top: 30px;
  animation: fadeInUp 0.4s ease-out;
}

.output-card {
  background: var(--white);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.output-card:hover {
  box-shadow: var(--shadow-lg), 0 10px 40px rgba(0, 0, 0, 0.08);
}

/* Centered Header */
.output-header {
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-bottom: 1px solid var(--border-color);
}

.main-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
}

.main-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: var(--primary-dark);
  border-radius: 2px;
}

/* Content Section Layout */
.content-section {
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-name {
  color: var(--text-dark);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.3;
}

.output-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.meta-tag {
  background: linear-gradient(135deg, var(--primary-light), #a8e6cf);
  color: var(--text-dark);
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease;
}

.meta-tag:hover {
  transform: translateY(-1px);
}

.meta-stats {
  display: flex;
  gap: 20px;
}

.word-count, .tone-badge {
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.word-count i, .tone-badge i {
  color: var(--primary-dark);
  font-size: 0.9em;
}

/* Result Box Styling */
.content-text-container {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 35px;
  width: 100%;
  max-width: 900px;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.03);
  scrollbar-width: thin;
  scrollbar-color: var(--primary-light) #e8f4f2;
}

/* Custom scrollbar */
.content-text-container::-webkit-scrollbar {
  width: 6px;
}

.content-text-container::-webkit-scrollbar-track {
  background: #e8f4f2;
  border-radius: 10px;
}

.content-text-container::-webkit-scrollbar-thumb {
  background: var(--primary-light);
  border-radius: 10px;
}

.content-text-container::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}

.result-text {
  white-space: pre-wrap;
  line-height: 1.8;
  color: var(--text-dark);
  font-size: 1.1rem;
  margin: 0;
  text-align: left;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Button Group - ALWAYS IN ROW */
.action-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 25px;
  background: linear-gradient(to bottom, #fdfdfd, #f8f9fa);
  border-top: 1px solid var(--border-color);
  position: relative;
}

.action-buttons::before {
  content: '';
  position: absolute;
  top: 0;
  left: 25px;
  right: 25px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.action-btn {
  padding: 14px 20px;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.action-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.action-btn:active::after {
  width: 300px;
  height: 300px;
}

.copy-btn {
  background: white;
  border: 2px solid var(--border-color);
  color: var(--text-dark);
}

.copy-btn:hover {
  border-color: var(--primary-light);
  background: #f9fffe;
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.export-btn {
  background: var(--primary-dark);
  color: var(--text-dark);
  animation: pulseSubtle 2s infinite;
}

.export-btn:hover {
  background: #09d4bc;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(10, 236, 208, 0.25);
}

.generate-btn {
  background: linear-gradient(135deg, var(--secondary-light), #7aab84);
  color: white;
}

.generate-btn:hover {
  background: linear-gradient(135deg, #7aab84, #6b9a75);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(136, 187, 146, 0.25);
}

.action-btn i {
  font-size: 1.1em;
  transition: transform 0.3s ease;
}

.action-btn:hover i {
  transform: scale(1.1);
}

/* Responsive - BUTTONS ALWAYS STAY IN ROW */
@media (max-width: 768px) {
  .action-buttons {
    grid-template-columns: repeat(3, 1fr); /* Keep 3 columns */
    gap: 10px;
    padding: 20px;
  }
  
  .action-btn {
    padding: 12px 15px;
    font-size: 0.85rem;
    min-height: 48px;
  }
  
  .content-section {
    padding: 30px 20px;
  }
  
  .content-name {
    font-size: 1.5rem;
  }
  
  .content-text-container {
    padding: 25px;
    max-height: 400px;
  }
  
  .output-meta {
    gap: 15px;
  }
  
  .meta-stats {
    gap: 15px;
  }
}

@media (max-width: 576px) {
  .action-buttons {
    grid-template-columns: repeat(3, 1fr); /* STILL 3 columns */
    gap: 8px;
    padding: 15px;
  }
  
  .action-btn {
    padding: 10px 12px;
    font-size: 0.8rem;
    min-height: 44px;
  }
  
  .action-btn span {
    font-size: 0.75rem;
  }
  
  .content-section {
    padding: 25px 15px;
  }
  
  .content-name {
    font-size: 1.3rem;
  }
  
  .content-text-container {
    padding: 20px;
    max-height: 350px;
  }
  
  .output-meta {
    gap: 12px;
  }
  
  .meta-stats {
    gap: 15px;
  }
}

/* Extra small screens (mobile portrait) */
@media (max-width: 400px) {
  .action-buttons {
    grid-template-columns: repeat(3, 1fr); /* STILL 3 columns */
    gap: 6px;
  }
  
  .action-btn {
    padding: 8px 6px;
    font-size: 0.7rem;
    letter-spacing: 0.3px;
    min-height: 40px;
  }
  
  .action-btn i {
    font-size: 0.9em;
    margin-right: 2px;
  }
  
  .action-btn span {
    font-size: 0.7rem;
  }
}
</style>