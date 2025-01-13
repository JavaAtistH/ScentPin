<template>
  <div class="booking-container no-select">
    <!--  进度条 -->
    <div class="progress-bar-container">
      <div class="progress-bar-wrapper">
        <div class="progress-bar-content">
          <!-- 返回按钮 -->
          <button @click="prevStep" class="back-button" :class="{ 'invisible': currentStep === 1 }">
            <ChevronLeft class="icon" />
          </button>

          <!-- 进度步骤 -->
          <div class="progress-steps">
            <div class="steps-wrapper">
              <div 
                v-for="(step, index) in steps" 
                :key="index" 
                class="step-item"
              >
                <div
                  class="step-circle"
                  :class="[      
                    currentStep > index  //currentStep > index +1
                      ? 'step-completed'
                      : currentStep === index + 1
                        ? 'step-current'
                        : 'step-upcoming'
                  ]"
                >
                  <component :is="step.icon" class="icon" />
                </div>

                <div 
                  v-if="index < steps.length - 1"
                  class="step-line"
                  :class="[
                    currentStep > index + 1
                      ? 'line-completed'
                      : 'line-upcoming'
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 表单内容 -->
    <div class="form-container">
      <div class="form-content">

        <!-- 第 1 步：年龄选择 -->
        <div v-if="currentStep === 1" class="step-container">
          <div class="step-header">
            <h1 class="step-title">HOW OLD ARE YOU?</h1>
          </div>

          <div class="age-slider">
            <div class="slider-track" ref="sliderContainerRef">
              <div class="slider-progress" :style="{ width: `${(age / 100) * 100}%` }"></div>
              <div 
                class="slider-handle"
                :style="{ left: `${(age / 100) * 100}%` }"
                @mousedown="startDragging"
                @touchstart="startDragging"
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

        <!-- 第 2 步：性别选择-->
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
                <component :is="option.icon" class="gender-icon" :class="{ 'selected': gender === option.value }" />
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

        <!-- 第 3 步：香水浓度 -->
        <div v-if="currentStep === 3" class="step-container">
          <div class="step-header">
            <h1 class="step-title">How strong of a perfume do you like?</h1>
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

        <!-- 第 4 步：喜欢的香水类型 -->
        <div v-if="currentStep === 4" class="step-container">
          <div class="step-header">
            <h1 class="step-title">Which perfume style do you prefer?</h1>
            <p class="step-subtitle">Select only 1.</p>
          </div>

          <div class="type-options">
            <button
              v-for="option in typeOptions"
              :key="option.value"
              @click="favoriteType = option.value"
              class="type-button"
              :class="{ 'selected': favoriteType === option.value }"
            >
              <div class="type-content">
                <component
                  v-if="option.icon"
                  :is="option.icon"
                  class="type-icon"
                  :class="{ 'selected': favoriteType === option.value }"
                />
                <!-- 如果没有 svg icon，可直接展示文字或其他元素 -->
                <span
                  v-else
                  class="type-icon"
                  :class="{ 'selected': favoriteType === option.value }"
                >
                  ☆
                </span>

                <span
                  class="type-label"
                  :class="{ 'selected': favoriteType === option.value }"
                >
                  {{ option.label }}
                </span>
              </div>
            </button>
          </div>
        </div>

        <!-- 第 5 步：联系方式 -->
        <div v-if="currentStep === 5" class="step-container">
          <div class="step-header">
            <h1 class="step-title">YOUR CONTACT INFO</h1>
            <p class="step-subtitle">Please fill in your details.</p>
          </div>

          <div class="contact-form">
            <label class="contact-label">
              Name:
              <input type="text" v-model="contactName" class="contact-input" />
            </label>

            <label class="contact-label">
              Phone:
              <input type="tel" v-model="contactPhone" class="contact-input" />
            </label>

            <label class="contact-label">
              Email:
              <input type="email" v-model="contactEmail" class="contact-input" />
            </label>
          </div>
        </div>

        <!-- 导航 -->
        <div class="navigation">
          <button @click="nextStep" class="next-button">
            {{ currentStep === steps.length ? 'OVER' : 'NEXT' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronLeft, User, Heart, Sparkles, Flower2, Mail ,Users} from 'lucide-vue-next'
import FemaleIcon from '../assets/Reserve/female.svg?component'
import MaleIcon from '../assets/Reserve/male.svg?component'



/** ============= 数据和状态 ============= **/
const currentStep = ref(1)
const age = ref(42)
const gender = ref(null)
const strength = ref(null)

// 新增：喜欢的香水类型
const favoriteType = ref(null)

// 新增：联系方式
const contactName = ref('')
const contactPhone = ref('')
const contactEmail = ref('')

// steps 数组用于控制进度指示器 （增至 5 步）
const steps = [
  { icon: User, label: 'About' },
  { icon: Heart, label: 'Personality' },
  { icon: Sparkles, label: 'Scents' },
  { icon: Flower2, label: 'Type' },   // 第四步
  { icon: Mail, label: 'Contact' }    // 第五步
]

// 性别选项
const genderOptions = [
  { value: 'male', label: 'MALE', icon: MaleIcon },
  { value: 'female', label: 'FEMALE', icon: FemaleIcon },
  { value: 'neutral', label: 'GENDER NEUTRAL', icon: Users }
]

// 浓度选项
const strengthOptions = [
  { value: 'light', label: 'Subtle', height: 60 },
  { value: 'medium', label: 'Balanced', height: 80 },
  { value: 'strong', label: 'Strong', height: 100 }
]

// 喜欢的香水类型选项，示例
const typeOptions = [
  { value: 'floral', label: 'Floral', icon: Flower2 },
  { value: 'woody', label: 'Woody', icon: null },  // 如果没有对应的icon，可以替换或直接展示文字
  { value: 'fresh', label: 'Fresh', icon: null },
  { value: 'oriental', label: 'Oriental', icon: null }
]

// 引用 slider-track 容器
const sliderContainerRef = ref(null)

/** ============= 拖拽滑块事件处理 ============= **/
const startDragging = (event) => {
  const getPageX = (e) => e.touches?.[0]?.pageX || e.pageX
  const container = sliderContainerRef.value
  if (!container) return

  const containerRect = container.getBoundingClientRect()

  const updateAge = (pageX) => {
    const relativeX = pageX - containerRect.left
    const percentage = Math.max(0, Math.min(1, relativeX / containerRect.width))
    age.value = Math.round(percentage * 100)
  }

  updateAge(getPageX(event))

  const onPointerMove = (e) => {
    e.preventDefault()
    updateAge(getPageX(e))
  }

  const onPointerUp = () => {
    document.removeEventListener('mousemove', onPointerMove)
    document.removeEventListener('mouseup', onPointerUp)
    document.removeEventListener('touchmove', onPointerMove)
    document.removeEventListener('touchend', onPointerUp)
  }

  document.addEventListener('mousemove', onPointerMove)
  document.addEventListener('mouseup', onPointerUp)
  document.addEventListener('touchmove', onPointerMove)
  document.addEventListener('touchend', onPointerUp)
}

/** ============= 步骤跳转逻辑 ============= **/
const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  } else {
    // 所有步骤完成，执行提交或跳转等操作
    console.log('所有步骤完成，提交表单：', {
      age: age.value,
      gender: gender.value,
      strength: strength.value,
      favoriteType: favoriteType.value,
      contactName: contactName.value,
      contactPhone: contactPhone.value,
      contactEmail: contactEmail.value
    })
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

/* Progress Bar Styles */
.progress-bar-container {
  position: fixed;
  width: 98%;
  top: 80px;
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
  color: #f7ebeb;
  border-radius: 9999px;
  background-color: #1b1b19;
  padding: 0.5rem;
  transition: background-color 0.3s;
  position: relative;
  left: -50px; 
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

/* Form Content Styles */
.form-container {
  padding: 12rem 1rem 5rem;
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
  color: #2C2C2C;
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

/* 香水浓度选择样式 */
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
  background-color: #dd490f;
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

/* 香水类型选择样式 */
.type-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.type-button {
  position: relative;
  height: 8rem;
  border-radius: 1rem;
  background-color: #F5EFE6;
  transition: all 0.3s;
}

.type-button:hover {
  background-color: #EFE9E0;
}

.type-button.selected {
  background-color: #2C2C2C;
}

.type-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.type-icon {
  width: 2rem;
  height: 2rem;
  color: #374151;
  transition: color 0.3s;
}

.type-icon.selected {
  color: white;
}

.type-label {
  font-weight: 500;
  color: #374151;
  transition: color 0.3s;
}

.type-label.selected {
  color: white;
}

/* 联系方式表单样式 */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #374151;
}

.contact-input {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #E5E5E5;
  height: 26px;
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

  .type-options {
    grid-template-columns: 1fr;
  }
}
</style>
