<template>
  <footer class="app-footer">
    <div class="footer-main">
      <div class="footer-brand">
        <img src="../assets/cactus-pen-logo.svg" alt="Cactus Pen Logo" class="footer-logo">
        <span class="footer-title">Cactus-Pen</span>
      </div>
      
      <div class="footer-links">
        <a href="#" class="footer-link">Home</a>
        <span class="divider">•</span>
        <a href="#" class="footer-link">Support</a>
        <span class="divider">•</span>
        <a href="#" class="footer-link">About</a>
        <span class="divider">•</span>
        <a href="#" class="footer-link">Contact</a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">© 2023 Cactus-Pen</p>
      <p class="credits">ICONS BY: ZAPPICON.COM</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
/* Color Palette - White Theme */
:root {
  --primary-dark: #0aecd0;
  --secondary-dark: #7b886b;
  --text-dark: #1a2a24;
  --text-muted: #6b7c6d;
  --white: #ffffff;
  --light-gray: #f8f9fa;
  --border-color: #e0e7e2;
}

.app-footer {
  background: var(--light-gray);
  border-top: 1px solid var(--border-color);
  padding: 25px 0 15px;
  margin-top: 40px;
}

.footer-main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-logo {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 2px 3px rgba(10, 236, 208, 0.2));
}

.footer-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-dark);
  letter-spacing: 0.5px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  position: relative;
}

.footer-link:hover {
  color: var(--text-dark);
}

.footer-link:hover::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--primary-dark);
  border-radius: 1px;
}

.divider {
  color: var(--border-color);
  font-size: 0.8rem;
}

.footer-bottom {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-color);
  padding-top: 15px;
}

.copyright {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.credits {
  color: var(--text-muted);
  font-size: 0.8rem;
  font-style: italic;
  opacity: 0.8;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .app-footer {
    padding: 20px 0 12px;
    margin-top: 30px;
  }
  
  .footer-main {
    flex-direction: column;
    gap: 15px;
    text-align: center;
    margin-bottom: 15px;
  }
  
  .footer-links {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .footer-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 15px 0 10px;
  }
  
  .footer-main, .footer-bottom {
    padding: 0 15px;
  }
  
  .footer-links {
    font-size: 0.85rem;
    gap: 8px;
  }
  
  .footer-link {
    font-size: 0.85rem;
  }
  
  .footer-logo {
    width: 24px;
    height: 24px;
  }
}
</style>