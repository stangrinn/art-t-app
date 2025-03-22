const THREE = window.MINDAR.IMAGE.THREE;

export const useCaclScreenCoverage = () => {
    
    const calculateScreenCoverage = (plane, camera) => {
        // Create a temporary object for calculations
        const planeSize = new THREE.Vector3();
        const planeBox = new THREE.Box3().setFromObject(plane);
        planeBox.getSize(planeSize);
        
        // Get the corner points of the plane in world coordinates
        const geometry = plane.geometry;
        const positions = geometry.attributes.position.array;
        const worldCorners = [];
        
        // Convert vertices to world coordinates
        const tempPos = new THREE.Vector3();
        for (let i = 0; i < positions.length; i += 3) {
            tempPos.set(positions[i], positions[i+1], positions[i+2]);
            tempPos.applyMatrix4(plane.matrixWorld);
            worldCorners.push(tempPos.clone());
        }
        
        // Project the corners to the screen
        const screenCorners = worldCorners.map(corner => {
            const screenPos = corner.clone().project(camera);
            // Convert from normalized coordinates (-1 to 1) to pixels
            return {
                x: (screenPos.x + 1) / 2,
                y: (screenPos.y + 1) / 2
            };
        });
        
        // Find the extreme points on the screen
        let minX = 1, maxX = 0, minY = 1, maxY = 0;
        screenCorners.forEach(point => {
            minX = Math.min(minX, point.x);
            maxX = Math.max(maxX, point.x);
            minY = Math.min(minY, point.y);
            maxY = Math.max(maxY, point.y);
        });
        
        // Clip values to be within the screen bounds
        minX = Math.max(0, minX);
        maxX = Math.min(1, maxX);
        minY = Math.max(0, minY);
        maxY = Math.min(1, maxY);
        
        // Calculate the area of the plane as a percentage of the screen area
        const width = maxX - minX;
        const height = maxY - minY;
        return width * height;
    };

    return { calculateScreenCoverage };
}