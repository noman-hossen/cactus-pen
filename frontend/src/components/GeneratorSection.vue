<file path="frontend/src/components/GeneratorSection.vue">
<template>
  <div class="generator-wireframe">
    <!-- Use the existing GeneratorHeader component -->
    <GeneratorHeader />
    
    <!-- Main Inputs Row -->
    <div class="input-row">
      <div class="input-group">
        <label for="topic">Topic/Subject</label>
        <!-- Use the existing TopicInput component -->
        <TopicInput />
      </div>

      <div class="input-group">
        <label for="context">Additional Context (Optional)</label>
        <input 
          v-model="store.context"
          id="context"
          type="text"
          placeholder="Any specific instructions or context..."
          class="topic-input"
        />
      </div>
    </div>

    <!-- Use the existing OptionsDropdowns component -->
    <OptionsDropdowns />
    
    <!-- Use the existing GenerateButton component -->
    <GenerateButton />
    
    <!-- Use the existing ErrorMessage component -->
    <ErrorMessage />
    
    <!-- Use the existing GeneratorOutput component -->
    <GeneratorOutput />
  </div>
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'
import GeneratorHeader from './GeneratorHeader.vue'
import TopicInput from './TopicInput.vue'
import OptionsDropdowns from './OptionsDropdowns.vue'
import GenerateButton from './GenerateButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import GeneratorOutput from './GeneratorOutput.vue'

const store = useGeneratorStore()
</script>

<style scoped>
/* Color Variables */
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --secondary-dark: #7b886b;
  --text-light: #f5f9f7;
  --text-dark: #1a2a24;
  --glass-bg: rgba(255, 255, 255, 0.92);
  --glass-border: rgba(138, 187, 146, 0.2);
}

.generator-wireframe {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(123, 136, 107, 0.15);
  margin-bottom: 40px;
  position: relative;
}

/* Input Row */
.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;
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

.topic-input {
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  border: 2px solid rgba(138, 187, 146, 0.3);
  border-radius: 10px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-dark);
}

.topic-input:focus {
  outline: none;
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(10, 236, 208, 0.1);
}

.topic-input::placeholder {
  color: var(--secondary-light);
  opacity: 0.6;
}
</style>
</file>