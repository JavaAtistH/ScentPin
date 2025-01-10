<template>
    <header class="header">
      <nav class="nav-container">
        <!-- 左侧菜单按钮 -->
        <div class="menu-wrapper">
          <button 
            @click="toggleDropdown"
            class="menu-button"
            aria-label="Toggle menu"
          >
            <MenuIcon v-if="!showDropdown" class="icon" />
            <XIcon v-else class="icon" />
            <span>Menu</span>
          </button>
  
          <!-- 侧边菜单 -->
          <div 
            class="sidebar-overlay" 
            :class="{ 'overlay-active': showDropdown }"
            @click="showDropdown = false"
          >
            <div 
              class="sidebar"
              :class="{ 'sidebar-active': showDropdown }"
              @click.stop
            >
              <ul class="menu-list">
                <li v-for="(item, index) in menuItems" :key="index">
                  <router-link
                    :to="item.path"
                    class="menu-item"
                    @click="showDropdown = false"
                  >
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- 中间logo -->
        <h1 class="logo">
          <router-link to="/" class="logo-link">
            ScentPin
          </router-link>
        </h1>
  
        <!-- 右侧区域 -->
        <div class="right-section">
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { MenuIcon, XIcon } from 'lucide-vue-next'
  
  const showDropdown = ref(false)
  
  const menuItems = [
    { name: '产品介绍', path: '/products' },
    { name: '我们团队', path: '/team' },
    { name: '产品展示', path: '/showcase' },
    { name: '预约产品', path: '/booking' }
  ]
  
  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
  }
  </script>
  
  <style scoped>
  /* 头部样式 */
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 50;
    height: 80px;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  /* 菜单按钮样式 */
  .menu-wrapper {
    position: relative;
  }
  
  .menu-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #4b5563;
    transition: color 0.2s ease;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 200;
    position: relative;
  }
  
  .menu-button:hover {
    color: #111827;
  }
  
  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  /* Logo样式 */
  .logo {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    flex: 1;
  }
  
  .logo-link {
    color: #1f2937;
    transition: color 0.2s ease;
    text-decoration: none;
  }
  
  .logo-link:hover {
    color: #111827;
  }
  
  /* 右侧区域样式 */
  .right-section {
    width: 68px;
  }
  
  /* 侧边栏遮罩层 */
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .overlay-active {
    opacity: 1;
    visibility: visible;
  }
  
  /* 侧边栏样式 */
  .sidebar {
    position: fixed;
    top: 0;
    left: -300px; /* 初始位置在屏幕外 */
    width: 300px;
    height: 100vh;
    background-color: white;
    box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 150;
  }
  
  .sidebar-active {
    transform: translateX(300px); /* 移动到可见区域 */
  }
  
  .menu-list {
    margin-top: 2rem;
    list-style: none;
    padding: 0;
  }
  
  .menu-item {
    display: block;
    padding: 1rem;
    color: #4b5563;
    text-decoration: none;
    font-size: 1.125rem;
    transition: all 0.2s ease;
    border-radius: 0.5rem;
  }
  
  .menu-item:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
  
  /* 确保内容不被header遮挡 */
  :deep(main) {
    margin-top: 80px;
  }
  </style>