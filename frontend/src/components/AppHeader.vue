<template>
  <nav class="navbar">
    <div class="logo-container">
      <!-- If your SVG is an image, keep as is. If it's inline SVG, update accordingly -->
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
/* Add base styles for the page if not already set in parent */
:deep(body) {
  background: linear-gradient(135deg, #0c0c2e 0%, #1a1a3e 50%, #0f0f2c 100%);
  margin: 0;
  min-height: 100vh;
}

.navbar {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px) saturate(180%);
  -webkit-backdrop-filter: blur(15px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Liquid glass effect with gradient border */
.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(0, 200, 255, 0.5), 
    rgba(100, 150, 255, 0.5), 
    rgba(0, 200, 255, 0.5), 
    transparent
  );
}

/* Logo container */
.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between ;
  gap: 1rem;
}

/* SVG Logo styling - updated for img tag */
.logo-svg {
  width: 42px;
  height: 42px;
  filter: drop-shadow(0 0 8px rgba(100, 200, 255, 0.4));
  transition: all 0.3s ease;
}

/* If you want hover effects on the logo image */
.logo-svg:hover {
  filter: drop-shadow(0 0 12px rgba(100, 200, 255, 0.6));
  transform: scale(1.05);
}

.app-title {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(90deg, #a0e7ff, #70c0ff, #a0e7ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(100, 200, 255, 0.3);
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
  color: rgba(220, 240, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.05rem;
  padding:  0;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #70c0ff, #a0e7ff);
  transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 2px;
}

.nav-link:hover {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
}

.nav-link:hover::after {
  width: 100%;
}

/* CTA Button */
.cta-button {
  background: rgba(100, 180, 255, 0.15);
  border: 1px solid rgba(100, 200, 255, 0.3);
  color: #c2e6ff;
  padding: 0.7rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.2), transparent);
  transition: left 0.7s ease;
  z-index: -1;
}

.cta-button:hover {
  background: rgba(100, 180, 255, 0.25);
  border-color: rgba(100, 200, 255, 0.6);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(100, 200, 255, 0.3);
  transform: translateY(-2px);
}

.cta-button:hover::before {
  left: 100%;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .navbar {
    padding: 0.8rem 1rem;
    flex-wrap: wrap;
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
}
</style>