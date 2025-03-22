# MindAR Library

MindAR is a web-based AR library that enables marker-based and image-based augmented reality experiences in the browser. This library provides the core functionality for creating AR applications using Three.js.

## Installation

```javascript
import * as MINDAR from '../libs/mindar/mindar-image-three.prod.js';
```

## Basic Usage

### Initialization

```javascript
// Initialize MindAR
const mindarThree = new MINDAR.IMAGE({
    container: document.querySelector("#ar-container"),
});

// Get AR scene and camera
const { renderer, scene, camera } = mindarThree;
```

### Creating an AR Experience

```javascript
// Create an anchor (marker)
const anchor = mindarThree.addAnchor(0);

// Add 3D content to the anchor
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
anchor.group.add(cube);

// Start AR
await mindarThree.start();
```

### Handling AR Events

```javascript
// Listen for anchor detection
anchor.onTargetFound = () => {
    console.log("Target found!");
};

// Listen for anchor loss
anchor.onTargetLost = () => {
    console.log("Target lost!");
};
```

## Advanced Features

### Multiple Anchors

```javascript
// Create multiple anchors
const anchor1 = mindarThree.addAnchor(0);
const anchor2 = mindarThree.addAnchor(1);

// Add different content to each anchor
anchor1.group.add(cube1);
anchor2.group.add(cube2);
```

### Custom Tracking

```javascript
// Access tracking data
mindarThree.onUpdate(() => {
    const { rotation, position, scale } = anchor;
    // Use tracking data for custom behavior
});
```

## Best Practices

1. **Performance Optimization**
   - Use appropriate model sizes and textures
   - Implement level of detail (LOD) for complex models
   - Optimize lighting and materials

2. **User Experience**
   - Provide clear instructions for marker placement
   - Implement loading indicators
   - Handle tracking loss gracefully

3. **Browser Compatibility**
   - Test on multiple devices and browsers
   - Implement fallbacks for unsupported features
   - Check for WebXR support

## Notes

- MindAR requires HTTPS for camera access
- Marker images should be high contrast and unique
- The library works best with stable lighting conditions
- Consider implementing error handling for tracking failures
- Test thoroughly on different devices and browsers 