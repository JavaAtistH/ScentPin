<template>
  <div class="team-container">
    <!-- 3D Carousel Section -->
    <div class="carousel-section">
      <div class="carousel-container" ref="carouselRef">
        <div 
          v-for="(member, index) in teamMembers" 
          :key="index"
          class="carousel-item"
          :style="getCarouselItemStyle(index)"
          @click="rotateToIndex(index)"
        >
          <div class="member-card" :class="{ 'active': currentIndex === index }">
            <div class="member-image-wrapper">
              <img :src="member.image" :alt="member.name" class="member-image" />
              <div class="member-overlay">
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-title">{{ member.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button class="nav-button prev" @click="rotate('prev')" aria-label="Previous">
        <ChevronLeft class="icon" />
      </button>
      <button class="nav-button next" @click="rotate('next')" aria-label="Next">
        <ChevronRight class="icon" />
      </button>
    </div>

    <!-- Team Information Section -->
    <div class="team-info">
      <div class="info-content">
        <h1 class="team-title">Our Journey in Perfumery</h1>
        
        <div class="timeline">
          <div class="timeline-item" v-for="(milestone, index) in milestones" :key="index">
            <div class="year">{{ milestone.year }}</div>
            <div class="content">
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.description }}</p>
            </div>
          </div>
        </div>

        <div class="team-values">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-item" v-for="(value, index) in values" :key="index">
              <component :is="value.icon" class="value-icon" />
              <h3>{{ value.title }}</h3>
              <p>{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight, Heart, Sparkles, Globe, Award } from 'lucide-vue-next'
import ceoimg from '../assets/member/ceo.jpg'
import huang from '../assets/member/member.jpg'
import peng from '../assets/member/member1.png'
import gao from '../assets/member/member3.png'

const teamMembers = [
  {
    name: "Zhangjianxin",
    title: "CEO",
    image: ceoimg
  },
  {
    name: "黄科钦",
    title: "CTO",
    image: huang
  },
  {
    name: "彭浩宇",
    title: "CTO",
    image: peng
  },
  {
    name: "高敏峰",
    title: "people",
    image: gao
  },
 
]

const milestones = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Founded with a vision to create extraordinary fragrances that tell stories."
  },
  {
    year: "2020",
    title: "Global Recognition",
    description: "Received international acclaim for our innovative approach to perfumery."
  },
  {
    year: "2022",
    title: "Sustainability Initiative",
    description: "Launched our eco-friendly packaging and sustainable sourcing program."
  },
  {
    year: "2023",
    title: "Innovation Lab",
    description: "Opened our state-of-the-art research and development facility."
  }
]

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We pour our hearts into every creation, ensuring each scent is perfect."
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Constantly pushing boundaries in the world of fragrance."
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "Committed to environmental responsibility in all our practices."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for perfection in every bottle we produce."
  }
]

const carouselRef = ref(null)
const currentIndex = ref(0)
const radius = 400
const autoRotateInterval = ref(null)

const getCarouselItemStyle = (index) => {
  const totalItems = teamMembers.length
  const angle = (index - currentIndex.value) * (360 / totalItems)
  const radian = (angle * Math.PI) / 180
  
  const x = Math.sin(radian) * radius
  const z = Math.cos(radian) * radius - radius
  
  return {
    transform: `translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`,
    zIndex: Math.round(z)
  }
}

const rotate = (direction) => {
  if (direction === 'next') {
    currentIndex.value = (currentIndex.value + 1) % teamMembers.length
  } else {
    currentIndex.value = (currentIndex.value - 1 + teamMembers.length) % teamMembers.length
  }
}

const rotateToIndex = (index) => {
  currentIndex.value = index
}

const startAutoRotate = () => {
  autoRotateInterval.value = setInterval(() => {
    rotate('next')
  }, 5000)
}

const stopAutoRotate = () => {
  if (autoRotateInterval.value) {
    clearInterval(autoRotateInterval.value)
  }
}

onMounted(() => {
  startAutoRotate()
})

onBeforeUnmount(() => {
  stopAutoRotate()
})
</script>

<style scoped>
/*  position: fixed;
  top: 80px; 为header留出空间 
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #FAF7F2;
  overflow-y: auto;
  overflow-x: hidden;
  */
.team-container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  background-color: #FAF7F2;
}

/* Carousel Section */
.carousel-section {
  position: relative;
  height: 100vh;
  perspective: 1000px;
  overflow: hidden;
  background: linear-gradient(to bottom, #FAF7F2, #F5EFE6);
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  left: -60px; 
}

.carousel-item {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 50% 50% -400px;
  transition: all 0.5s ease;
  cursor: pointer;
}

.member-card {
  transform: translateX(-50%) translateY(-50%);
  width: 300px;
  height: 400px;
  transition: all 0.3s ease;
}

.member-card.active {
  transform: translateX(-50%) translateY(-50%) scale(1.1);
}

.member-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.member-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.member-card:hover .member-overlay {
  transform: translateY(0);
}

.member-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.member-title {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0.5rem 0 0;
}

/* Navigation Buttons */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-button:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.prev {
  left: 2rem;
}

.next {
  right: 2rem;
}

.icon {
  width: 24px;
  height: 24px;
  color: #333;
}

/* Team Information Section */
.team-info {
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(to bottom, #FAF7F2, #F5EFE6);
}

.info-content {
  max-width: 1200px;
  margin: 0 auto;
}

.team-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  color: #2C2C2C;
}

/* Timeline Styles */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto 6rem;
  padding: 2rem 0;
}
.timeline-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 4rem;
}

.year {
  flex: 0 0 120px;
  text-align: right;
  padding-right: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2C2C2C;
}

.content {
  flex: 0 0 50%;
  padding-left: 2rem;
}

.content h3 {
  margin: 0 0 0.5rem;
  color: #2C2C2C;
}

.content p {
  margin: 0;
  color: #666;
}

/* Values Grid */
.team-values {
  text-align: center;
}

.team-values h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #2C2C2C;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.value-item {
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
}

.value-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
  color: #2C2C2C;
}

.value-item h3 {
  margin: 0 0 1rem;
  color: #2C2C2C;
}

.value-item p {
  margin: 0;
  color: #666;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .carousel-section {
    height: 70vh;
  }
  
  .timeline::before {
    left: 2rem;
  }
  
  .timeline-item {
    flex-direction: column;
  }
  
  .year {
    text-align: left;
    padding-right: 0;
    padding-left: 4rem;
    margin-bottom: 1rem;
  }
  
  .content {
    padding-left: 4rem;
  }
}

@media (max-width: 768px) {
  .team-title {
    font-size: 2rem;
  }
  
  .nav-button {
    width: 40px;
    height: 40px;
  }
  
  .prev {
    left: 1rem;
  }
  
  .next {
    right: 1rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>