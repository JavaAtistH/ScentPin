<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ThreeScene",
  mounted() {
    const container = this.$refs.threeContainer;

    // 初始化场景、相机、渲染器
    const scene = new THREE.Scene();
    // 给场景设置背景色
    scene.background = new THREE.Color(0xf5f5dc);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);

    // （可选）使用渲染器的清除色
    // renderer.setClearColor(0xf5f5dc, 1.0);

    container.appendChild(renderer.domElement);

    // 添加一个立方体
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 添加一个点光源
    const light = new THREE.PointLight(0xffffff, 80);
    light.position.set(0, 0, 10);
    scene.add(light);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // 自适应窗口大小
    window.addEventListener("resize", () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  },
};
</script>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5dc; /* 这里的 CSS 依然设置为米白色 */
}
</style>
