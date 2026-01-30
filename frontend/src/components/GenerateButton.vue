<template>
  <button 
    @click="store.generateContent()"
    :disabled="store.loading || !store.topic.trim()"
    class="generate-btn"
  >
    <span v-if="store.loading" class="spinner-small"></span>
    {{ store.loading ? 'Generating...' : 'Generate' }}
  </button>
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
.generate-btn {
  width: 100%;
  padding: 12px;
  background: var(--primary-dark);
  border: none;
  color: var(--text-dark);
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.generate-btn:hover:not(:disabled) {
  background: #09d4bc;
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner-small {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid var(--white);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .generate-btn {
    padding: 14px;
    font-size: 16px;
    margin-top: 15px;
  }
}
</style>