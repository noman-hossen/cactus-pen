<template>
  <nav class="navbar">
    <div class="logo-container">
      <img src="../assets/cactus-pen-logo.svg" alt="Cactus Pen Logo" class="logo-svg">
      <span class="app-title">Cactus-Pen</span>
    </div>

    <!-- nav links -->
    <ul class="nav-links">
      <li><a href="#" class="nav-link">Home</a></li>
      <li><a href="#" class="nav-link">Support Us</a></li>
    </ul>

    <!-- CTA Button -->
    <button class="cta-button">About</button>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
/* Color Palette - White Theme */
:root {
  --primary-dark: #0aecd0;     /* Teal accent */
  --primary-light: #94ddbc;    /* Light mint */
  --secondary-light: #88bb92;  /* Sage green */
  --secondary-dark: #7b886b;   /* Dark olive */
  --text-dark: #1a2a24;        /* Dark text */
  --text-muted: #6b7c6d;       /* Muted text */
  --white: #ffffff;
  --light-gray: #f8f9fa;
  --border-color: #e0e7e2;
}

.navbar {
  background: var(--white);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 4px 20px rgba(123, 136, 107, 0.08);
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
}

/* Logo container */
.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* SVG Logo styling */
.logo-svg {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(10, 236, 208, 0.2));
  transition: all 0.3s ease;
}

.logo-svg:hover {
  filter: drop-shadow(0 4px 8px rgba(10, 236, 208, 0.4));
  transform: scale(1.05);
}

.app-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-dark);
  letter-spacing: 0.5px;
}

/* Navigation links */
.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0 2rem;
  padding: 0;
}

.nav-link {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.05rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-dark);
  transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 2px;
}

.nav-link:hover {
  color: var(--text-dark);
  opacity: 1;
}

.nav-link:hover::after {
  width: 100%;
}

/* CTA Button */
.cta-button {
  background: var(--primary-dark);
  border: none;
  color: var(--text-dark);
  padding: 0.7rem 1.8rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.cta-button:hover {
  background: #09d4bc;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(10, 236, 208, 0.2);
}

.cta-button:active {
  transform: translateY(0);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .navbar {
    padding: 0.8rem 1rem;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  
  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
    margin: 1rem 0 0;
    gap: 1.5rem;
  }
  
  .app-title {
    font-size: 1.5rem;
  }
  
  .logo-svg {
    width: 36px;
    height: 36px;
  }
  
  .cta-button {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.7rem 0.9rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.95rem;
    padding: 0.3rem 0;
  }
  
  .app-title {
    font-size: 1.3rem;
  }
  
  .logo-svg {
    width: 32px;
    height: 32px;
  }
  
  .cta-button {
    padding: 0.5rem 1.2rem;
    font-size: 0.85rem;
  }
}
</style>