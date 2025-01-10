<template>
  <div class="index-page">
    <!-- 顶部固定导航 -->
    <header class="header">
      <!-- 左上角菜单按钮 -->
      <div class="menu">
        <button @click="toggleDropdown">Menu</button>
        <!-- 下拉菜单列表 -->
        <transition name="fade">
          <ul v-if="showDropdown" class="dropdown">
            <li>产品介绍</li>
            <li>我们团队</li>
            <li>产品展示</li>
            <li>预约产品</li>
          </ul>
        </transition>
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


const showDropdown = ref(false)
function toggleDropdown() {
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

/* 左上角菜单容器 */
.menu {
  position: relative;
}

/* 下拉菜单 */
.dropdown {
  position: absolute;
  top: 50px; /* 与导航栏错开 */
  left: 0;
  list-style-type: none;
  margin: 0;
  padding: 8px 0;
  background-color: #111010;
  border: 1px solid #ccc;
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

/* 用于下拉菜单的简单渐隐动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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

</style>
