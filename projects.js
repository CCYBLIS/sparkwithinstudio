const cards =
document.querySelectorAll(".project-card");

let current = 0;

let animating = false;

/* =========================
   UPDATE POSITIONS
========================= */

function updateCarousel(){

cards.forEach(card=>{

card.className = "project-card";

});

cards[current].classList.add("center");

if(current - 1 >= 0){

cards[current - 1]
.classList.add("left");

}

if(current + 1 < cards.length){

cards[current + 1]
.classList.add("right");

}

if(current - 2 >= 0){

cards[current - 2]
.classList.add("far-left");

}

if(current + 2 < cards.length){

cards[current + 2]
.classList.add("far-right");

}

}

/* =========================
   NEXT
========================= */

function nextCard(){

if(animating) return;

if(current >= cards.length - 1) return;

animating = true;

current++;

updateCarousel();

setTimeout(()=>{

animating = false;

},150);

}

/* =========================
   PREVIOUS
========================= */

function previousCard(){

if(animating) return;

if(current <= 0) return;

animating = true;

current--;

updateCarousel();

setTimeout(()=>{

animating = false;

},150);

}

/* =========================
   MOUSE WHEEL
========================= */

window.addEventListener("wheel",(e)=>{

if(e.deltaY > 0){

nextCard();

}else{

previousCard();

}

});

/* =========================
   KEYBOARD
========================= */

window.addEventListener("keydown",(e)=>{

if(e.key === "ArrowDown"){

nextCard();

}

if(e.key === "ArrowUp"){

previousCard();

}

});

/* =========================
   TOUCH
========================= */

let touchStartY = 0;

window.addEventListener("touchstart",(e)=>{

touchStartY =
e.touches[0].clientY;

});

window.addEventListener("touchend",(e)=>{

const touchEndY =
e.changedTouches[0].clientY;

const diff =
touchStartY - touchEndY;

if(Math.abs(diff) < 50) return;

if(diff > 0){

nextCard();

}else{

previousCard();

}

});

/* =========================
   START
========================= */

updateCarousel();