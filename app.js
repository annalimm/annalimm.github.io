const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 106;

const currentFrame = (index) => `./Bell_imgs/${(index + 1).toString()}.jpg`;
const images = [];
let ball = { frame: 0 };

// function preloadImages() {
//   let loadedCount = 0;

//   for (let i = 0; i < frameCount; i++) {
//     const img = new Image();
//     img.onload = function () {
//       loadedCount++;
//       if (loadedCount === frameCount) {
//         // All images are loaded, set canvas dimensions and render
//         canvas.width = images[0].naturalWidth;
//         canvas.height = images[0].naturalHeight;
//         render();
//       }
//     };
//     img.src = currentFrame(i);
//     images.push(img);
//   }
// }

// preloadImages();

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  images.push(img);
}

gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,  //true
    pin: "canvas",
    end: "400%",  //lenght of scrolling
    //     touchScrub: true, // Enable touch scrubbing
    //     snap: 1 / frameCount, // Adjust snap value for smoother scrolling
  },
  onUpdate: render,
});

gsap.fromTo(
  ".ball-text",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      // scrub: 1,   
      scrub: true,    
      start: "55%",
      end: "75%",
    },
    // onComplete: () => {   // for fading at the end
    //   gsap.to(".ball-text", { opacity: 0 });
    // },
  }
);

gsap.fromTo(
  ".social-icons",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: true,       // scrub: true
      start: "55%",
      end: "75%",
    },
  }
);

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}