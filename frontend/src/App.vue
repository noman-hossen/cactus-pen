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
    
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import GeneratorHeader from './components/GeneratorHeader.vue'
import TopicInput from './components/TopicInput.vue'
import OptionsDropdowns from './components/OptionsDropdowns.vue'
import GenerateButton from './components/GenerateButton.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import GeneratorOutput from './components/GeneratorOutput.vue'
import LoadingState from './components/LoadingState.vue'
</script>

<style>
/* Global styles */
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

/* Color Palette */
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --secondary-dark: #7b886b;
  --text-dark: #1a2a24;
  --text-muted: #6b7c6d;
  --white: #ffffff;
  --light-gray: #f8f9fa;
  --border-color: #e0e7e2;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f4f4f4;
  min-height: 100vh;
  padding: 40px;
  color: var(--text-dark);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Matches wireframe exactly */
.generator-wireframe {
  max-width: 800px;
  margin: auto;
  background: var(--white);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  body {
    padding: 20px;
  }
  
  .generator-wireframe {
    padding: 20px;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  body {
    padding: 15px;
  }
  
  .generator-wireframe {
    padding: 15px;
  }
}
</style>