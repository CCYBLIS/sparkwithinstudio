
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
cards[current - 1].classList.add("left");
}

if(current + 1 < cards.length){
cards[current + 1].classList.add("right");
}

if(current - 2 >= 0){
cards[current - 2].classList.add("far-left");
}

if(current + 2 < cards.length){
cards[current + 2].classList.add("far-right");
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
   KEYBOARD (arrows + WASD)
========================= */

window.addEventListener("keydown",(e)=>{

if(e.key === "ArrowDown" || e.key === "ArrowRight"){
nextCard();
}

if(e.key === "ArrowUp" || e.key === "ArrowLeft"){
previousCard();
}

});

/* =========================
   TOUCH — VERTICAL + HORIZONTAL SWIPE
========================= */

let touchStartY = 0;
let touchStartX = 0;

window.addEventListener("touchstart",(e)=>{

touchStartY = e.touches[0].clientY;
touchStartX = e.touches[0].clientX;

},{passive:true});

window.addEventListener("touchend",(e)=>{

const touchEndY = e.changedTouches[0].clientY;
const touchEndX = e.changedTouches[0].clientX;

const diffY = touchStartY - touchEndY;
const diffX = touchStartX - touchEndX;

/* Use whichever axis had the bigger swipe */
if(Math.abs(diffX) > Math.abs(diffY)){

    /* Horizontal swipe */
    if(Math.abs(diffX) < 40) return;

    if(diffX > 0){
        nextCard();
    }else{
        previousCard();
    }

}else{

    /* Vertical swipe */
    if(Math.abs(diffY) < 40) return;

    if(diffY > 0){
        nextCard();
    }else{
        previousCard();
    }

}

},{passive:true});

/* =========================
   START
========================= */

updateCarousel();

