
const cards =
document.querySelectorAll(".project-card");

let current = 0;

let animating = false;
const backgroundFrame = document.getElementById("background-frame");

const totalFrames = 118;
const passiveSteps = 25;
const stepsPerProject = 5;

let backgroundStep = 0;
let currentFrame = 1;
let backgroundAnimating = false;

const frameCache = [];

for(let i = 1; i <= totalFrames; i++){

    const frameNumber = String(i).padStart(3,"0");

    const image = new Image();

    image.src =
        `assets/projectsbackground/hero_asset_level.${frameNumber}.webp`;

    frameCache.push(image);
}

function getFrameForStep(step){

    return Math.round(
        1 + (step / passiveSteps) * (totalFrames - 1)
    );
}

function animateBackground(targetFrame, onComplete){

    if(backgroundAnimating) return;

    backgroundAnimating = true;

    const startFrame = currentFrame;
    const frameDifference = targetFrame - startFrame;

    if(frameDifference === 0){

        backgroundAnimating = false;

        if(onComplete) onComplete();

        return;
    }

    const frameTime = 1000 / 30;
    const duration = Math.abs(frameDifference) * frameTime;

    const startTime = performance.now();

    function animate(time){

        const progress = Math.min(
            (time - startTime) / duration,
            1
        );

        const easedProgress =
            progress * (2 - progress);

        const frame = Math.round(
            startFrame +
            frameDifference * easedProgress
        );

        if(frame !== currentFrame){

            currentFrame = frame;

            backgroundFrame.src =
                frameCache[frame - 1].src;
        }

        if(progress < 1){

            requestAnimationFrame(animate);

        }else{

            currentFrame = targetFrame;

            backgroundFrame.src =
                frameCache[targetFrame - 1].src;

            backgroundAnimating = false;

            if(onComplete) onComplete();
        }
    }

    requestAnimationFrame(animate);
}
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

    if(backgroundAnimating) return;

    if(backgroundStep >= passiveSteps) return;

    const nextStep = backgroundStep + 1;
    const targetFrame = getFrameForStep(nextStep);

    animateBackground(targetFrame, ()=>{

        backgroundStep = nextStep;

        if(backgroundStep % stepsPerProject === 0){

            if(current >= cards.length - 1){
                return;
            }

            current++;

            updateCarousel();
        }
    });
}

/* =========================
   PREVIOUS
========================= */

function previousCard(){

    if(backgroundAnimating) return;

    if(backgroundStep <= 0) return;

    const previousStep = backgroundStep - 1;
    const targetFrame = getFrameForStep(previousStep);

    animateBackground(targetFrame, ()=>{

        backgroundStep = previousStep;

        if(backgroundStep % stepsPerProject === stepsPerProject - 1){

            if(current <= 0){
                return;
            }

            current--;

            updateCarousel();
        }
    });
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

