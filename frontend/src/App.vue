<template>
  <div class="app-wrapper">
    <div class="app-header">
      <h1>🌵 Cactus-pen AI ✍️</h1>
      <p class="subtitle">Free AI writing assistant for students • No login required • PDF export</p>
    </div>
    
    <main class="app-main">
      <ParagraphGenerator />
    </main>
    
    <footer class="app-footer">
      <p>
        <strong>Privacy First:</strong> No data stored • No registration • Your writing stays yours
      </p>
      <p class="credit">
        Powered by Hugging Face AI • Built for students • Made with ❤️
      </p>
    </footer>
  </div>
</template>

<script setup>
import ParagraphGenerator from './components/ParagraphGenerator.vue'
</script>

<style>
.app-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.app-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.2em;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1em;
}

.app-main {
  margin-bottom: 30px;
}

.app-footer {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  color: #7f8c8d;
  font-size: 0.9em;
}

.app-footer .credit {
  margin-top: 10px;
  color: #95a5a6;
  font-size: 0.85em;
}
</style>