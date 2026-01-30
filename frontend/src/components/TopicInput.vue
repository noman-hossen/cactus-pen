<template>
  <div class="topic-input">
    <input 
      v-model="store.topic"
      id="topic"
      type="text"
      placeholder="Enter your topic..."
      class="topic-input-field"
      @keyup.enter="store.generateContent()"
    />
  </div>
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
.topic-input {
  margin-bottom: 10px;
}

.topic-input-field {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  transition: all 0.3s;
  background: var(--white);
  color: var(--text-dark);
  margin-top: 10px;
}

.topic-input-field:focus {
  outline: none;
  border-color: var(--primary-dark);
}

.topic-input-field::placeholder {
  color: #999;
}

@media (max-width: 768px) {
  .topic-input-field {
    padding: 14px;
  }
}
</style>