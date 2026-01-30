<template>
  <div class="generator-header">
    <h1>Generate Paragraphs with AI! 🌵</h1>
    <p class="subtitle">Input a topic and instantly get AI-generated content</p>
  </div>
</template>

<script setup>
// No props needed, just static content
</script>

<style scoped>
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --secondary-dark: #7b886b;
  --text-dark: #1a2a24;
}

.generator-header h1 {
  margin-bottom: 12px;
  color: var(--text-dark);
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary-dark), var(--secondary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: var(--secondary-dark);
  margin-bottom: 35px;
  font-size: 1.1rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .generator-header h1 {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style>