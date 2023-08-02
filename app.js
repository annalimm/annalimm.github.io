const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 106;

const currentFrame = (index) => `./Bell_imgs/${(index + 1).toString()}.jpg`;
const images = [];
let ball = {frame: 0};

// for(let i = 0; i < frameCount; i++){
//     const img = new Image();
//     img.src = currentFrame(i);
//     images.push(img);
// }

for(let i = 0; i < frameCount; i++){
    const img = new Image();
    img.onload = function() {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
    };
    img.src = currentFrame(i);
    images.push(img);
}

gsap.to(ball, {
    frame: frameCount - 1, 
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: true,
        pin: 'canvas',
        end: "400%", //lenght of scrolling
    },
    onUpdate: render,
})

gsap.fromTo(".ball-text", {opacity: 0}, {opacity: 1, scrollTrigger:{
    scrub: true,
    start: '55%',
    end: '75%',
}});

gsap.fromTo(".social-icons", {opacity: 0}, {opacity: 1, scrollTrigger:{
    scrub: true,
    start: '55%',
    end: '70%',
}});

images[0].onload = render;

function render(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[ball.frame], 0, 0);
} 

