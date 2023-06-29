import WebCamService from '../services/WebcamService.js';

const modelURL = '../models/';
const containerId = 'webcam-container';

const webCamService = new WebCamService(modelURL, containerId);
webCamService.init();
