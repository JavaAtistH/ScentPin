<template>
  <div class="product-container">
    <div class="product-content">
      <!-- Category & Title -->
      <div class="header-section">
        <h2 class="category">FRAGRANCES</h2>
        <h1 class="title">ScentPin</h1>
      </div>

      <!-- Type & Classification -->
      <div class="classification">
        <span>SEA LEVEL</span>
        <span class="separator">|</span>
        <span class="muted">PARFUM</span>
      </div>

      <!-- Description -->
      <p class="description">
        ScentPin is an ethereal fragrance that captures the essence of a midnight garden. 
        This sophisticated scent combines rare florals with deep woody notes, creating an 
        unforgettable olfactory experience that lingers like moonbeams on still water.
      </p>

      <!-- Specifications -->
      <div class="specifications">
        <div class="spec-item">
          <span class="spec-label">CONCENTRATION</span>
          <div class="spec-value">
            <span>30%</span>
            <span class="muted">/ Parfum Extrait</span>
          </div>
        </div>

        <div class="spec-item">
          <span class="spec-label">LONGEVITY</span>
          <div class="spec-value">
            <span>12+ Hours</span>
            <span class="muted">/ Exceptional</span>
          </div>
        </div>

        <div class="spec-item">
          <span class="spec-label">SILLAGE</span>
          <div class="spec-value">
            <span>Moderate</span>
            <span class="muted">/ Elegant</span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="notes-section">
        <div class="note-group">
          <h3>TOP NOTES</h3>
          <div class="note-list">
            <span>Bergamot</span>
            <span>White Pepper</span>
            <span>Cardamom</span>
          </div>
        </div>
        
        <div class="note-group">
          <h3>HEART NOTES</h3>
          <div class="note-list">
            <span>Jasmine</span>
            <span>Iris</span>
            <span>Rose</span>
          </div>
        </div>
        
        <div class="note-group">
          <h3>BASE NOTES</h3>
          <div class="note-list">
            <span>Amber</span>
            <span>Vanilla</span>
            <span>Musk</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Image -->
    <div class="product-image">
      <div class="image-container">
        <img 
          :src="perfumeImage" 
          alt="ScentPin Perfume" 
          @mouseenter="handleMouseEnter"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
          :style="imageStyle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import perfumeImage from '../assets/xiangshui.png';




const mousePosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)

const handleMouseEnter = () => {
  isHovering.value = true
}

const handleMouseMove = (event) => {
  const { left, top, width, height } = event.target.getBoundingClientRect()
  const x = (event.clientX - left) / width
  const y = (event.clientY - top) / height
  mousePosition.value = { x, y }
}

const handleMouseLeave = () => {
  isHovering.value = false
}

const imageStyle = computed(() => {
  if (!isHovering.value) return {}
  
  const rotateX = (mousePosition.value.y - 0.5) * -10
  const rotateY = (mousePosition.value.x - 0.5) * 10
  
  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transition: 'transform 0.1s ease'
  }
})
</script>

<style scoped>
.product-container {
  position: fixed;
  top: 80px; /* 为header留出空间 */
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.product-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  padding: 4rem;
  margin: auto;
}

.header-section {
  margin-bottom: 2rem;
}

.category {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  color: #666;
}

.title {
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;
}

.classification {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
}

.separator {
  color: #666;
}

.muted {
  color: #666;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #ccc;
}

.specifications {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spec-label {
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  color: #666;
}

.spec-value {
  font-size: 1rem;
  letter-spacing: 0.05em;
}

.notes-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.note-group h3 {
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: #666;
  margin-bottom: 1rem;
}

.note-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.note-list span {
  font-size: 1rem;
  color: #fff;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.note-list span:hover {
  background: rgba(255, 255, 255, 0.15);
}

.product-image {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  height: 100%;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

@media (max-width: 1024px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .product-content {
    max-width: 100%;
    padding: 2rem;
  }

  .title {
    font-size: 3rem;
  }

  .product-image {
    order: -1;
    height: 50vh;
    padding: 2rem;
  }
}

@media (max-width: 640px) {
  .specifications {
    gap: 1rem;
  }

  .spec-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .product-image {
    height: 40vh;
  }
}
</style>