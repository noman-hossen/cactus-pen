<template>
  <div class="generator-header">
    <h1> ✨<span class="wr">Writing part</span> with AI</h1>
    <p class="subtitle">Type, Generate & Export....</p>
  </div>
</template>

<script setup>

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
  color: ;
}
.wr {
  color: #7c9947;
}
.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 20px;
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