<template>
  <div class="export-actions">
    <h3>📤 Export Options</h3>
    <div class="action-buttons">
      <button @click="handleCopy" class="action-btn">
        <span class="btn-icon">📋</span>
        <span>Copy Text</span>
      </button>
      
      <button @click="store.downloadPDF" class="action-btn primary">
        <span class="btn-icon">📄</span>
        <span>Export as PDF</span>
      </button>
      
      <button @click="store.downloadTXT" class="action-btn">
        <span class="btn-icon">📝</span>
        <span>Save as TXT</span>
      </button>
      
      <button @click="store.generateNew" class="action-btn secondary">
        <span class="btn-icon">🔄</span>
        <span>New Content</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGeneratorStore } from '../stores/generatorStore'

const store = useGeneratorStore()

const handleCopy = async () => {
  const result = await store.copyToClipboard()
  if (result.success) {
    alert(result.message)
  }
}
</script>

<style scoped>
.export-actions {
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
}

.export-actions h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.2rem;
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
  padding: 15px;
  border: 2px solid #e0e0e0;
  background: white;
  color: #333;
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
  border-color: #667eea;
}

.action-btn.primary {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

.action-btn.primary:hover {
  background: #5a6fd8;
  border-color: #5a6fd8;
}

.action-btn.secondary {
  border-color: #95a5a6;
  color: #95a5a6;
}

.action-btn.secondary:hover {
  background: #95a5a6;
  color: white;
}

.btn-icon {
  font-size: 1.2em;
}
</style>