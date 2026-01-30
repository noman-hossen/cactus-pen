<template>
  <div class="app">
    <AppHeader />
    
    <div class="app-container">
      <div class="generator-wireframe">
        <GeneratorHeader />
        
        <TopicInput />
        <OptionsDropdowns />
        
        <GenerateButton />
        <ErrorMessage />
        
        <GeneratorOutput />
        <LoadingState />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import GeneratorHeader from './components/GeneratorHeader.vue'
import TopicInput from './components/TopicInput.vue'
import OptionsDropdowns from './components/OptionsDropdowns.vue'
import GenerateButton from './components/GenerateButton.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import GeneratorOutput from './components/GeneratorOutput.vue'
import LoadingState from './components/LoadingState.vue'
</script>

<style>
/* Global styles with new color palette */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

/* Color Palette Variables */
:root {
  --primary-dark: #0aecd0;    /* AOECDO -> 0AECD0 */
  --primary-light: #94ddbc;   /* 94DDBC */
  --secondary-light: #88bb92; /* 88BB92 */
  --secondary-dark: #7b886b;  /* 7B886B */
  --text-light: #f5f9f7;
  --text-dark: #1a2a24;
  --glass-bg: rgba(149, 221, 188, 0.08);
  --glass-border: rgba(138, 187, 146, 0.2);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, var(--secondary-dark) 0%, var(--secondary-light) 50%, var(--primary-light) 100%);
  min-height: 100vh;
  padding: 20px;
  color: var(--text-dark);
}

/* App wrapper */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  padding: 20px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.generator-wireframe {
  background: rgba(255, 255, 255, 0.92);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(123, 136, 107, 0.2);
  position: relative;
  min-height: 400px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid var(--glass-border);
  animation: fadeIn 0.5s ease-out;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  body {
    padding: 12px 16px;
  }
  
  .app-container {
    padding: 12px 0;
  }
  
  .generator-wireframe {
    padding: 28px 22px;
    min-height: 350px;
    border-radius: 14px;
  }
}

@media (max-width: 480px) {
  body {
    padding: 10px 12px;
  }
  
  .generator-wireframe {
    padding: 24px 18px;
    min-height: 300px;
    border-radius: 12px;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>