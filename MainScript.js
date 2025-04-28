let personalInfoData = {};

// 1. Fetch personalInfo.json
async function loadPersonalInfo() {
  try {
    const res = await fetch("personalInfo.json");
    personalInfoData = await res.json();
  } catch (err) {
    console.error("Failed to load personalInfo.json:", err);
  }
}

// 2. Initialize page after JSON is loaded
async function initPage() {
  await loadPersonalInfo();
  placeSvgRandomly();
  createProds();
  renderSection();
}

window.addEventListener("DOMContentLoaded", initPage);

let resizeTimeout;

window.addEventListener('resize', function() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    document.querySelectorAll('.backgroundDot').forEach(dot => dot.remove());
    placeSvgRandomly();
  }, 250);
});

function getCircle(x, y, transitionSpeed){
    const initialOpacity = (Math.random() * 0.6 + 0.2).toFixed(2);
    
    return `
    <svg height="15" width="15" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: ${x}px; top: ${y}px; opacity: ${initialOpacity}; transition: opacity ${transitionSpeed}s ease-in-out;">
        <circle r="2" cx="8" cy="8" fill="white" />
    </svg>
    `
}

function placeMultipleCircles(count) {
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    
    // Calculate actual available space
    // Subtract circle radius (2px) * 2 to ensure circle stays fully within bounds
    const availableWidth = containerRect.width - 15; // SVG width is 15px
    const availableHeight = containerRect.height - 15; // SVG height is 15px
    
    for(let i = 0; i < count; i++) {
        // Calculate position relative to container
        const randomX = Math.floor(Math.random() * availableWidth);
        const randomY = Math.floor(Math.random() * availableHeight);
        
        let transitionSpeed;
        if (i < count * 0.7) {
            transitionSpeed = (Math.random() * 0.5 + 0.1).toFixed(2); // Fast: 0.1-0.8s
        } else if (i < count * 0.2) {
            transitionSpeed = (Math.random() * 0.7 + 0.8).toFixed(2); // Medium: 0.8-1.5s
        } else {
            transitionSpeed = (Math.random() * 1.0 + 1.5).toFixed(2); // Slow: 1.5-2.5s
        }

        const dot = document.createElement('div');
        dot.innerHTML = getCircle(randomX, randomY, transitionSpeed);
        dot.classList = "backgroundDot";
        dot.id = `dot-${i}`;
        container.appendChild(dot);
    }
    
    animateDotsOpacity();
}

function animateDotsOpacity() {
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    const dots = document.querySelectorAll('.backgroundDot svg');
    
    dots.forEach((dot, index) => {
        let interval;
        if (index < dots.length * 0.4) {
            interval = Math.random() * 1000 + 500; // Fast: 0.5-1.5s
        } else if (index < dots.length * 0.7) {
            interval = Math.random() * 1500 + 1500; // Medium: 1.5-3s
        } else {
            interval = Math.random() * 2000 + 3000; // Slow: 3-5s
        }
        
        setInterval(() => {
            const newOpacity = (Math.random() * 0.8 + 0.1).toFixed(2);
            dot.style.opacity = newOpacity;

        }, interval);
    });
}

function placeSvgRandomly() {
    placeMultipleCircles(1200);
}

let lastClicked = null;

function handleMenuClick(e) {
  const clicked = e.currentTarget;
  if (lastClicked && lastClicked !== clicked) lastClicked.style.display = "block";
  clicked.style.display = "none";
  lastClicked = clicked;
  renderSection();
}

function createProds() {
  const items = document.getElementsByClassName("menuItem");
  if (items.length > 0) {
    items[0].style.display = "none";
    lastClicked = items[0];
  }
  Array.from(items).forEach(item => item.addEventListener('click', handleMenuClick));
}

function renderSection() {
  const section = lastClicked.id;
  const old = document.getElementById('infoDiv');
  if (old) old.remove();

  const infoDiv = document.createElement('div');
  infoDiv.id = 'infoDiv';
  infoDiv.className = 'infoDiv';
  document.getElementById('container').appendChild(infoDiv);

  const data = personalInfoData[section];
  if (!data) {
    console.warn(`No data for section "${section}"`);
    return;
  }

  if (section === "projects" && Array.isArray(data)) {
    data.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project';
      const title = document.createElement('h4');
      title.textContent = proj.projTitle;
      const date = document.createElement('p');
      date.textContent = proj.dateComplete;
      card.append(title, date);
      infoDiv.appendChild(card);
    });

  } else if (section === "contact" && typeof data === 'object') {
    const text = document.createElement('h3');
    text.className = 'textItem';
    text.innerHTML = `Phone: ${data.phone}  Email: ${data.email}`;
    infoDiv.appendChild(text);

  } else {
    const text = document.createElement('h3');
    text.className = 'textItem';
    text.innerHTML = data;
    infoDiv.appendChild(text);
  }
}