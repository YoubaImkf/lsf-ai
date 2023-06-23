class WebCamComponent {
    constructor(modelURL, containerId) {
      this.modelURL = modelURL;
      this.containerId = containerId;
      this.model = null;
      this.webcam = null;
      this.labelContainer = null;
      this.maxPredictions = null;
      this.isIos = false;
    }
  
    async init() {
      const modelURL = this.modelURL + 'model.json';
      const metadataURL = this.modelURL + 'metadata.json';
  
      this.model = await tmImage.load(modelURL, metadataURL);
      this.maxPredictions = this.model.getTotalClasses();
  
      const flip = true; // whether to flip the webcam
      const width = 200;
      const height = 200;
      this.webcam = new tmImage.Webcam(width, height, flip);
      await this.webcam.setup();
      this.webcam.play();
      window.requestAnimationFrame(() => this.loop());
  
      this.labelContainer = document.createElement('div');
      this.labelContainer.id = 'label-container';
      document.getElementById(this.containerId).appendChild(this.webcam.canvas);
      document.getElementById(this.containerId).appendChild(this.labelContainer);
    }
  
    async loop() {
      this.webcam.update();
      await this.predict();
      window.requestAnimationFrame(() => this.loop());
    }

    async predict() {
      let prediction;
      if (this.isIos) {
        prediction = await this.model.predict(this.webcam.webcam);
      } else {
        prediction = await this.model.predict(this.webcam.canvas);
      }

      

        for(let i = 0; i < this.maxPredictions; i++){

          let labelChild =  this.labelContainer.querySelector(`#prediction-${i}`);
          // Check if the child already exists before creating it
          if (!labelChild) {
            labelChild = document.createElement('div');
            labelChild.id = `prediction-${i}`;
            this.labelContainer.appendChild(labelChild);
          }

          // Put green color if probability is greater than 0.6

          if(prediction[i].probability.toFixed(2) > 0.6){
            labelChild.style.color = "green";
          } else {
            labelChild.style.color = "red";
          }

          // Put the prediction text in the label
          const classPrediction = prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
          this.labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
  }
  
  export default WebCamComponent;