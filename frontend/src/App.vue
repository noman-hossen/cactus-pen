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
/* Global styles with updated high-contrast palette */
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

/* Updated Color Palette with Better Contrast */
:root {
  /* Primary Colors - Brighter for better contrast */
  --primary-dark: #00BFA5;    /* Brighter teal - WCAG AAA on white */
  --primary-light: #66D9B0;   /* Lighter mint */
  
  /* Secondary Colors - Adjusted for contrast */
  --secondary-light: #6B9C7D; /* Adjusted green - Better contrast */
  --secondary-dark: #5A6B4A;  /* Darker olive */
  
  /* Text Colors - High contrast */
  --text-light: #FFFFFF;      /* Pure white for dark backgrounds */
  --text-dark: #1A2A24;       /* Very dark green for light backgrounds */
  --text-muted: #4A5C52;      /* Medium gray for secondary text */
  
  /* Background Colors */
  --glass-bg: rgba(255, 255, 255, 0.95); /* More opaque for better contrast */
  --glass-border: rgba(102, 217, 176, 0.3);
  --glass-dark: rgba(90, 107, 74, 0.2);
  
  /* Accent Colors */
  --accent-blue: #4A90E2;
  --accent-orange: #FF6B6B;
  --accent-purple: #9B59B6;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, 
    var(--secondary-dark) 0%, 
    var(--secondary-light) 40%, 
    var(--primary-light) 100%);
  min-height: 100vh;
  padding: 20px;
  color: var(--text-dark);
  line-height: 1.6;
}

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
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(90, 107, 74, 0.2);
  position: relative;
  min-height: 400px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out;
  color: var(--text-dark);
}

/* Ensure all text has minimum contrast */
.generator-wireframe * {
  color: inherit;
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