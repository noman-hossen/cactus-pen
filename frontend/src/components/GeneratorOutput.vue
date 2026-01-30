<template>
  <div v-if="store.showOutput" class="output-section">
    <div class="output-header">
      <h2>📝 Generated Output</h2>
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
        <div class="stat-badge">
          <i class="fas fa-chart-line"></i>
          <span>{{ store.difficulty }}</span>
        </div>
      </div>
    </div>
    
    <div class="output-content">
      <div class="content-wrapper">
        <pre>{{ store.result }}</pre>
      </div>
      <div class="copy-action">
        <button @click="handleCopy" class="copy-btn">
          <i class="fas fa-copy"></i>
          Copy to Clipboard
        </button>
      </div>
    </div>
    
    <!-- Export Actions -->
    <div class="export-actions">
      <h3>Export Options</h3>
      <div class="action-buttons">
        <button @click="store.downloadTXT()" class="action-btn txt">
          <i class="fas fa-file-alt"></i>
          <span>TXT File</span>
        </button>
        
        <button @click="store.downloadPDF()" class="action-btn primary">
          <i class="fas fa-file-pdf"></i>
          <span>PDF Export</span>
        </button>
        
        <button @click="store.shareContent()" class="action-btn share">
          <i class="fas fa-share-alt"></i>
          <span>Share</span>
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
/* Updated Color Palette with Better Contrast */
:root {
  --primary-dark: #00BFA5;
  --primary-light: #66D9B0;
  --secondary-light: #6B9C7D;
  --secondary-dark: #5A6B4A;
  --text-light: #FFFFFF;
  --text-dark: #1A2A24;
  --text-muted: #4A5C52;
  --glass-bg: rgba(255, 255, 255, 0.95);
  --glass-border: rgba(102, 217, 176, 0.3);
  --accent-blue: #4A90E2;
  --accent-orange: #FF6B6B;
  --accent-purple: #9B59B6;
}

.output-section {
  margin-top: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border: 2px solid var(--glass-border);
  animation: fadeIn 0.5s ease;
  color: var(--text-dark);
  box-shadow: 0 8px 32px rgba(90, 107, 74, 0.15);
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
  color: var(--secondary-dark);
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
  background: linear-gradient(135deg, rgba(102, 217, 176, 0.15), rgba(0, 191, 165, 0.1));
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
  color: var(--text-dark);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  border: 1px solid rgba(90, 107, 74, 0.1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.content-wrapper {
  background: #f8f9f8;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid rgba(90, 107, 74, 0.08);
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
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-light));
  color: var(--text-dark);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 191, 165, 0.2);
}

.copy-btn:hover {
  background: linear-gradient(135deg, var(--primary-light), var(--primary-dark));
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 191, 165, 0.3);
}

.copy-btn:active {
  transform: translateY(0);
}

/* Export Actions */
.export-actions {
  padding-top: 25px;
  border-top: 2px solid rgba(102, 217, 176, 0.2);
}

.export-actions h3 {
  margin-bottom: 25px;
  color: var(--secondary-dark);
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
  border: 2px solid rgba(90, 107, 74, 0.2);
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(90, 107, 74, 0.15);
}

.action-btn.primary {
  border-color: var(--primary-dark);
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-light));
  color: var(--text-dark);
}

.action-btn.primary:hover {
  border-color: var(--primary-light);
  box-shadow: 0 8px 20px rgba(0, 191, 165, 0.3);
}

.action-btn.secondary {
  border-color: var(--secondary-light);
  background: white;
  color: var(--secondary-light);
}

.action-btn.secondary:hover {
  background: var(--secondary-light);
  color: white;
  border-color: var(--secondary-light);
}

.action-btn.txt {
  border-color: var(--accent-blue);
  color: var(--accent-blue);
}

.action-btn.txt:hover {
  background: var(--accent-blue);
  color: white;
}

.action-btn.share {
  border-color: var(--accent-purple);
  color: var(--accent-purple);
}

.action-btn.share:hover {
  background: var(--accent-purple);
  color: white;
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
  
  .content-wrapper {
    padding: 15px;
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