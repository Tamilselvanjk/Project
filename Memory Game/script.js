const cardsArray = [
    {
        name: 'cat',
        icon: '<i class="fa-solid fa-cat"></i>'
    },
    {
        name: 'car',
        icon: '<i class="fa-solid fa-car"></i>'
    },
    {
        name: 'Bike',
        icon: '<i class="fa-solid fa-motorcycle"></i>'
    },
    {
        name: 'ice',
        icon: '<i class="fa-solid fa-ice-cream"></i>'
    },
    {
        name: 'runner',
        icon: '<i class="fa-solid fa-person-running"></i>'
    },
    {
        name: 'coffee',
        icon: '<i class="fa-solid fa-mug-hot"></i>'
    },
    {
        name: 'cat',
        icon: '<i class="fa-solid fa-cat"></i>'
    },
    {
        name: 'car',
        icon: '<i class="fa-solid fa-car"></i>'
    },
    {
        name: 'Bike',
        icon: '<i class="fa-solid fa-motorcycle"></i>'
    },
    {
        name: 'ice',
        icon: '<i class="fa-solid fa-ice-cream"></i>'
    },
    {
        name: 'runner',
        icon: '<i class="fa-solid fa-person-running"></i>'
    },
    {
        name: 'coffee',
        icon: '<i class="fa-solid fa-mug-hot"></i>'
    },

];

let flippedCards = [];
let mathcedPairs = 0;

let timeLeft = 30;
let timerInterval;

// Initialize score
let score = 0; 


const timerDisplay = document.getElementById('timer');
const gameBoard = document.getElementById("gameBoard");



//Array counted backword
function shuffleCards() {
    for (let i = cardsArray.length - 1; i >= 0; i--) {
        const randIndex = Math.floor(Math.random() * i);
        [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]]
    }
}

//Display cards
function displayCards() {
    cardsArray.forEach((curr, index, arr) => {
        const card = document.createElement('div');
        //card add a numbers
        card.setAttribute('id', index);

        card.classList.add('cardback');

        //Remove cards
        card.classList.add('active');

        //gameboard added div element
        gameBoard.append(card);

        card.addEventListener('click', flipCard);

    })
}

//flip card
function flipCard() {

    if (flippedCards.length < 2 && this.classList.contains('active')) {
        let cardId = this.getAttribute('id');

        //flippedcards pushed div element attributes
        flippedCards.push(this);
        this.classList.add('flipped');
        this.classList.add('flipped')
        this.classList.remove('cardback');
        this.innerHTML = cardsArray[cardId].icon;

        //filppedcards array same only two values 
        if (flippedCards.length == 2) {
           setTimeout(checkMatch,1000);
        }
    }
}


//Check the match
function checkMatch(){
    //inner site array get two values
    const card1Id = flippedCards[0].getAttribute('id');
    const card2Id = flippedCards[1].getAttribute('id');

    //cards array get names checked same or not
    if(cardsArray[card1Id].name === cardsArray[card2Id].name){
      //one and two card disapper  
      flippedCards[0].style.border = 'none';
      flippedCards[0].style.backgroundColor = '#f5e8ba';
      flippedCards[0].innerHTML = '';
      flippedCards[0].classList.remove('active');

      flippedCards[1].style.border = 'none';
      flippedCards[1].style.backgroundColor = '#f5e8ba';
      flippedCards[1].innerHTML = '';
      flippedCards[1].classList.remove('active');

      mathcedPairs++;
      score += 1; 
      updateScoreDisplay();
      checkGameOver();

    }

    else{
        flippedCards[0].innerHTML= '';
        flippedCards[0].classList.add('cardback');
        flippedCards[0].classList.remove('flipped')
        flippedCards[1].innerHTML= '';
        flippedCards[1].classList.add('cardback');
    }
    //Again allow cards
    flippedCards = [];

}

//update score display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.innerHTML = `Score: ${score}`;
}

//Check if Game is Over
function checkGameOver(){
    if(mathcedPairs == cardsArray.length/2){
         endGame('YOU WON');
    }
}


//End game
function endGame(message){
    clearInterval(timerInterval);

    timerDisplay.classList.remove('red-background');
    // All chlid again again removed
    while(gameBoard.firstChild){
        gameBoard.removeChild(gameBoard.firstChild)
    }

    gameBoard.innerHTML=message;
    gameBoard.classList.remove('game');
    gameBoard.classList.add(message === 'YOU WON' ? 'won' : 'lost')

}

//start timer
function startTimer(){
    

    timerDisplay.innerHTML = formatTime(timeLeft);

    timerInterval = setInterval(()=>{
        timeLeft--;
        timerDisplay.innerHTML = formatTime(timeLeft);

         // Change background color based on time left
        if (timeLeft <= 5) {
            timerDisplay.classList.add('red-background'); 
        }

        if(timeLeft <= 0){
            clearInterval(timerInterval);
            endGame('TIME UP')
            
        }
    },1000);
}

//format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startGame(){
    score = 0; 
    updateScoreDisplay();
    shuffleCards();
    displayCards();
    startTimer();
}

//start the game
startGame();