
/*
 * Create a list that holds all of your cards
 */
//add all the cards to JS file
let card = document.getElementsByClassName('card');
 let cards = [...card];/*spread operator*/
 /* alternate way---let cards = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];
 */
// adding the cards
let deck = document.getElementsByClassName('card-deck')[0];
//declare moves variables
let moves = 0;
// adding moves counter, star rating, matched cards and opencards variables

let movesCounter = document.querySelector('.moves');
let matchedCard = document.getElementsByClassName('match');
let stars = docuemnt.querySelectorAll('.fa-star');
let starsList = document.querrySelectorAll('.stars li');
let closeIcon = document.querySelector('.close');
let modal = document.getElementsByClassName('main-modal');
let openCards =[];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//shuffles deck whenever the window loads

document.body.onload = startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function startGame(){
	// shuffle deck
   cards = shuffle(cards);
	//remove all existing classes from each card
   for (var i= 0; i < cards.length; i++){
	    deck.innerHTML ='';
		[].forEach.call(cards, function(item){
         deck.appendChild(item);
      });
		cards[i].classList.remove('show', 'open', 'match', 'disabled');
   }
	
 //reset timer
let seconds = 0;
let minutes = 0;
let hour = 0;
let timer = document.querySelector(".timer");
timer.innerHTML = '0 mins 0 secs';
clearInterval(interval);
	
//reset moves
moves = 0;
counter.innerHTML = moves;

//reset star rating
 for (var i= 0; i < stars.length; i++){
     stars[i].style.color = "#FFD700";
     stars[i].style.visibility = "visible";
    }

//displayCard function to toggle the card when clicked

 let displayCard = function(){
 	this.classList.toggle("open");
 	this.classList.toggle("show");
 	this.classList.toggle("disabled");

 }
 
 //add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    let len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
}

//for when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}
	
//for when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove('show', 'open', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'unmatched');
        enable();
        openedCards = [];
    },1100);
}

//disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// function to change the counter and change timer, star rating on first move
function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;

    //start timer on first move
    if(moves == 1){
        seconds = 0;
        minutes = 0; 
        hours = 0;
        startTimer();

    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//game timer
let seconds = 0, minutes = 0, hours = 0;
let timer = document.querySelector('.timer');
var interval;
function startTimer(){
    interval = setInterval(function (){
        timer.innerHTML = minutes +"mins "+ seconds +"secs";
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
        if(minutes == 60){
            hours++;
            minutes = 0;
        }
},1000);
}
//congratulations message popup when game is over

function congratulations(){
	if (matched.length == 16){
		clearInterval(iterval);
		let finalTime = timer.innerHTML;
		//show congratulations modal
		modal.classList.add('show');
		let starRating = document.querySelector('.stars').innerHTML;
		//show moves, time, rating on modal
		document.getElementsByClassName('final-move').innerHTML = moves;
		document.getElementsByClassName('star-rating').innerHTML = starRating;
		document.getElementsByClassName('total-time').innerHTML = finalTime;
		
		closeModal();
	}
}

//close modal upon clicking its close icon
function closeModal(){
		closeIcon.addEventListner('click', function(e){
			modal.classList.remove('show');
			startGame();
		});	
}
	
  //loop to add event listner to each card
 for (var i=0; i < cards.length; i++){
	card =cards[i]; 
 	cards[i].addEventListener("click",displayCard);
	cards[i].addEventListener("click",cardOpen);
	cards[i].addEventListener("click",congratulations);
 }

 



  

    
