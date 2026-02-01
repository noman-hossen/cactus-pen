<script setup>
import { computed } from 'vue'

const props = defineProps({
  topic: String,
  content: String,
  tone: String,
  difficulty: String,
})

const formattedDate = computed(() =>
  new Date().toLocaleDateString()
)
</script>

<template>
  <section class="preview-page">
    <header class="preview-header">Cactus-Pen</header>

    <h1 class="preview-title">{{ topic }}</h1>

    <article class="preview-body">
      {{ content }}
    </article>

    <footer class="preview-footer">
      <span>{{ tone }} • {{ difficulty }}</span>
      <span>{{ formattedDate }}</span>
    </footer>
  </section>
</template>

<style scoped>
.preview-page {
  max-width: 794px; /* A4 @ 96dpi */
  margin: 2rem auto;
  padding: 3rem 3.5rem;
  background: #fff;
  color: #111;
  font-family: "Times New Roman", Georgia, serif;
  line-height: 1.6;
  box-shadow: 0 8px 30px rgba(0,0,0,.08);
}

.preview-header {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 1.5rem;
}

.preview-title {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1.8rem;
}

.preview-body {
  font-size: 1rem;
  text-align: justify;
}

.preview-footer {
  margin-top: 3rem;
  padding-top: 1rem;
  font-size: 0.75rem;
  color: #777;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
}
</style>
