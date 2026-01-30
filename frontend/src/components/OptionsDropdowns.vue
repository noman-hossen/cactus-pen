<template>
  <div class="dropdowns-row">
    <select v-model="store.contentType" class="dropdown">
      <option disabled value="">Content Type</option>
      <option value="paragraph">Paragraph</option>
      <option value="essay">Essay</option>
      <option value="letter">Letter</option>
      <option value="summary">Summary</option>
      <option value="report">Report</option>
    </select>

    <select v-model="store.tone" class="dropdown">
      <option disabled value="">Tone</option>
      <option value="academic">Academic</option>
      <option value="casual">Casual</option>
      <option value="professional">Professional</option>
      <option value="creative">Creative</option>
      <option value="persuasive">Persuasive</option>
    </select>

    <select v-model="store.length" class="dropdown">
      <option disabled value="">Length</option>
      <option value="short">Short</option>
      <option value="medium">Medium</option>
      <option value="long">Long</option>
    </select>
  </div>
</template>

<script setup>
import { useGeneratorStore } from '../stores/generatorStore'

const store = useGeneratorStore()
</script>

<style scoped>
.dropdowns-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .dropdowns-row {
    grid-template-columns: 1fr;
  }
}

.dropdown {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
}

.dropdown:focus {
  outline: none;
  border-color: #667eea;
}
</style>