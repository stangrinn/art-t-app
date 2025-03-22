# Loader Library

This library provides a set of utility functions for loading various types of assets in Three.js applications, including 3D models (GLTF), audio files, videos, and textures.

## Installation

```javascript
import { loadAudio, loadVideo, loadTexture, loadTextures } from '../libs/loader.js';
```

## API Reference

### loadAudio(path)

Loads an audio file.

#### Parameters

- `path` (string): Path to the audio file

#### Returns

- `Promise<AudioBuffer>`: A promise that resolves to the loaded audio buffer

### loadVideo(path)

Loads a video file.

#### Parameters

- `path` (string): Path to the video file

#### Returns

- `Promise<HTMLVideoElement>`: A promise that resolves to the loaded video element

### loadTexture(path)

Loads a single texture file.

#### Parameters

- `path` (string): Path to the texture file

#### Returns

- `Promise<THREE.Texture>`: A promise that resolves to the loaded texture

### loadTextures(paths)

Loads multiple texture files simultaneously.

#### Parameters

- `paths` (string[]): Array of paths to texture files

#### Returns

- `Promise<THREE.Texture[]>`: A promise that resolves to an array of loaded textures

## Usage Examples

### Loading a 3D Model

```javascript
import { loadGLTF } from '../libs/loader.js';

// Load a 3D model
const model = await loadGLTF('path/to/model.gltf');
scene.add(model.scene);
```

### Loading Audio

```javascript
import { loadAudio } from '../libs/loader.js';

// Load an audio file
const audioBuffer = await loadAudio('path/to/audio.mp3');
const audio = new THREE.Audio(listener);
audio.setBuffer(audioBuffer);
```

### Loading Video

```javascript
import { loadVideo } from '../libs/loader.js';

// Load a video file
const video = await loadVideo('path/to/video.mp4');
const texture = new THREE.VideoTexture(video);
const material = new THREE.MeshBasicMaterial({ map: texture });
```

### Loading Textures

```javascript
import { loadTexture, loadTextures } from '../libs/loader.js';

// Load a single texture
const texture = await loadTexture('path/to/texture.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });

// Load multiple textures
const textures = await loadTextures([
    'path/to/texture1.jpg',
    'path/to/texture2.jpg',
    'path/to/texture3.jpg'
]);
```

## Notes

- All loader functions return Promises, so they should be used with async/await or .then()
- The video loader automatically sets the 'playsinline' attribute for better mobile compatibility
- The texture loader supports various image formats (jpg, png, etc.)
- Error handling should be implemented when using these functions in production 