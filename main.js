import { loadVideo } from "./libs/loader.js";
import { createChromaMaterial } from './libs/chroma-video.js';
const THREE = window.MINDAR.IMAGE.THREE;
const sourceName = 'EP0.6';
document.addEventListener('DOMContentLoaded', async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: `./assets/targets/${sourceName}.mind`,
    });
    
    const { renderer, scene, camera } = mindarThree;
    const video1 = await loadVideo(`./assets/videos/${sourceName}.mp4`); 
    const texture1 = new THREE.VideoTexture(video1);
    const material1 = createChromaMaterial(texture1, 0x8D00FF);
    const geometry1 = new THREE.PlaneGeometry(1, 1024/1024);
    const plane1 = new THREE.Mesh(geometry1, material1);
    video1.loop = true;

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane1);

    // plane2.position.set(0, 0, 0.1); 

    anchor.onTargetFound = () => {
        video1.play();
    };
    anchor.onTargetLost = () => {
        video1.pause();
    };

    video1.addEventListener('play', () => {
        video1.currentTime = 6;
    });


    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
});