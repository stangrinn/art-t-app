import { loadVideo } from "../../libs/index.js";
const THREE = window.MINDAR.IMAGE.THREE;

export const useDefVideoScene = async (sourceName) => {
    try {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: `./assets/targets/${sourceName}.mind`,
            maxTrack: 1,
            filterMinCF: 0.00005,
            filterBeta: 0.001,
        });
        const { renderer, scene, camera } = mindarThree;

        const video = await loadVideo(`./assets/videos/${sourceName}.mp4`);
        video.muted = true;
        video.loop = true;

        const texture = new THREE.VideoTexture(video);
        texture.encoding = THREE.sRGBEncoding;

        const geometry = new THREE.PlaneGeometry(1, video.videoHeight / video.videoWidth);

        const material = new THREE.MeshBasicMaterial({ map: texture });
        material.needsUpdate = true;

        const plane = new THREE.Mesh(geometry, material);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        anchor.onTargetFound = () => video.play();
        anchor.onTargetLost = () => video.pause();


        await mindarThree.start();

        renderer.setAnimationLoop(() => renderer.render(scene, camera));

    } catch (error) {
        console.error(error);
    }
}