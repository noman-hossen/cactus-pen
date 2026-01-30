<template>
  <div v-if="store.loading" class="loading-state">
    <div class="spinner"></div>
    <p>AI is crafting your content...</p>
    <p class="loading-subtitle">This usually takes 10-30 seconds</p>
  </div>
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --secondary-dark: #7b886b;
  --text-dark: #1a2a24;
}

.loading-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  z-index: 10;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(148, 221, 188, 0.2);
  border-top: 4px solid var(--primary-dark);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 25px;
}

.loading-state p {
  color: var(--text-dark);
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 5px;
}

.loading-subtitle {
  color: var(--secondary-dark);
  font-size: 0.9em;
  opacity: 0.7;
  margin-top: 5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>