'use strict';

var imageContainer = document.getElementById('product-container');

var dataContainer = document.getElementById('data-container');

var uniqueImageArray =[];

var productArray = [];

var roundCount = 25;

var clickCount = 0;

var parsedProductsArray = [];


function checkLocalStorage() {
  if (localStorage.getItem('products') === null) {
    
    newProducts();
  } else {
       
       var getProducts = localStorage.getItem('products');
       
        var parsedProductsArray = JSON.parse(getProducts);
        
        productArray = parsedProductsArray;
  } 
}
checkLocalStorage();


function Product(name){
  this.filepath = `../img/${name}.jpg`;
  this.alt = name;
  this.title = name;
  this.clicks = 0;
  this.displayCount = 0;
  productArray.push(this);
}
function newProducts(){
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
  
  var usb = {
  filepath: '../img/usb.gif',
  alt: 'usb',
  title:'usb',
  clicks: 0,
  displayCount: 0,
}
var sweep = {
  filepath: '../img/sweep.png',
  alt: 'sweep',
  title:'sweep',
  clicks: 0,
  displayCount: 0,
}

productArray.push(sweep);
productArray.push(usb);
}

function getRandomImage(){
  var randomIndex = getRandomNumber(productArray.length);

  while(uniqueImageArray.includes(randomIndex)){
    randomIndex = getRandomNumber(productArray.length);
  }

  
  uniqueImageArray.push(randomIndex);

  
  if(uniqueImageArray.length > 6){
    uniqueImageArray.shift();
  }
  var chosenImage = productArray[randomIndex];
  chosenImage.displayCount++;
  
  var imageElement = document.createElement('img');
  
  imageElement.setAttribute('src', chosenImage.filepath);
  imageElement.setAttribute('alt', chosenImage.alt);
  imageElement.setAttribute('name', chosenImage.title);
 
  imageContainer.appendChild(imageElement);
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function callbackClick(event){
  
  var altValue = event.target.alt;
  
  for(var i=0; i<productArray.length; i++){
    
    if(altValue === productArray[i].alt){
      productArray[i].clicks++;
    }
  }