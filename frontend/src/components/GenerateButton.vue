<template>
  <button 
    @click="store.generateContent()"
    :disabled="store.loading || !store.topic.trim()"
    class="generate-btn"
  >
    <img 
      v-if="store.loading" 
      src="@/assets/ratings.gif" 
      alt="Loading..." 
      class="btn-icon"
    />

<svg 
      v-else 
      class="btn-icon" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
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

/* Ensuring both the GIF and SVG are the same size */
.btn-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.generate-btn:hover:not(:disabled) {
  background: #09d4bc;
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>