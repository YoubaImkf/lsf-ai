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
    this.uri = "";
    this.letterSequence = [];
    this.videoUri = [];
    this.currentLetterIndex = 0;
    this.currentSrcIndex = 0;
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

      await this.getLetterSequence();

      this.definition = this.letterSequence[this.currentLetterIndex];
      definitionSpan.textContent = this.definition;

      await this.videoLoad();

    }
  }

  async getLetterSequence() {
    const response = await fetch("http://localhost:8282/exerciseContents/2");
    const signsData = await response.json();

    this.letterSequence  = signsData.map(item => item.answer);
    this.videoUri   = signsData.map(item => item.question);

  }

  async videoLoad(){
    const video = document.getElementById("myVideo");

    this.uri = this.videoUri[this.currentSrcIndex];
    video.src = this.uri;
    video.play();
    console.log(video.src);
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
                    this.currentSrcIndex ++;

                    const definitionSpan = document.getElementById("definition");
                    const video = document.getElementById("mp4_src");


                    // Attribute the next letter to the current letter
                    this.definition = this.letterSequence[this.currentLetterIndex];
                    definitionSpan.textContent = this.definition;

                    // Attribute the next src to the current src
                    await this.videoLoad();

                } else {
                    const definitionSpan = document.getElementById("definition");
                    definitionSpan.classList.toggle("success-message");
                    definitionSpan.textContent = "VOUS AVEZ REUSSI L'EXERCICE !";

                    setTimeout(() => {
                       window.location.href = "http://localhost:3000/";
                        }, 4000);
                }
            }
        }
    }   
  }

//   async createProgressions() {
//     const user = sessionStorage.getItem("user");

//     const exerciseData = await fetch("http://localhost:8282/progressions/user"+ user.id);
//     if (!exerciseData.length > 0) {
//         await fetch("http://localhost:8282/progressions/user" + user.id);
//     }
//     for ( let i = 0; i < exerciseData.length; i++) {
//         if (exerciseData[i].exerciseId === 2) {
//             const exercise = exerciseData[i];
//             const progression = {
//                 progression_level: exercise.progression_level + 1,
//                 exercise_id: exercise.id,
//                 user_id: user.id,
//                 repeat_number: exercise.repeat_number + 1,
//             }
//             await fetch("http://localhost:8282/progressions/" + user.id, {
//                 method: "PUT",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(progression),
//               })

//         }   
//     }
//     }

}

export default ReproductionService;
