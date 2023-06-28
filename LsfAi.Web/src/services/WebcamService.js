class WebCamComponent {
  constructor(modelURL, containerId) {
    this.modelURL = modelURL;
    this.containerId = containerId;
    this.model = null;
    this.webcam = null;
    this.labelContainer = null;
    this.maxPredictions = null;
    this.isIos = false;
    this.definition = "";
  }

  async init() {
    const modelURL = this.modelURL + "model.json";
    const metadataURL = this.modelURL + "metadata.json";

    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    const flip = true; // whether to flip the webcam
    const width = 400;
    const height = 496;
    this.webcam = new tmImage.Webcam(width, height, flip);

    await this.webcam.setup();
    this.webcam.play();

    window.requestAnimationFrame(() => this.loop());

    this.labelContainer = document.createElement("div");
    this.labelContainer.id = "label-container";
    document.getElementById(this.containerId).appendChild(this.webcam.canvas);
    document.getElementById(this.containerId).appendChild(this.labelContainer);

    const definitionSpan = document.getElementById("definition");
    this.definition = definitionSpan.textContent;
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

    //Pop up to show if the prediction is greater than 0.8
    const popup = document.querySelector(".popup-container-show");

    /**
     * This function iterates through the model's predictions and compares the value of the current 
     * definition (this.definition) with each predicted class.
     * If the probability of the prediction exceeds 0.8, a pop-up window is displayed for 4 seconds, then hidden.
     *
     * @param {Object} prediction - Model predictions.
     * @param {HTMLElement} popup - The pop-up window to be displayed.
     */
    for (let i = 0; i < this.maxPredictions; i++) {
      if (this.definition === prediction[i].className) {
        console.log("definition: " + this.definition);
        console.log("prediction: " + prediction[i].className);
        if (prediction[i].probability.toFixed(2) > 0.8) {
          popup.style.display = "block";
          setTimeout(() => {
            popup.style.display = "none";
          }, 4000);
        }
      }
    }

  }
}

export default WebCamComponent;
