# Three.js Library

Three.js is a cross-browser JavaScript library and application programming interface (API) used to create and display animated 3D computer graphics in a web browser using WebGL. This documentation covers the basic usage of Three.js in the context of AR applications.

## Installation

```javascript
import * as THREE from '../libs/three.js-r132/build/three.module.js';
```

## Basic Scene Setup

### Creating a Scene

```javascript
// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

### Adding Objects

```javascript
// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;
```

## Materials and Textures

### Basic Materials

```javascript
// MeshBasicMaterial (flat color)
const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// MeshPhongMaterial (shiny)
const phongMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x00ff00,
    shininess: 100
});

// MeshStandardMaterial (physically based)
const standardMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    metalness: 0.5,
    roughness: 0.5
});
```

### Working with Textures

```javascript
// Load and apply texture
const textureLoader = new THREE.TextureLoader();
const texture = await textureLoader.load('path/to/texture.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
```

## Animation

### Basic Animation Loop

```javascript
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}
animate();
```

### Using Clock for Time-based Animation

```javascript
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    cube.rotation.x = Math.sin(elapsedTime) * 0.5;
    cube.rotation.y = Math.cos(elapsedTime) * 0.5;
    
    renderer.render(scene, camera);
}
animate();
```

## Lighting

### Basic Lighting Setup

```javascript
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Point light
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(0, 0, 5);
scene.add(pointLight);
```

## Event Handling

### Window Resize

```javascript
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
```

### Mouse Interaction

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    
    if (intersects.length > 0) {
        console.log('Clicked object:', intersects[0].object);
    }
}
```

## Best Practices

1. **Performance**
   - Use appropriate geometry complexity
   - Implement object pooling for frequently created/destroyed objects
   - Use texture atlases for multiple textures
   - Implement level of detail (LOD) for complex models

2. **Memory Management**
   - Dispose of geometries and materials when no longer needed
   - Clear event listeners when removing objects
   - Use texture compression when possible

3. **Code Organization**
   - Separate scene setup from animation logic
   - Use classes for complex objects
   - Implement proper cleanup methods

## Notes

- Three.js uses a right-handed coordinate system
- Y-axis is up by default
- Z-axis points toward the viewer
- Remember to handle cleanup when removing objects from the scene
- Consider using Three.js DevTools for debugging 