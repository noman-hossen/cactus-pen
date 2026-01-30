<template>
  <div v-if="store.showOutput" class="output-section">
    <div class="output-header">
      <h2>📝 Generated Output</h2>
      <div class="output-stats">
        <span class="stat-badge">📊 {{ store.wordCount }} words</span>
        <span class="stat-badge">📄 {{ store.contentType }}</span>
        <span class="stat-badge">🎭 {{ store.tone }}</span>
      </div>
    </div>
    
    <div class="output-content">
      <p>{{ store.result }}</p>
    </div>
    
    <ExportActions />
  </div>
</template>

<script setup>
import { useGeneratorStore } from '../stores/generatorStore'
import ExportActions from './ExportActions.vue'

const store = useGeneratorStore()
</script>

<style scoped>
.output-section {
  margin-top: 30px;
  padding: 25px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
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
  color: #333;
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
  background: white;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 500;
  color: #555;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 5px;
}

.output-content {
  background: white;
  padding: 25px;
  border-radius: 6px;
  margin-bottom: 30px;
  line-height: 1.7;
  font-size: 1.05em;
  white-space: pre-wrap;
  border: 1px solid #e0e0e0;
}
</style>