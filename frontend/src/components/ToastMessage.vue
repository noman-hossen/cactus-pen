<template>
  <transition name="fade">
    <div v-if="isVisible" class="toast" :class="type">
      <i :class="icon"></i>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isVisible: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])
const isVisible = ref(false)
let timeoutId = null

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    isVisible.value = true
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      isVisible.value = false
      emit('close')
    }, props.duration)
  } else {
    isVisible.value = false
  }
})

const icon = {
  success: 'fas fa-check-circle',
  error: 'fas fa-exclamation-circle',
  info: 'fas fa-info-circle'
}[props.type]
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  animation: slideIn 0.3s ease;
}

.toast.success {
  background: #10b981;
  color: white;
  border-left: 4px solid #059669;
}

.toast.error {
  background: #ef4444;
  color: white;
  border-left: 4px solid #dc2626;
}

.toast.info {
  background: #3b82f6;
  color: white;
  border-left: 4px solid #2563eb;
}

.toast i {
  font-size: 1.2em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .toast {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style>
