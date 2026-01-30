<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-brand">
        <img src="../assets/cactus-pen-logo.svg" alt="Logo" class="footer-logo">
        <span class="footer-title">Cactus-Pen</span>
        <span class="copyright">© 2023</span>
      </div>
      
      <div class="footer-info">
        <a href="#" class="footer-link">Support</a>
        <span class="divider">•</span>
        <span class="credits">ICONS BY: ZAPPICON.COM</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
:root {
  --primary-dark: #0aecd0;
  --primary-light: #94ddbc;
  --secondary-light: #88bb92;
  --secondary-dark: #7b886b;
  --text-light: #f5f9f7;
}

.app-footer {
  background: rgba(123, 136, 107, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(138, 187, 146, 0.1);
  padding: 18px 20px;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-logo {
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 0 3px rgba(10, 236, 208, 0.2));
}

.footer-title {
  color: var(--primary-light);
  font-size: 1.1rem;
  font-weight: 500;
}

.copyright {
  color: rgba(245, 249, 247, 0.6);
  font-size: 0.85rem;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-link {
  color: rgba(245, 249, 247, 0.7);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--primary-light);
}

.credits {
  color: rgba(245, 249, 247, 0.5);
  font-size: 0.75rem;
  font-style: italic;
}

.divider {
  color: rgba(138, 187, 146, 0.5);
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .footer-info {
    flex-direction: column;
    gap: 5px;
  }
  
  .divider {
    display: none;
  }
}
</style>