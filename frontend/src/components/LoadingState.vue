<template>
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
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
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
</style>