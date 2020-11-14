var imageparentElement = document.getElementById('img-box');
var dataParentElement = document.getElementById('rendered data');
var startParentElement = document.getElementById('start-box');
var imageNames = ['bag.jpg',"banana.jpg","bathroom.jpg","boots.jpg","breakfast.jpg","bubblegum.jpg","chair.jpg","cthulhu.jpg","dog-duck.jpg","dragon.jpg","pen.jpg","pet-sweep.jpg","scissors.jpg","shark.jpg","sweep.png","tauntaun.jpg","unicorn.jpg","usb.gif","water-can.jpg","wine-glass.jpg"];
var maxVotes = 25;
var voteOnNum = 3;
var imageObjects = [];
var matchImages = [];
var lablesArr= [];
var clicksArr = [];
var looksArr = [];


startGame();

function startGame(){
    tartParentElement.innerHTML = '';
    var startElement = document.createElement("button");
    startElement.innerHTML = "Click Me To start the game ";
    startElement.setAttribute("type","button");
    startParentElement.appendChild(startElement);
};
    
function startClick(event){
    startParentElement.innerHTML = '';
    if(localStorage.getItem('voteingData') === null){
        objectBuilder();
    }else{
        retriveSaveData();
    }
    imgSet(voteOnNum);
};
//constructor to make item instanaces
function Image(name){    
    this.filepath = `../img/${name}`;
    this.alt = `${name}`.slice(0,-4);
    this.title = `${name}`.slice(0,-4);
    this.clicks = 0;
    this.looks = 0;
    imageObjects.push(this);
};
function objectBuilder(){
    for(var i =0;i < imageNames.length ; i++){
        new Image(imageNames[i]);
        console.log('line 34 this is my objects', imageObjects)
    };
};
//generate random img  and creates display
function getRandomImgs(){
    //randomize the images
    var randomIndex = getRandomMax(imageObjects.length);
    //make an array with 6 non matching images and compare to current random to keep repitition down
    while(matchImages.includes(randomIndex)){
        randomIndex = getRandomMax(imageObjects.length);
      }
    matchImages.push(randomIndex);
    if(matchImages.length > (voteOnNum*2)){
        matchImages.shift();
    }
    var randomImg = imageObjects[randomIndex];
    //display image on page
    var imageElement = document.createElement('img');
    imageElement.setAttribute('src',randomImg.filepath);
    imageElement.setAttribute('alt',randomImg.alt);
    imageElement.setAttribute('title', randomImg.title);
    imageparentElement.appendChild(imageElement);
    randomImg.looks++;
};
// pulls data out of objects and puts it in to global arrays
function pullInfo(){
    for(var i = 0 ; i < imageObjects.length; i++){
    lablesArr.push(imageObjects[i].alt);
    clicksArr.push(imageObjects[i].clicks);
    looksArr.push(imageObjects[i].looks);
    }
};
// Puts text version of data on page
function renderData(){
    for (var i = 0; i < imageObjects.length; i++) {
        var dataElement = document.createElement("li");
        console.log(imageObjects[i]);
        dataElement.textContent = `for product: ${imageObjects[i].alt} it has ${imageObjects[i].clicks} clicks and ${imageObjects[i].looks} views`;
        console.log(imageObjects[i]);
        dataParentElement.appendChild(dataElement);
    }
};
// creates the graphical data
function graph(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lablesArr,
            datasets: [{
                label: '# of Votes',
                data: clicksArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};
function graph2(){
    var ctx = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: lablesArr,
            datasets: [{
                label: '# of Looks',
                data: looksArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};

//HELPING FUNCTIONS
//does math to get a random number between 0 and max
function getRandomMax(max){
    return Math.floor(Math.random()* Math.floor(max));
};
//sets number of images that shows up to be voted on
function imgSet(numberOfPics){
    for(var i = 0;i < numberOfPics;i++){
        getRandomImgs();
    };
};
//data STORAGE SECTON
function compileSaveData(){
    var dataStorage =  JSON.stringify(imageObjects);
    localStorage.setItem('voteingData', dataStorage);
};
function retriveSaveData(){
    var savedVoteData = localStorage.getItem('voteingData');  
    imageObjects = JSON.parse(savedVoteData);
    console.log(savedVoteData);
    console.log(imageObjects);

};
function render(){
    renderData();
    graph();
    graph2();
};
//imageclick handeler
function userImageClick(){
    var alt = event.target.alt;
    console.log(`event.target is ${event.target.alt}`)
    if(maxVotes >= 0) {
        for (var i = 0; i < imageObjects.length; i++) {
            if (alt === imageObjects[i].alt) {
            imageObjects[i].clicks++;
            maxVotes--;
            imageparentElement.innerHTML = '';
            imgSet(voteOnNum);
            }
        }
    }
    else{
        compileSaveData();
        pullInfo();
        imageparentElement.innerHTML = '';
        render();
    }
};


startParentElement.addEventListener('click', startClick);  
imageparentElement.addEventListener('click', userImageClick);