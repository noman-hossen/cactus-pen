<template>
  <div class="options-dropdowns">
    <!-- Control Row 1: Dropdowns -->
    <div class="controls-row">
      <div class="control-group">
        <label for="contentType">Content Type</label>
        <select 
          v-model="store.contentType"
          id="contentType"
          class="dropdown"
        >
          <option value="paragraph">Paragraph</option>
          <option value="essay">Essay</option>
          <option value="letter">Letter</option>
          <option value="summary">Summary</option>
          <option value="report">Report</option>
          <option value="blog">Blog Post</option>
          <option value="story">Short Story</option>
        </select>
      </div>

      <div class="control-group">
        <label for="tone">Tone</label>
        <select 
          v-model="store.tone"
          id="tone"
          class="dropdown"
        >
          <option value="academic">Academic</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="creative">Creative</option>
          <option value="persuasive">Persuasive</option>
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>

      <div class="control-group">
        <label for="difficulty">Difficulty Level</label>
        <select 
          v-model="store.difficulty"
          id="difficulty"
          class="dropdown"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>

    <!-- Control Row 2: Word Count Slider -->
    <div class="slider-row">
      <div class="slider-group">
        <div class="slider-header">
          <label for="wordCount">Word Count</label>
          <span class="word-count-value">{{ store.wordCount }} words</span>
        </div>
        <input 
          v-model="store.wordCount"
          id="wordCount"
          type="range"
          min="50"
          max="1000"
          step="50"
          class="word-slider"
        />
        <div class="slider-labels">
          <span>50</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1000</span>
        </div>
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

.options-dropdowns {
  margin-bottom: 25px;
}

.controls-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .controls-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

.control-group {
  display: flex;
  flex-direction: column;
}

.control-group label {
  margin-bottom: 8px;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
}

.dropdown {
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  border: 2px solid rgba(138, 187, 146, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-dark);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%237b886b' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 16px;
}

.dropdown:focus {
  outline: none;
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(10, 236, 208, 0.1);
}

.slider-row {
  margin-bottom: 30px;
}

.slider-group {
  display: flex;
  flex-direction: column;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.slider-header label {
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
}

.word-count-value {
  color: var(--primary-dark);
  font-weight: 700;
  font-size: 1.1rem;
}

.word-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--primary-light), var(--primary-dark));
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}

.word-slider:hover {
  opacity: 1;
}

.word-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary-dark);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.word-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary-dark);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: var(--secondary-dark);
  font-size: 0.85rem;
  opacity: 0.7;
}
</style>