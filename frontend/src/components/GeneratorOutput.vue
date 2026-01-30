<template>
  <div v-if="store.showOutput" class="output-section">
    <div class="output-header">
      <h2>Generated Output</h2>
      <div class="output-stats">
        <div class="stat-badge">
          <i class="fas fa-font"></i>
          <span>{{ store.wordCountDisplay }} words</span>
        </div>
        <div class="stat-badge">
          <i class="fas fa-file-alt"></i>
          <span>{{ store.contentType }}</span>
        </div>
        <div class="stat-badge">
          <i class="fas fa-volume-up"></i>
          <span>{{ store.tone }}</span>
        </div>
      </div>
    </div>
    
    <div class="output-content">
      <div class="content-wrapper">
        <p>{{ store.result }}</p>
      </div>
      <div class="action-buttons">
        <button @click="handleCopy" class="action-btn">
          <i class="fas fa-copy"></i>
          <span>Copy Text</span>
        </button>
        
        <button @click="store.downloadTXT()" class="action-btn">
          <i class="fas fa-file-alt"></i>
          <span>Save as TXT</span>
        </button>
        
        <button @click="store.downloadPDF()" class="action-btn primary">
          <i class="fas fa-file-pdf"></i>
          <span>Export as PDF</span>
        </button>
        
        <button @click="store.generateNew()" class="action-btn secondary">
          <i class="fas fa-redo"></i>
          <span>New Content</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()

const handleCopy = async () => {
  const success = await store.copyToClipboard()
  if (success) {
    alert('✅ Copied to clipboard!')
  }
}
</script>

<style scoped>
:root {
  --text-dark: #1a2a24;
  --text-muted: #6b7c6d;
  --border-color: #e0e7e2;
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --white: #ffffff;
  --light-gray: #f8f9fa;
}

.output-section {
  margin-top: 30px;
  padding: 25px;
  background: var(--light-gray);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  animation: fadeIn 0.5s ease;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.output-header h2 {
  color: var(--text-dark);
  font-size: 1.4rem;
  margin: 0;
}

.output-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat-badge {
  padding: 6px 12px;
  background: var(--white);
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 500;
  color: var(--text-dark);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-badge i {
  color: var(--primary-dark);
  font-size: 0.9em;
}

.output-content {
  background: var(--white);
  padding: 25px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.content-wrapper {
  margin-bottom: 25px;
}

.content-wrapper p {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.7;
  color: var(--text-dark);
  font-size: 1.05em;
  margin: 0;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.action-btn {
  padding: 14px;
  border: 2px solid var(--border-color);
  background: var(--white);
  color: var(--text-dark);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-light);
}

.action-btn.primary {
  border-color: var(--primary-dark);
  background: var(--primary-dark);
  color: var(--text-dark);
}

.action-btn.primary:hover {
  background: #09d4bc;
  border-color: #09d4bc;
  box-shadow: 0 5px 15px rgba(10, 236, 208, 0.2);
}

.action-btn.secondary {
  border-color: var(--secondary-light);
  color: var(--secondary-light);
}

.action-btn.secondary:hover {
  background: var(--secondary-light);
  color: var(--white);
}

.action-btn i {
  font-size: 1.1em;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .output-section {
    padding: 20px;
  }
  
  .output-content {
    padding: 20px;
  }
  
  .action-buttons {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>