<template>
  <button 
    @click="store.generateContent"
    :disabled="store.loading || !store.topic.trim()"
    class="generate-btn"
  >
    {{ store.loading ? 'Generating...' : 'Generate' }}
  </button>
</template>

<script setup>
import { useGeneratorStore } from '../stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
.generate-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>