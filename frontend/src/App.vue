<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <h1>🌵 CactusPen</h1>
      <p class="tagline">AI-Powered Writing Assistant</p>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <GeneratorSection />
        <FeaturesSection />
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import GeneratorSection from './components/GeneratorSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  color: #333;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 40px 20px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.tagline {
  font-size: 1.2rem;
  opacity: 0.9;
}

.main-content {
  flex: 1;
  padding: 40px 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>