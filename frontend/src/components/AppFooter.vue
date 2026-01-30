<template>
  <footer class="footer-wireframe">
    <div class="footer-content">
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>CactusPen</h4>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    
    <div class="copyright">
      © 2024 CactusPen. All rights reserved.
    </div>
  </footer>
</template>

<style scoped>
.footer-wireframe {
  background: #2c3e50;
  color: white;
  padding: 40px 20px;
  margin-top: 40px;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
}

.footer-section h4 {
  margin-bottom: 20px;
  color: #ecf0f1;
  font-size: 1.1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: white;
  text-decoration: underline;
}

.copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #34495e;
  color: #95a5a6;
  font-size: 0.9rem;
}
</style>