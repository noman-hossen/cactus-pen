<template>
  <div v-if="store.error" class="error-message">
    ⚠️ {{ store.error }}
  </div>
</template>

<script setup>
import { useGeneratorStore } from '../stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
.error-message {
  margin-top: 15px;
  padding: 12px 20px;
  background: #ffeaea;
  border-left: 4px solid #e74c3c;
  border-radius: 6px;
  color: #c0392b;
  font-size: 0.95em;
}
</style>