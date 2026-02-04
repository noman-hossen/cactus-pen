
<template>
  <div class="app">
    <AppHeader />
    
    <div class="app-container">
      <!-- Generator Section (Input/Controls) -->
      <div class="generator-wireframe">
        <GeneratorHeader />
        <TopicInput />
        <OptionsDropdowns />
        <GenerateButton />
        <ErrorMessage />
      </div>
      
      <!-- Output Section (Separate card below) -->
      <div class="output-container">
        <GeneratorOutput />
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
  /* Brand / Primary */
  --primary-dark: #d4a373;     /* cactus green (main actions, logo text) */
  --primary-light: #e8f5ef;    /* soft mint background accents */

  /* Secondary */
  --secondary-dark: #c28b3c;   /* warm sand / pencil wood */
  --secondary-light: #f2d6a2;  /* light sand for cards / highlights */

  /* Text */
  --text-dark: #1e2a26;        /* near-black green (main text) */
  --text-muted: #5f6f68;       /* secondary text, placeholders */

  /* Neutrals */
  --white: #ffffff;
  --light-gray: #f7f4ef;       /* page background */
  --border-color: #d9e2db;     /* subtle borders */
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #ffb88e;
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
  gap: 30px; /* Space between sections */
}

/* Generator Section Styling */
.generator-wireframe {
  max-width: 800px;
  margin: auto;
  background: var(--white);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* Output Container - Separate from generator */
.output-container {
  max-width: 800px;
  margin: auto;
  width: 100%;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  body {
    padding: 20px;
  }
  
  .app-container {
    gap: 20px;
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
  
  .app-container {
    gap: 15px;
  }
  
  .generator-wireframe {
    padding: 15px;
  }
}
</style>
