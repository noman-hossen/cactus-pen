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
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
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
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  min-height: 400px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* Center on large screens */
  animation: fadeIn 0.5s ease-out;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  body {
    padding: 10px 15px; /* Reduce padding on mobile */
  }
  
  .app-container {
    padding: 10px 0;
  }
  
  .generator-wireframe {
    padding: 25px 20px; /* Reduce padding on mobile */
    min-height: 300px; /* Reduce minimum height on mobile */
    border-radius: 10px; /* Slightly smaller radius */
  }
}

@media (max-width: 480px) {
  body {
    padding: 8px 12px; /* Even smaller padding on very small screens */
  }
  
  .generator-wireframe {
    padding: 20px 15px; /* Even smaller padding */
    min-height: 250px;
  }
}

/* Ensure all child components have proper mobile styling */
@media (max-width: 768px) {
  /* You can add global mobile styles for child components here */
  :deep(.component-class) {
    /* Example: Force full width on mobile for child components */
    width: 100% !important;
    max-width: 100% !important;
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