<template>
  <div class="features-wireframe">
    <h2 class="section-title">Key Features</h2>
    
    <div class="features-grid">
      <div class="feature-card">
        <h3>No Login Required</h3>
        <p>Start generating content immediately without any registration or sign-up process.</p>
        <button class="feature-link">Learn More →</button>
      </div>
      
      <div class="feature-card">
        <h3>Privacy First</h3>
        <p>Your data is never stored or shared. All processing happens in real-time.</p>
        <button class="feature-link">Learn More →</button>
      </div>
      
      <div class="feature-card">
        <h3>PDF Export</h3>
        <p>Download generated content as formatted PDF files for easy sharing and printing.</p>
        <button class="feature-link">Learn More →</button>
      </div>
      
      <div class="feature-card">
        <h3>Multiple Formats</h3>
        <p>Generate paragraphs, essays, letters, summaries, and reports with different tones.</p>
        <button class="feature-link">Learn More →</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features-wireframe {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 1.8rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  padding: 25px;
  background: #f9f9f9;
  border-radius: 8px;
  border-top: 4px solid #667eea;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.2rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.feature-link {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-size: 0.95rem;
}

.feature-link:hover {
  text-decoration: underline;
}
</style>