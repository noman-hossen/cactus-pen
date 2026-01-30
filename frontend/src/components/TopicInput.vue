<template>
  <div class="topic-input">
    <!-- Main Inputs Row -->
    <div class="input-row">
      <div class="input-group">
        <label for="topic">Topic/Subject</label>
        <input 
          v-model="store.topic"
          id="topic"
          type="text"
          placeholder="Enter your main topic..."
          class="topic-input-field"
          @keyup.enter="store.generateContent()"
        />
      </div>

      <div class="input-group">
        <label for="context">Additional Context (Optional)</label>
        <input 
          v-model="store.context"
          id="context"
          type="text"
          placeholder="Any specific instructions or context..."
          class="topic-input-field"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
/* Same styles as before */
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --secondary-dark: #7b886b;
  --text-dark: #1a2a24;
  --glass-border: rgba(138, 187, 146, 0.2);
}

.topic-input {
  margin-bottom: 25px;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .input-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 8px;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
}

.topic-input-field {
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  border: 2px solid rgba(138, 187, 146, 0.3);
  border-radius: 10px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-dark);
}

.topic-input-field:focus {
  outline: none;
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(10, 236, 208, 0.1);
}

.topic-input-field::placeholder {
  color: var(--secondary-light);
  opacity: 0.6;
}
</style>