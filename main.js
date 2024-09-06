import {loadVideo} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/mother-day.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("./assets/videos/MDanimation.mp4");
    // const video = await loadVideo("./assets/videos/MDanimation.mov");
    
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.5, 2, 2), new THREE.MeshBasicMaterial({map: new THREE.VideoTexture(video)}));

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => video.play();
    anchor.onTargetLost = () => video.pause();
    
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
