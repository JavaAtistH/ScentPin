<template>
  <div class="product-intro">
    <div class="header">
      <h1 class="brand">ScentPin</h1>
    </div>
    <div class="content">
      <div class="image-container">
        <img src="../assets/member/ceo.jpg" alt="XX 香水" class="product-image" />
      </div>
      <div class="details">
        <h2 class="title">ScentPin</h2>
        <p class="price">价格：1000000000000000000000000000</p>
        <router-link to="/Reserve" class="cta-button">立即购买</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductIntro",
};
</script>

<style scoped>
.product-intro {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle, rgb(126, 153, 81) 0%, rgba(0, 210, 255, 1) 100%);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  overflow: hidden;
}

.header {
  margin-bottom: 30px;
  animation: fadeIn 1.2s ease;
}

.brand {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  animation: fadeInUp 1.2s ease;
}

.image-container {
  flex-shrink: 0;
  transform: perspective(800px) rotateY(10deg);
  transition: transform 0.5s ease;
}

.image-container:hover {
  transform: perspective(800px) rotateY(0deg) scale(1.05);
}

.product-image {
  width: 350px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.details {
  max-width: 400px;
  text-align: left;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #fff;
}

.description {
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.capacity,
.price {
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 500;
}

.cta-button {
  padding: 12px 28px;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(255, 105, 135, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
