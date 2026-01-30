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
        <button @click="store.downloadTXT()" class="action-btn">
          <i class="fas fa-file-alt"></i>
          <span>TXT File</span>
        </button>
        
        <button @click="store.downloadPDF()" class="action-btn primary">
          <i class="fas fa-file-pdf"></i>
          <span>PDF Export</span>
        </button>
        
        <button @click="store.shareContent()" class="action-btn">
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
/* Same styles as before */
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --secondary-dark: #7b886b;
  --text-dark: #1a2a24;
  --text-light: #f5f9f7;
  --glass-border: rgba(138, 187, 146, 0.2);
}

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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>