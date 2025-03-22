# Chroma Video Library

This library provides functionality for creating chroma key materials in Three.js applications. It allows you to create materials that can be used for green screen (or any color) effects in your 3D scenes.

## Installation

```javascript
import { createChromaMaterial } from '../libs/chroma-video.js';
```

## API Reference

### createChromaMaterial(texture, keyColor)

Creates a shader material that can be used for chroma key effects.

#### Parameters

- `texture` (THREE.Texture): The texture to apply the chroma key effect to
- `keyColor` (string | THREE.Color): The color to make transparent (e.g., '#00ff00' for green screen)

#### Returns

- `THREE.ShaderMaterial`: A material that can be applied to a mesh

## Usage Examples

### Basic Green Screen Effect

```javascript
import { createChromaMaterial } from '../libs/chroma-video.js';
import { loadTexture } from '../libs/loader.js';

// Load your video texture
const videoTexture = await loadTexture('path/to/your/video.jpg');

// Create a chroma material with green screen
const material = createChromaMaterial(videoTexture, '#00ff00');

// Apply the material to a mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### Custom Color Key

```javascript
// Create a chroma material with a custom color
const material = createChromaMaterial(videoTexture, '#ff0000'); // Red screen
```

## Notes

- The material uses a custom shader that calculates the transparency based on the color difference
- The transparency threshold is set to 0.7 with a multiplier of 7.0 in the shader
- The material is automatically set to transparent mode
- Works best with video textures or images that have a solid color background 