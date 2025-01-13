<template>
  <div class="wrapper">
    <!-- 第一个容器 -->
    <section class="section" :style="{ backgroundImage: `url(${sections[0].image})` }">
      <div class="content">
        <h2 class="title">{{ sections[0].title }}</h2>
        <p class="description">{{ sections[0].description }}</p>
        <br />
        <br />
        <!-- 立即预约 按钮 -->
        <router-link to="/Reserve" class="yugou">Reserve</router-link>
      </div>
    </section>

    <!-- 第二个容器 -->
    <section class="section" :style="{ backgroundImage: `url(${sections[1].image})` }">
      <div class="content">
        <h2 class="title">{{ sections[1].title }}</h2>
        <p class="description">{{ sections[1].description }}</p>
      </div>
    </section>

    <!-- 第三个容器 -->
    <section class="section" :style="{ backgroundImage: `url(${sections[2].image})` }">
      <div class="content">
        <h2 class="title">{{ sections[2].title }}</h2>
        <p class="description">{{ sections[2].description }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>

const sections = [
  {
    // 使用可访问的图片URL
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
    title: 'ScentPin',
    description: 'Controll Scent By YourSelf'
  },
  {
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
    title: 'Fasion',
    description: 'Feel life'
  },
  {
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3',
    title: 'Make the life be Art',
    description: 'live Artly'
  }
]
</script>

<style scoped>
.yugou {
  text-decoration: none;
  /* 移除下划线 */
  color: inherit;
  /* 确保文字颜色和原始样式一致 */
  display: inline-flex;
  /* 模拟按钮的外观 */
  align-items: center;
  justify-content: center;
  border: none;
  width: 200px;
  height: 50px;
  color: aliceblue;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  background: linear-gradient(90deg, #ff7eb3, #ff758c, #ff6b61);
  background-size: 300%;
  border-radius: 25px;
  box-shadow: 0 5px 15px rgba(255, 120, 173, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.yugou::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 70%);
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transition: opacity 0.3s ease, transform 0.5s ease;
  z-index: 1;
}

.yugou:hover {
  background-position: 100%;
  box-shadow: 0 8px 20px rgba(255, 120, 173, 0.8);
}

.yugou:hover::before {
  opacity: 1;
  transform: translateX(-30%) translateY(-30%) rotate(90deg);
}

.yugou span {
  position: relative;
  z-index: 2;
}

/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 确保html和body也是全屏的 */
:root {
  height: 100%;
}

/* 包装器样式 */
.wrapper {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  position: fixed;
  top: 0;
  left: 0;
}

.section {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}

.section:hover::before {
  background: rgba(0, 0, 0, 0.5);
}

.content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 2rem;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.description {
  font-size: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }
}
</style>