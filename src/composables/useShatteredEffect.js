const THREE = window.MINDAR.IMAGE.THREE;


export const useShatteredEffect = () => {

    function initEffect(video, anchor, texture) {
        
        TWEEN.removeAll();
        
        video.onended = () => {

            const { animateShatter, createShatteredPlane } = useShatteredEffect();
    
            anchor.group.clear(); // Clear previous elements
    
            const shatteredPlane = createShatteredPlane(texture, 100, 100);
            
            anchor.group.add(shatteredPlane);
    
            animateShatter(shatteredPlane);
    
            // setTimeout(video.play, 1000);
    
            // video.play();
    
            console.log('[useShatteredEffect] video onEnded');
        };
    }


    function animateShatter(plane) {
        console.log('[animateShatter] plane');
        plane.children.forEach(piece => {
            // Unpredictable position
            const targetPosition = new THREE.Vector3(
                piece.position.x + (Math.random() - 0.5) * 5,
                piece.position.y + (Math.random() - 0.5) * 5,
                piece.position.z + Math.random() * 2
            );
    
            // Animation
            new TWEEN.Tween(piece.position)
                .to(targetPosition, 1500)
                .easing(TWEEN.Easing.Cubic.Out)
                .start();
    
            // Rotation
            new TWEEN.Tween(piece.rotation)
                .to({ x: Math.random() * Math.PI, y: Math.random() * Math.PI }, 1500)
                .start();
    
            // Disappearance (transparency)
            piece.material.transparent = true;
            new TWEEN.Tween(piece.material)
                .to({ opacity: 0 }, 1500)
                .delay(500)
                .start();
        });
    }
    
    function createShatteredPlane(texture, rows = 100, cols = 100) {
        console.log('[createShatteredPlane] material');
        const group = new THREE.Group();
    
        const pieceWidth = 1 / cols;
        const pieceHeight = 1 / rows;
    
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const geometry = new THREE.PlaneGeometry(pieceWidth, pieceHeight);
    
                const uvs = geometry.attributes.uv.array;
                for (let k = 0; k < uvs.length; k += 2) {
                    uvs[k] = (uvs[k] + i) / cols;
                    uvs[k + 1] = (uvs[k + 1] + j) / rows;
                }
    
                const pieceMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                const piece = new THREE.Mesh(geometry, pieceMaterial);
    
                piece.position.set(
                    (i - cols / 2 + 0.5) * pieceWidth,
                    (j - rows / 2 + 0.5) * pieceHeight,
                    0
                );
    
                group.add(piece);
            }
        }
    
        return group;
    }



    return { initEffect,animateShatter, createShatteredPlane };
}