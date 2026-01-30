<template>
  <div v-if="store.loading" class="loading-state">
    <div class="spinner"></div>
    <p>AI is writing your content...</p>
  </div>
</template>

<script setup>
import { useGeneratorStore } from '../stores/generatorStore'
const store = useGeneratorStore()
</script>

<style scoped>
.loading-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-state p {
  color: #333;
  font-size: 1.1em;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>