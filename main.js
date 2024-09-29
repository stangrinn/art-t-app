import { loadVideo } from "./libs/loader.js";
import { createChromaMaterial } from './libs/chroma-video.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: './assets/targets/mother-day2.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    const video1 = await loadVideo("./assets/videos/Bodies.mp4");
    const texture1 = new THREE.VideoTexture(video1);
    const material1 = createChromaMaterial(texture1, 0x00FF4B);
    const geometry1 = new THREE.PlaneGeometry(1, 1.5);
    const plane1 = new THREE.Mesh(geometry1, material1);
    video1.loop = true;

    const video2 = await loadVideo("./assets/videos/Hearts.mp4");
    const texture2 = new THREE.VideoTexture(video2);
    const material2 = createChromaMaterial(texture2, 0x00000);
    const geometry2 = new THREE.PlaneGeometry(1, 1.5);
    const plane2 = new THREE.Mesh(geometry2, material2);
    video2.loop = true;

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane1);
    anchor.group.add(plane2);

    plane2.position.set(0, 0, 0.1); 

    anchor.onTargetFound = () => {
        video1.play();
        video2.play();
    };
    anchor.onTargetLost = () => {
        video1.pause();
        video2.pause();
    };

    video1.addEventListener('play', () => {
        video1.currentTime = 6;
    });
    video2.addEventListener('play', () => {
        video2.currentTime = 3;
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
});