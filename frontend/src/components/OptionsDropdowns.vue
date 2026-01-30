<template>
  <div class="options-dropdowns">
    <!-- Controls Row - Side by side like wireframe -->
    <div class="controls-row">
      <select 
        v-model="store.contentType"
        class="dropdown"
      >
        <option value="">Content Type</option>
        <option value="paragraph">Paragraph</option>
        <option value="essay">Essay</option>
        <option value="letter">Letter</option>
        <option value="summary">Summary</option>
        <option value="report">Report</option>
      </select>

      <select 
        v-model="store.tone"
        class="dropdown"
      >
        <option value="">Tone</option>
        <option value="academic">Academic</option>
        <option value="casual">Casual</option>
        <option value="professional">Professional</option>
        <option value="creative">Creative</option>
        <option value="persuasive">Persuasive</option>
        <option value="formal">Formal</option>
      </select>

      <select 
        v-model="store.difficulty"
        class="dropdown"
      >
        <option value="">Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    
    <!-- Word Count Slider (below dropdowns) -->
    <div class="slider-group">
      <div class="slider-header">
        <span>Word Count: {{ store.wordCount }} words</span>
      </div>
      <input 
        v-model="store.wordCount"
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
</template>

<script setup>
import { useGeneratorStore } from '@/stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
.options-dropdowns {
  margin-top: 10px;
}

.controls-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.dropdown {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: var(--white);
  color: var(--text-dark);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%231a2a24' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.dropdown:focus {
  outline: none;
  border-color: var(--primary-dark);
}

.dropdown:hover {
  border-color: #bbb;
}

.slider-group {
  margin-top: 20px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.slider-header span {
  color: var(--text-dark);
  font-weight: 500;
  font-size: 14px;
}

.word-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--primary-light), var(--primary-dark));
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  -webkit-appearance: none;
}

.word-slider:hover {
  opacity: 1;
}

.word-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-dark);
  cursor: pointer;
  border: 3px solid var(--white);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.word-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-dark);
  cursor: pointer;
  border: 3px solid var(--white);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  color: #777;
  font-size: 12px;
}

/* Mobile: Keep side-by-side layout */
@media (max-width: 768px) {
  .controls-row {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
  
  .dropdown {
    padding: 14px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .controls-row {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }
  
  .dropdown {
    padding: 12px;
    font-size: 14px;
    background-position: right 8px center;
  }
  
  .slider-header span {
    font-size: 13px;
  }
  
  .slider-labels {
    font-size: 11px;
  }
}
</style>