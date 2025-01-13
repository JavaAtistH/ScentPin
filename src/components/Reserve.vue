<template>
    <div class="booking-container">
      <!-- Progress Bar -->
      <div class="progress-bar-container">
        <div class="progress-bar-wrapper">
          <div class="progress-bar-content">
            <!-- Back Button -->
            <button 
              @click="prevStep" 
              class="back-button"
              :class="{ 'invisible': currentStep === 1 }"
            >
              <ChevronLeft class="icon" />
            </button>
  
            <!-- Progress Steps -->
            <div class="progress-steps">
              <div class="steps-wrapper">
                <div v-for="(step, index) in steps" :key="index" class="step-item">
                  <div 
                    class="step-circle"
                    :class="[
                      currentStep > index + 1 ? 'step-completed' : 
                      currentStep === index + 1 ? 'step-current' : 'step-upcoming'
                    ]"
                  >
                    <component :is="step.icon" class="icon" />
                  </div>
                  <div 
                    v-if="index < steps.length - 1" 
                    class="step-line"
                    :class="[
                      currentStep > index + 1 ? 'line-completed' : 'line-upcoming'
                    ]"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Form Content -->
      <div class="form-container">
        <div class="form-content">
          <!-- Age Selection -->
          <div v-if="currentStep === 1" class="step-container">
            <div class="step-header">
              <h1 class="step-title">HOW OLD ARE YOU?</h1>
            </div>
            
            <div class="age-slider">
              <div class="slider-track">
                <div 
                  class="slider-progress"
                  :style="{ width: `${(age / 100) * 100}%` }"
                ></div>
                <div 
                  class="slider-handle"
                  :style="{ left: `${(age / 100) * 100}%` }"
                  @mousedown="startDragging"
                >
                  <div class="slider-value">{{ age }}</div>
                </div>
              </div>
              
              <div class="slider-labels">
                <span>1</span>
                <span>100</span>
              </div>
            </div>
          </div>
  
          <!-- Gender Selection -->
          <div v-if="currentStep === 2" class="step-container">
            <div class="step-header">
              <h1 class="step-title">WHAT IS YOUR GENDER?</h1>
              <p class="step-subtitle">Select only 1.</p>
            </div>
  
            <div class="gender-options">
              <button
                v-for="option in genderOptions"
                :key="option.value"
                @click="gender = option.value"
                class="gender-button"
                :class="{ 'selected': gender === option.value }"
              >
                <div class="gender-content">
                  <component 
                    :is="option.icon" 
                    class="gender-icon"
                    :class="{ 'selected': gender === option.value }"
                  />
                  <span 
                    class="gender-label"
                    :class="{ 'selected': gender === option.value }"
                  >
                    {{ option.label }}
                  </span>
                </div>
              </button>
            </div>
          </div>
  
          <!-- Perfume Strength -->
          <div v-if="currentStep === 3" class="step-container">
            <div class="step-header">
              <h1 class="step-title">您喜欢多浓的香水？</h1>
              <p class="step-subtitle">仅选择 1.</p>
            </div>
  
            <div class="strength-options">
              <button
                v-for="(option, index) in strengthOptions"
                :key="index"
                @click="strength = option.value"
                class="strength-button"
              >
                <div 
                  class="strength-bar"
                  :class="{ 'selected': strength === option.value }"
                  :style="{ height: `${option.height}%` }"
                ></div>
                <div 
                  class="strength-label"
                  :class="{ 'selected': strength === option.value }"
                >
                  {{ option.label }}
                </div>
              </button>
            </div>
          </div>
  
          <!-- Navigation -->
          <div class="navigation">
            <button
              @click="nextStep"
              class="next-button"
            >
              {{ currentStep === steps.length ? '完成' : '下一步' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { 
    ChevronLeft,
    User,
    Heart,
    Sparkles,
    Male,
    Female,
    Users
  } from 'lucide-vue-next'
  
  const currentStep = ref(1)
  const age = ref(42)
  const gender = ref(null)
  const strength = ref(null)
  
  const steps = [
    { icon: User, label: 'About' },
    { icon: Heart, label: 'Personality' },
    { icon: Sparkles, label: 'Scents' }
  ]
  
  const genderOptions = [
    { value: 'male', label: 'MALE', icon: Male },
    { value: 'female', label: 'FEMALE', icon: Female },
    { value: 'neutral', label: 'GENDER NEUTRAL', icon: Users }
  ]
  
  const strengthOptions = [
    { value: 'light', label: '微妙的', height: 60 },
    { value: 'medium', label: '均衡', height: 80 },
    { value: 'strong', label: '强的', height: 100 }
  ]
  
  const startDragging = (e) => {
    const container = e.target.parentElement
    const containerRect = container.getBoundingClientRect()
    
    const updateAge = (pageX) => {
      const relativeX = pageX - containerRect.left
      const percentage = Math.max(0, Math.min(1, relativeX / containerRect.width))
      age.value = Math.round(percentage * 100)
    }
    
    const onMouseMove = (e) => {
      updateAge(e.pageX)
    }
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
  
  const nextStep = () => {
    if (currentStep.value < steps.length) {
      currentStep.value++
    }
  }
  
  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }
  </script>
  
  <style scoped>
  .booking-container {
    min-height: 100vh;
    background-color: #FAF7F2;
  }
  
  .progress-bar-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    z-index: 50;
  }
  
  .progress-bar-wrapper {
    max-width: 56rem;
    margin: 0 auto;
    padding: 1.5rem 1rem;
  }
  
  .progress-bar-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .back-button {
    border-radius: 9999px;
    background-color: #F5EFE6;
    padding: 0.5rem;
    transition: background-color 0.3s;
  }
  
  .back-button:hover {
    background-color: #EFE9E0;
  }
  
  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .progress-steps {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
  }
  
  .steps-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .step-item {
    display: flex;
    align-items: center;
  }
  
  .step-circle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  
  .step-completed {
    background-color: #2C2C2C;
    color: white;
  }
  
  .step-current {
    background-color: #F5EFE6;
  }
  
  .step-upcoming {
    background-color: #F5EFE6;
    opacity: 0.5;
  }
  
  .step-line {
    width: 8rem;
    height: 2px;
    margin: 0 0.5rem;
  }
  
  .line-completed {
    background-color: #2C2C2C;
  }
  
  .line-upcoming {
    background-color: #E5E5E5;
  }
  
  .form-container {
    padding: 8rem 1rem 5rem;
  }
  
  .form-content {
    max-width: 32rem;
    margin: 0 auto;
  }
  
  .step-container {
    margin-bottom: 4rem;
  }
  
  .step-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .step-title {
    font-size: 2.25rem;
    font-weight: 300;
    letter-spacing: -0.025em;
  }
  
  .step-subtitle {
    color: #6B7280;
    margin-top: 1rem;
  }
  
  /* Age Slider Styles */
  .age-slider {
    position: relative;
    padding-top: 2.5rem;
  }
  
  .slider-track {
    position: relative;
    height: 0.5rem;
    background-color: #E5E5E5;
    border-radius: 9999px;
  }
  
  .slider-progress {
    position: absolute;
    height: 100%;
    background-color: #2C2C2C;
    border-radius: 9999px;
    transition: width 0.3s;
  }
  
  .slider-handle {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #2C2C2C;
    border-radius: 9999px;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: transform 0.3s;
  }
  
  .slider-handle:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  .slider-value {
    position: absolute;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    font-weight: 300;
  }
  
  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    color: #9CA3AF;
    font-size: 0.875rem;
  }
  
  /* Gender Selection Styles */
  .gender-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  .gender-button {
    position: relative;
    height: 8rem;
    border-radius: 1rem;
    background-color: #F5EFE6;
    transition: all 0.3s;
  }
  
  .gender-button:hover {
    background-color: #EFE9E0;
  }
  
  .gender-button.selected {
    background-color: #2C2C2C;
  }
  
  .gender-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .gender-icon {
    width: 2rem;
    height: 2rem;
    color: #374151;
    transition: color 0.3s;
  }
  
  .gender-icon.selected {
    color: white;
  }
  
  .gender-label {
    font-weight: 500;
    color: #374151;
    transition: color 0.3s;
  }
  
  .gender-label.selected {
    color: white;
  }
  
  /* Strength Selection Styles */
  .strength-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    height: 16rem;
  }
  
  .strength-button {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .strength-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #F5EFE6;
    border-radius: 0.5rem;
    transition: all 0.3s;
  }
  
  .strength-bar:hover {
    background-color: #EFE9E0;
  }
  
  .strength-bar.selected {
    background-color: #2C2C2C;
  }
  
  .strength-label {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    text-align: center;
    color: #374151;
    transition: color 0.3s;
  }
  
  .strength-label.selected {
    color: white;
  }
  
  /* Navigation Styles */
  .navigation {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
  }
  
  .next-button {
    background-color: #2C2C2C;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
  }
  
  .next-button:hover {
    background-color: black;
  }
  
  /* Utility Classes */
  .invisible {
    visibility: hidden;
  }
  
  /* Prevent text selection during dragging */
  .no-select {
    user-select: none;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .gender-options {
      grid-template-columns: 1fr;
    }
    
    .strength-options {
      grid-template-columns: 1fr;
      height: auto;
    }
    
    .strength-button {
      height: 8rem;
    }
    
    .step-line {
      width: 4rem;
    }
  }
  </style>