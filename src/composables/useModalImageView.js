import { useCaclScreenCoverage } from "./useCaclScreenCoverage.js";
export function useModalImageView  () {
    function updateVideoPosition () {

        if (!anchor.visible) {

            if (domVideo.style.display === "block")
                releaseVideoToAR(plane, domVideo, video);

            return;
        }

        const { calculateScreenCoverage } = useCaclScreenCoverage();
        const screenCoverage = calculateScreenCoverage(plane, camera);
        const TARGET_COVERAGE = 0.8; // 80% of screen

        // Check if the camera is close enough to the marker
        const isCloseEnough = screenCoverage > TARGET_COVERAGE;
        const isVideoOnScreen = domVideo.style.display === "block";

        if (isCloseEnough && !isVideoOnScreen)
            fixVideoOnScreen(plane, domVideo, video);
        else if (!isCloseEnough && isVideoOnScreen)
            releaseVideoToAR(plane, domVideo, video);

        // console.log(`Screen coverage: ${(screenCoverage * 100).toFixed(2)}%`);
    };

    function fixVideoOnScreen (plane, domVideo, webglVideo) {
        console.log("[Sticky Video] Fixing video on screen");
        document.body.classList.add("fixed-video-mode");
        domVideo.style.display = "block"; // Show the DOM video
        domVideo.play();

        console.log('[fixVideoOnScreen] domVideo muted - ', domVideo.muted);
        console.log('[fixVideoOnScreen] Before: plane.visible =', plane.visible);
        plane.visible = false; // Hide WebGL video
        webglVideo.pause();
        setTimeout(() => {
            console.log('[fixVideoOnScreen] After: plane.visible =', plane.visible);
        }, 100);
    };

    function releaseVideoToAR (plane, domVideo, webglVideo) {
        console.log("[Sticky Video] Releasing video to AR");
        document.body.classList.remove("fixed-video-mode");
        domVideo.style.display = "none"; // Hide the DOM video
        domVideo.pause();

        plane.visible = true; // Show WebGL video
        webglVideo.play();
    };

    function createDOMVideo (sourceName) {
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

        return { domVideo, videoContainer };
    };

    return {
        updateVideoPosition,
        createDOMVideo
    }
}