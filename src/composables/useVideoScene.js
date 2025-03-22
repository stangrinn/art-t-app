import { loadVideo, createChromaMaterial } from "../../libs/index.js";
import { useCaclScreenCoverage } from "./useCaclScreenCoverage.js";
const THREE = window.MINDAR.IMAGE.THREE;

/**
 * @description Use this function to create a video scene.
 * @param {string} sourceName - The name of the source video and target image.
 * @param {boolean} useChroma - Whether to use chroma keying.
 * @returns {Promise<void>}
 */
export const useVideoScene = async (sourceName, useChroma = false) => {
    const video = await loadPrepareVideo(sourceName);
    
    const { material, texture } = createMaterialWithVideo(video, useChroma);
    
    const plane = createPlaneWithVideo(video, material, texture);
    
    const { domVideo, videoContainer } = createDOMVideo(sourceName); // Create the DOM video
    
    await runARScene(plane, video, domVideo, videoContainer, sourceName);
}

const runARScene = async (plane, video, domVideo, videoContainer, sourceName) => {

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: `./assets/targets/${sourceName}.mind`,
        maxTrack: 1,
        filterMinCF: 0.00005,
        filterBeta: 0.001,
    });

    const { renderer, scene, camera } = mindarThree;

    const anchor = mindarThree.addAnchor(0);

    anchor.group.add(plane);

    anchor.onTargetFound = () => video.play();

    anchor.onTargetLost = () => video.pause();

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
        updateVideoPosition(plane, domVideo, video, camera, anchor.visible);
        renderer.render(scene, camera);
    });

    return { anchor };
}

const updateVideoPosition = (plane, domVideo, video, camera, isAnchorVisible) => {
    
    if (!isAnchorVisible) {
        
        if (domVideo.style.display === "block") 
            releaseVideoToAR(plane, domVideo, video);
        
        return;
    }
    
    const { calculateScreenCoverage } = useCaclScreenCoverage();
    const screenCoverage = calculateScreenCoverage(plane, camera);
    const TARGET_COVERAGE = 0.8; // 80% экрана
    
    // Check if the camera is close enough to the marker
    const isCloseEnough = screenCoverage > TARGET_COVERAGE;
    const isVideoOnScreen = domVideo.style.display === "block";

    if (isCloseEnough && !isVideoOnScreen)
        fixVideoOnScreen(plane, domVideo, video);
    else if (!isCloseEnough && isVideoOnScreen)
        releaseVideoToAR(plane, domVideo, video);

    // console.log(`Screen coverage: ${(screenCoverage * 100).toFixed(2)}%`);
};

const fixVideoOnScreen = (plane, domVideo, webglVideo) => {
    console.log("[Sticky Video] Fixing video on screen");
    document.body.classList.add("fixed-video-mode");
    domVideo.style.display = "block"; // Show the DOM video
    domVideo.play();

    console.log('[fixVideoOnScreen] domVideo muted - ', domVideo.muted);
    console.log('[fixVideoOnScreen] До: plane.visible =', plane.visible);
    plane.visible = false; // Hide WebGL video
    webglVideo.pause();
    setTimeout(() => {
        console.log('[fixVideoOnScreen] Отложенная проверка: plane.visible =', plane.visible);
    }, 100);
};

const releaseVideoToAR = (plane, domVideo, webglVideo) => {
    console.log("[Sticky Video] Releasing video to AR");
    document.body.classList.remove("fixed-video-mode");
    domVideo.style.display = "none"; // Hide the DOM video
    domVideo.pause();

    plane.visible = true; // Show WebGL video
    webglVideo.play();
};

const createDOMVideo = (sourceName) => {
    const domVideo = document.createElement("video");
    domVideo.src = `./assets/videos/${sourceName}.mp4`;
    domVideo.loop = true;
    domVideo.muted = true;
    domVideo.autoplay = true;
    domVideo.setAttribute('muted', '');
    domVideo.volume = 0;
    domVideo.style.position = "fixed";
    domVideo.style.top = "50%";
    domVideo.style.left = "50%";
    domVideo.style.transform = "translate(-50%, -50%)";
    domVideo.style.width = "100%";
    domVideo.style.height = "95%";
    domVideo.style.zIndex = "999";
    domVideo.style.objectFit = "cover";
    domVideo.style.display = "none"; // Initially hidden
    domVideo.setAttribute('playsinline', '')
    document.body.appendChild(domVideo);

    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'fixed';
    videoContainer.style.top = '50%';
    videoContainer.style.left = '50%';
    videoContainer.style.transform = 'translate(-50%, -50%)';
    videoContainer.style.width = '100%';
    videoContainer.style.height = '100%';
    videoContainer.style.zIndex = '999';
    videoContainer.style.objectFit = 'cover';
    videoContainer.style.display = 'none';
    videoContainer.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    videoContainer.style.zIndex = '990';
    document.body.appendChild(videoContainer);
    
    return {domVideo, videoContainer};
};

const loadPrepareVideo = async (sourceName) => {
    const video = await loadVideo(`./assets/videos/${sourceName}.mp4`);
    video.loop = true;
    video.muted = true;
    return video;
}

const createMaterialWithVideo = (video, useChroma = false) => {
    const texture = new THREE.VideoTexture(video);
    texture.encoding = THREE.sRGBEncoding; // Ensure correct color encoding
    const REMOVED_COLOR = 0x8D00FF;
    const material = useChroma ? createChromaMaterial(texture, REMOVED_COLOR) : new THREE.MeshBasicMaterial({ map: texture });
    material.needsUpdate = true; // Ensure material updates

    return { material, texture };
}

const createPlaneWithVideo = (video, material) => {
    const width = 1;
    const height = 1.37; // Fixed dimensions to prevent aspect-ratio-based distortion
    const geometry = new THREE.PlaneGeometry(width, height);
    const plane = new THREE.Mesh(geometry, material);
    
    plane.position.set(0, 0, 0);
    plane.rotation.set(0, 0, 0);
    plane.matrixAutoUpdate = false; // Lock the transformation matrix
    plane.updateMatrix(); // Apply the locked transform

    return plane;
};
