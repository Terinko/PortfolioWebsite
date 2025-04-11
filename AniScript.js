function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}

// Add a click event listener to the "startCar" image.
function onAnimate() {
  const startCarElement = document.getElementById('startCar');
  
  // Example animation: move the startCar 100px to the right over 2 seconds.
  animate({
    duration: 1700, // duration in milliseconds
    timing: circ,
    draw: function(progress) {
      startCarElement.style.transform = 'translateX(' + (progress * 1300) + 'px)';
      
      // Add fade-out effect for the name header
      const nameHeader = document.getElementById("nameHeader");
      if (nameHeader) {
        //fade
        if (progress * 1300 >= 525) {
          // Calculate opacity based on position (1 to 0)
          const opacity = Math.max(0, 1 - ((progress * 1300 - 400) / 300));
          nameHeader.style.opacity = opacity;
        }
      }
    }
  });
}

function animate({ timing, draw, duration }) {
  let start = performance.now();
  
  requestAnimationFrame(function step(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    
    // Calculate the current animation state.
    let progress = timing(timeFraction);
    draw(progress); // Draw it.
    
    if (timeFraction < 1) {
      requestAnimationFrame(step);
    }

    if(timeFraction == 1) {
      // When animation completes, remove both elements
      if(document.getElementById("startCar") != null) {
        document.getElementById("startCar").remove();
      }
      if(document.getElementById("nameHeader") != null) {
        document.getElementById("nameHeader").remove();
      }
      window.location.replace("mainPage.html");
    }
  });
}