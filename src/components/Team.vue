<template>
    <div class="team-container">
        <div class="team-header">
            <h1 class="team-title">我们的团队</h1>
            <p class="team-subtitle">专业调香师与香水顾问，为您提供专业的香水定制服务</p>
        </div>

        <div class="team-grid">
            <div v-for="member in teamMembers" :key="member.id" class="team-member">
                <div class="member-image-wrapper">
                    <img :src="getImageUrl(member.image)" :alt="member.name" class="member-image" />
                </div>
                <div class="member-info">
                    <h3 class="member-name">{{ member.name }}</h3>
                    <p class="member-role">{{ member.role }}</p>
                    <p class="member-description">{{ member.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 导入图片
import ceoImage from '../assets/member/ceo.jpg'
import ctoImage from '../assets/member/cto.jpg'

const teamMembers = [
    {
        id: 1,
        name: '张建鑫',
        role: 'CEO',
        description: '毕业于重庆大学，拥有22年香水制作经验。重大李荣浩',
        image: 'ceo'
    },
    {
        id: 2,
        name: '彭浩宇',
        role: 'CTO',
        description: '重庆大学研究生，机械工程专业，负责硬件研发',
        image: 'cto'
    },
    {
        id: 3,
        name: '高敏峰',
        role: '香水配方师',
        description: '精通现代调香技术，专注于可持续环保香料的应用。',
        image: 'cto'
    },
    {
        id: 4,
        name: '黄科钦',
        role: 'CEO二把手',
        description: '网站开发',
        image: 'cto'
    }
]

// 图片映射对象
const imageMap = {
    ceo: ceoImage,
    cto: ctoImage
}

// 获取图片URL的方法
const getImageUrl = (imageName) => {
    return imageMap[imageName] || '/placeholder.svg?height=400&width=300'
}
</script>

<style scoped>
.team-container {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #415d45;
    padding: 4rem 2rem;
    bottom: 10px;
}

.team-header {
    text-align: center;
    margin-bottom: 4rem;
    color: white;
}

.team-title {
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 1rem;
    letter-spacing: -0.025em;
}

.team-subtitle {
    font-size: 1.125rem;
    color: #A3A3A3;
    max-width: 600px;
    margin: 0 auto;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.team-member {
    background: #a4875b;
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.member-image-wrapper {
    width: 100%;
    padding-top: 75%;
    position: relative;
    background-color: #F5EFE6;
    overflow: hidden;
}

.member-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.team-member:hover .member-image {
    transform: scale(1.05);
}

.member-info {
    padding: 1.5rem;
}

.member-name {
    font-size: 1.25rem;
    font-weight: 500;
    color: white;
    margin-bottom: 0.5rem;
}

.member-role {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
    text-transform: uppercase;
}

.member-description {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
}

@media (max-width: 768px) {
    .team-container {
        padding: 2rem 1rem;
    }

    .team-title {
        font-size: 2rem;
    }

    .team-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .member-info {
        padding: 1rem;
    }
}
</style>