
// letterDiv : signCard, aka one letter div
// letterPopupBox : modal popup ith letter details
let letterDiv, letterPopupBox;

// After click on sign card -> popup appears with details 
const letterPopup = (ev) => {
  letterDiv = ev.currentTarget;
  letterPopupBox = letterDiv.querySelector('.letter-popup');
  
  letterPopupBox.classList.contains('hide') 
  ? letterPopupBox.classList.remove('hide')
  : letterPopupBox.classList.add('hide');

  let closeBtn = letterPopupBox.querySelector('.letter-popup__close');
  closeBtn.addEventListener('click', letterPopup );
}

//get all signCards displayed
const signCards = document.getElementsByClassName('sign-card');

//give them all click event (popup appearing)
for (signCard of signCards) {
  signCard.addEventListener('click', letterPopup);
}

