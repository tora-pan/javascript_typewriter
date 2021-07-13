const TypeWriter = function (txtElement, words, waitTime) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.indexOfWord = 0;
  this.waitTime = parseInt(waitTime, 10);
  this.type();
  this.isDeleting = false;
};

//type method

TypeWriter.prototype.type = function () {
  //current index of word
  const current = this.indexOfWord % this.words.length;
  //get full text of the word
  const fullTxt = this.words[current];

  if (this.isDeleting) {
    //remove
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //insert the text into the span element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //inital typing speed
  let typingSpeed = 150;
  if (this.isDeleting) {
    typingSpeed /= 2;
    console.log("is deleteing" + typingSpeed);
  }

  //check if word is completed
  if (!this.isDeleting && this.txt === fullTxt) {
    //pause at the end
    typingSpeed = this.waitTime;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //switch to next word
    this.indexOfWord++;
    //pause before starting next word
    typingSpeed = 500;
  }

  setTimeout(() => this.type(), typingSpeed);
};

//DOM init
document.addEventListener("DOMContentLoaded", init);

//init app
function init() {
  const txtElement = document.querySelector(".txt-type");
  const wordList = JSON.parse(txtElement.getAttribute("data-words"));
  const waitTime = txtElement.getAttribute("data-wait");
  //init the typewriter
  new TypeWriter(txtElement, wordList, waitTime);
}
