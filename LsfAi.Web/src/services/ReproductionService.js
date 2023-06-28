class ReproductionService {
  constructor(modelURL, containerId) {
    this.modelURL = modelURL;
    this.containerId = containerId;
    this.model = null;
    this.webcam = null;
    this.labelContainer = null;
    this.maxPredictions = null;
    this.isIos = false;
    this.definition = "";
    this.letterSequence = ["c", "b", "a", "d", "e"];
    this.currentLetterIndex = 0;
  }

  async init() {
    const modelURL = this.modelURL + "model.json";
    const metadataURL = this.modelURL + "metadata.json";

    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    const flip = true; // whether to flip the webcam
    const width = 400;
    const height = 496;

    // Check if the current URL matches the desired URL
    if (
      window.location.href === "http://localhost:3000/exercise/reproduction"
    ) {
      this.webcam = new tmImage.Webcam(width, height, flip);
      await this.webcam.setup();
      this.webcam.play();
      window.requestAnimationFrame(() => this.loop());

      this.labelContainer = document.createElement("div");
      this.labelContainer.id = "label-container";
      document.getElementById(this.containerId).appendChild(this.webcam.canvas);
      document.getElementById(this.containerId).appendChild(this.labelContainer);

      // Attribute the current letter
      const definitionSpan = document.getElementById("definition");
      this.definition = this.letterSequence[this.currentLetterIndex];
      definitionSpan.textContent = this.definition;
    }
  }

  async loop() {
    if (
      window.location.href === "http://localhost:3000/exercise/reproduction"
    ) {
      this.webcam.update();
      await this.predict();
    }
    window.requestAnimationFrame(() => this.loop());
  }

  async predict() {
    let prediction;
    if (this.isIos) {
      prediction = await this.model.predict(this.webcam.webcam);
    } else {
      prediction = await this.model.predict(this.webcam.canvas);
    }

    const popup = document.querySelector(".popup-container-show");

    for (let i = 0; i < this.maxPredictions; i++) {
        // Check if the current prediction matches the displayed letter
        if (this.definition === prediction[i].className) {
            // Check if the prediction probability exceeds 0.8
            if (prediction[i].probability.toFixed(2) > 0.8) {
                popup.style.display = "block";

                setTimeout(() => {
                popup.style.display = "none";
                }, 4000);

                if (this.currentLetterIndex !== this.letterSequence.length - 1) {
                    // Update the displayed letter to the next one in the sequence
                    this.currentLetterIndex ++;
                    const definitionSpan = document.getElementById("definition");
                    // Attribute the next letter to the current letter
                    this.definition = this.letterSequence[this.currentLetterIndex];
                    definitionSpan.textContent = this.definition;
                }
            }
        }
    }


    
  }
}

export default ReproductionService;
