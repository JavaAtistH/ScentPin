<template>
  <div class="index-page">
    <!-- 顶部固定导航 -->
    <header class="header">
      <!-- 左上角菜单按钮 -->
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

      <!-- 中间标题 -->
      <h1 class="title" style="font-size: 50px;">ScentPin</h1>

      <!-- 右上角区域，先留空，也可放账号或其他功能按钮 -->
      <div class="right-section"></div>
    </header>

    <!-- 页面主要内容：让它占满屏幕剩余空间 -->
    <div class="content">
      <!-- 这里仅演示单图铺满，如果你确实想放多张图，
           需要用自己的布局方式来决定如何展示。 -->
           <div class="describe">
        <h2 class="first-describe-h">ScentPin</h2>
        <p class="first--describe-p">Controller Scent By Yourself</p>
      </div>
      <img
        src="../assets/image1.png"
        alt="香水"
        class="full-screen-img"
      />
    </div>
    <!-- 页面主要内容：让它占满屏幕剩余空间 -->
    <div class="content">
      <img
        src="../assets/image2.png"
        alt="香水"
        class="full-screen-img"
      />
    </div>
        <!-- 页面主要内容：让它占满屏幕剩余空间 -->
        <div class="content">
      <!-- 这里仅演示单图铺满，如果你确实想放多张图，
           需要用自己的布局方式来决定如何展示。 -->
      <img
        src="../assets/image3.png"
        alt="香水"
        class="full-screen-img"
      />
    </div>


  </div>
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
h1 {
    font-family: Arial, sans-serif;
}

/* 让页面从顶部开始无额外边距 */
html,
body {
  margin: 0;
  padding: 0;
  /* 若有其它默认样式要清除，也可在此统一处理 */
}

/* 最外层容器，给顶部导航栏预留 60px 空间 */
.index-page {
  font-family: sans-serif;
  /* 不要用 margin: 20px; 会产生空隙 */
  margin: 0; 
  padding: 0;
}

/* 顶部固定导航栏 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;            /* 导航栏高度 */
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 999;
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

/* 中间标题 */
.title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: black;
}

/* 右上角可放内容的占位 */
.right-section {
  width: 80px;
  height: 30px;
}


.odescribe h2 {
  font-size: 2rem;
  margin: 0.5rem 0;
}

.describe p {
  font-size: 1.2rem;
  margin: 0;
}
.first-describe-h{
  color: #111010;
}
.first--describe-p{
  color: #111010;
}
/* 覆盖文字 */
.describe {
  position: absolute; /* 绝对定位，相对于 content 容器 */
  top: 20%; /* 根据需要调整文字位置 */
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white; /* 设置文字颜色 */
  z-index: 2; /* 确保文字显示在图片上方 */
}
/* 主体内容：让它填满除去导航栏外的整个可视区 */
.content {
  /* calc(100vh - 60px) 即减去导航栏高度 */
  height: calc(100vh - 60px);
  width: 100%;
  /* 移除多余的 margin/padding */
  margin: 0;
  padding: 0;
  /* 如果需要内容可滚动，就可以不设 overflow: hidden。*/
}

/* 全屏铺满图片 */
.full-screen-img {
  width: 100%;
  height: 100%
  /* 去除默认的 inline-block 间隙 */
}
</style>
