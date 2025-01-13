<template>
  <header class="header">
    <!-- 左侧菜单按钮 -->
    <div class="menu-wrapper">
      <button 
        @click="toggleDropdown"
        class="menu-button group"
        :class="{ 'is-active': showDropdown }"
        aria-label="Toggle menu"
      >
        <div class="button-content">
          <MenuIcon v-if="!showDropdown" class="icon" />
          <XIcon v-else class="icon" />
          <span class="button-text">Menu</span>
        </div>
        <div class="button-background"></div>
      </button>
    </div>

    <!-- Logo标题 -->
    <h1 class="title">
      <span class="logo-text">ScentPin</span>
    </h1>

    <!-- 右侧区域 -->
    <div class="right-section"></div>

    <!-- 侧边菜单遮罩 -->
    <Transition name="fade">
      <div 
        v-if="showDropdown"
        class="sidebar-overlay" 
        @click="showDropdown = false"
      >
        <!-- 侧边菜单 -->
        <div 
          class="sidebar"
          @click.stop
        >
          <div class="menu-header">
            <span class="menu-title">   </span>
          </div>
          <ul class="menu-list">
            <li v-for="(item, index) in menuItems" 
                :key="index"
                class="menu-list-item"
                :style="{ 
                  'animation-delay': `${(index + 1) * 0.1}s` 
                }"
            >
              <router-link
                :to="item.path"
                class="menu-item"
                @click="showDropdown = false"
              >
                <span class="menu-item-text">{{ item.name }}</span>
                <div class="menu-item-background"></div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { MenuIcon, XIcon } from 'lucide-vue-next'

const showDropdown = ref(false)

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About the product', path: '/introduce' },
  { name: 'Our team', path: '/team' },
  { name: 'Show', path: '/show' },
  { name: 'Reserve', path: '/reserve' }
]

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: transparent;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 40;
  transition: all 0.3s ease;
}

.header:hover {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

/* 菜单按钮样式 */
.menu-wrapper {
  position: relative;
  z-index: 1000;
}

.menu-button {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.button-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 2;
  color: #334155;
  transition: color 0.3s ease;
}

.button-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-button:hover .button-background,
.menu-button.is-active .button-background {
  opacity: 1;
}

.menu-button:hover .button-content,
.menu-button.is-active .button-content {
  color: #0f172a;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.button-text {
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}

/* Logo标题样式 */
.title {
  flex: 1;
  text-align: center;
}

.logo-text {
  background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* 侧边菜单样式 */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
}

.sidebar {
  width: 320px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.menu-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
}

.menu-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 0.02em;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list-item {
  opacity: 0;
  transform: translateX(-10px);
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-item {
  position: relative;
  display: block;
  padding: 1rem 1.25rem;
  margin: 0.5rem 0;
  color: #334155;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 500;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.menu-item-text {
  position: relative;
  z-index: 2;
}

.menu-item-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-item:hover .menu-item-background {
  opacity: 1;
}

.menu-item:hover {
  color: #0f172a;
}

.right-section {
  width: 80px;
  height: 30px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 动画优化 */
@media (prefers-reduced-motion: no-preference) {
  .icon {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .menu-button:hover .icon {
    transform: scale(1.1);
  }
  
  .menu-item {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .menu-item:hover {
    transform: translateX(4px);
  }
}
</style>