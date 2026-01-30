<template>
  <div class="input-group">
    <input 
      v-model="store.topic"
      type="text"
      placeholder="🔍 Enter your topic..."
      class="topic-input"
      @keyup.enter="store.generateContent"
    />
  </div>
</template>

<script setup>
import { useGeneratorStore } from '../stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
.input-group {
  margin-bottom: 20px;
}

.topic-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.topic-input:focus {
  outline: none;
  border-color: #667eea;
}
</style>