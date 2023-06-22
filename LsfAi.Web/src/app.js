import WebCamComponent from './services/WebcamService.js';

const modelURL = './models/';
const containerId = 'webcam-container';

const webCamComponent = new WebCamComponent(modelURL, containerId);
webCamComponent.init();
