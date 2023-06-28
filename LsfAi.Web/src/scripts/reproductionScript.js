import ReproductionService from '../services/ReproductionService.js';

const modelURL = '../models/';
const containerId = 'webcam-container';

const reproductionService = new ReproductionService(modelURL, containerId);
reproductionService.init();
