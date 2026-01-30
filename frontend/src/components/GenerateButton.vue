<template>
  <button 
    @click="store.generateContent()"
    :disabled="store.loading || !store.topic.trim()"
    class="generate-btn"
  >
    <svg v-if="store.loading" class="spinner-svg" viewBox="0 0 50 50">
      <circle
        class="spinner-circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="4"
      />
    </svg>
    <span>{{ store.loading ? 'Generating...' : 'Generate' }}</span>
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

.spinner-svg {
  width: 20px;
  height: 20px;
  animation: rotate 2s linear infinite;
}

.spinner-circle {
  stroke: var(--text-dark);
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@media (max-width: 768px) {
  .generate-btn {
    padding: 14px;
    font-size: 16px;
    margin-top: 15px;
  }
}
</style>