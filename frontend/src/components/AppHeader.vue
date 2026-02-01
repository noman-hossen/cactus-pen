<template>
  <nav class="navbar">
    <div class="logo-container">
      <img src="../assets/cactus-pen-logo.svg" alt="Cactus Pen Logo" class="logo-svg">
      <span class="app-title">Cactus-Pen</span>
    </div>

    <!-- nav links with icons -->
    <ul class="nav-links">
      <li>
        <a href="#" class="nav-link">
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="icon-outline" d="M3 12L5 10M5 10L12 3L19 10H21V21H15V15H9V21H3V10H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="icon-fill" d="M3 12L5 10M5 10L12 3L19 10H21V21H15V15H9V21H3V10H5Z" stroke="none" fill="currentColor" fill-opacity="0"/>
          </svg>
          <span>Home</span>
        </a>
      </li>
      <li>
        <a href="#" class="nav-link">
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="icon-outline" d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41709C18.3879 3.14052 17.6725 2.99818 16.95 2.99818C16.2275 2.99818 15.5121 3.14052 14.8446 3.41709C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.6417 1.54871 7.04097 1.54871 8.5C1.54871 9.95904 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.06211 22.0329 6.39465C21.7563 5.72719 21.351 5.12083 20.84 4.61Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="icon-fill" d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41709C18.3879 3.14052 17.6725 2.99818 16.95 2.99818C16.2275 2.99818 15.5121 3.14052 14.8446 3.41709C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.6417 1.54871 7.04097 1.54871 8.5C1.54871 9.95904 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.06211 22.0329 6.39465C21.7563 5.72719 21.351 5.12083 20.84 4.61Z" stroke="none" fill="currentColor" fill-opacity="0"/>
          </svg>
          <span>Support Us</span>
        </a>
      </li>
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
  justify-content: space-between;
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
  color: #d4a373;
  letter-spacing: 0.5px;
  margin-left: 3.5rem;
}

/* Navigation links */
.nav-links {
  display: flex;
  list-style: none;
  justify-content: space-around;
  gap: 2rem;
  margin: 0 2rem;
  padding: 0;
}

.nav-link {
  color: #363d1c;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.05rem;
  padding: 0.5rem 0.8rem;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 6px;
}

.nav-icon {
  transition: all 0.3s ease;
}

.icon-outline {
  transition: all 0.3s ease;
}

.icon-fill {
  transition: all 0.3s ease;
  transform-origin: center;
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
  background: rgba(10, 236, 208, 0.05);
}

.nav-link:hover .icon-outline {
  opacity: 0;
  transform: scale(0.95);
}

.nav-link:hover .icon-fill {
  fill-opacity: 1;
  transform: scale(1.05);
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
    justify-content: space-evenly;
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
  
  .nav-link {
    padding: 0.5rem 0.6rem;
    font-size: 1rem;
    gap: 0.4rem;
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
    font-size: 0.9rem;
    padding: 0.4rem 0.5rem;
    gap: 0.3rem;
  }
  
  .nav-icon {
    width: 18px;
    height: 18px;
  }
  
  .app-title {
    font-size: 1.3rem;
    margin-left: 1.2em;
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

/* Animation for icon fill effect */
@keyframes fillIn {
  0% {
    fill-opacity: 0;
    transform: scale(0.8);
  }
  100% {
    fill-opacity: 1;
    transform: scale(1.05);
  }
}

.nav-link:hover .icon-fill {
  animation: fillIn 0.3s ease forwards;
}
</style>