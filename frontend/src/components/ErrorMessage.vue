<template>
  <div v-if="store.error" class="error-message">
    <i class="fas fa-exclamation-triangle"></i>
    {{ store.error }}
  </div>
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
.error-message {
  margin-top: 20px;
  padding: 16px 20px;
  background: rgba(231, 76, 60, 0.1);
  border-left: 4px solid #e74c3c;
  border-radius: 8px;
  color: #c0392b;
  font-size: 0.95em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.error-message i {
  font-size: 1.2em;
}
</style>