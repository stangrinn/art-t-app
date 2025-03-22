# AR-T-App Documentation

This documentation provides comprehensive information about the AR-T-App project, which is a web-based augmented reality application built using Three.js, MindAR, and custom utilities.

## Project Overview

AR-T-App is a web application that enables augmented reality experiences through marker-based tracking. The project combines several powerful libraries to create immersive AR experiences:

- **Three.js**: For 3D graphics rendering
- **MindAR**: For AR tracking and marker detection
- **Custom Utilities**: For asset loading and chroma key effects


## Getting Started

### Prerequisites

- Modern web browser with WebGL support
- HTTPS environment (required for camera access)
- Node.js (for development)

### Installation

1. Clone the repository:
```bash
git clone 
cd ar-t-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Development
- To allow you to use camera on the phone make sure that you have actual certs.
- When you update code and want to see changes on the phone you have to use the private mode and after every change use new tab