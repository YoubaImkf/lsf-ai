import SignCardComponent from '../components/SignCardComponent.js';

let signsData;
//let signCard = document.querySelector('.sign-card');

window.onload = () => {
  feedDataToHtml();
}

const feedDataToHtml = async () => {
  //getting all signs data
  await getAllSigns();

  for (let signData of signsData) {
    const signCard = new SignCardComponent();

    const signCardHTML = signCard.render(signData)

    const signCardDiv = document.createElement('div');
    signCardDiv.innerHTML = signCardHTML;

    const dictionaryContent = document.querySelector('.dictionary-main__content');

    dictionaryContent.appendChild(signCardDiv);

    //set image data;
    let images = signCardDiv.getElementsByTagName('img');

    for (let img of images) {
      img.setAttribute('src', signData.media_uri);
      img.setAttribute('alt', signData.definition);
      img.setAttribute('title', 'Lettre ' + signData.definition);
    }

    //set definition data
    let definitions = signCardDiv.getElementsByTagName('h3');

    for (let definition of definitions) {
      definition.textContent = signData.definition;
    }
  }

  window.addEventListener('click', function (e) {
    let popupBoxes = document.querySelectorAll('.letter-popup');
    for (let popupBox of popupBoxes) {
      if (!popupBox.contains(e.target)) {
        // Clicked outside the box
          popupBox.classList.add('hide');
      }
      else{
        //letterPopup(e)
      }
    }
  });

  // After click on sign card -> popup appears with details 
  const letterPopup = (ev) => {
    ev.stopPropagation();

    letterDiv = ev.currentTarget;
    letterPopupBox = letterDiv.querySelector('.letter-popup');

    letterPopupBox.classList.contains('hide')
      ? letterPopupBox.classList.remove('hide')
      : letterPopupBox.classList.add('hide');

      /*
    let closeBtn = letterPopupBox.querySelector('.letter-popup__close');
    closeBtn.addEventListener('click', letterPopup);
    */
  }

  //get all signCards displayed
  const signCards = document.getElementsByClassName('sign-card');
  //give them all click event (popup appearing)
  for (let signCard of signCards) {
    signCard.addEventListener('click', letterPopup);
  }
}

const getAllSigns = async () => {
  const response = await fetch("http://localhost:8282/signs");
  signsData = await response.json();
}