<template>
  <div class="generator-header">
    <h1><span class="wr">✨Writing Part</span> with AI</h1>
    <p class="subtitle">Type, generate, and Export in seconds....</p>
  </div>
</template>

<script setup>
// No props needed, just static content
</script>

<style scoped>
:root {
  --text-dark: #1a2a24;
  --text-muted: #6b7c6d;
  --primary-dark: #0aecd0;
}

.generator-header {
  margin-bottom: 30px;
}

.generator-header h1 {
  margin-bottom: 8px;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-dark);
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 20px;
}
.wr{
  color: #399c39;
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