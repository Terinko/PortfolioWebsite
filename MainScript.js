async function printJSON() {
    const response = await fetch("personalInfo.json");
    const json = await response.json();
    console.log(json);
}

function getCircle(x, y, transitionSpeed){
    const initialOpacity = (Math.random() * 0.6 + 0.2).toFixed(2);
    
    return `
    <svg height="15" width="15" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: ${x}px; top: ${y}px; opacity: ${initialOpacity}; transition: opacity ${transitionSpeed}s ease-in-out;">
        <circle r="2" cx="8" cy="8" fill="white" />
    </svg>
    `
}

function placeMultipleCircles(count){
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    
    for(let i = 0; i < count; i++) {
        const randomX = 35 + Math.floor(Math.random() * (containerRect.width - 20));
        const randomY = 20 + Math.floor(Math.random() * (containerRect.height - 15));
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
    const clickedElement = e.currentTarget;

    // If a different button was previously clicked, show it again
    if (lastClicked && lastClicked !== clickedElement) {
        lastClicked.style.display = "block";
    }

    // Hide the clicked button
    clickedElement.style.display = "none";

    // Update the lastClicked reference
    lastClicked = clickedElement;

    console.log("Last clicked element:", lastClicked?.id);

    directDetails();
}

function createProds(){
    const elements = document.getElementsByClassName("menuItem");

    if (elements.length > 0) {
        //Default first menu item to be "off"
        elements[0].style.display = "none";
        lastClicked = elements[0];
    }

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', handleMenuClick);
    }
}

function directDetails() {

    const infoDiv = document.createElement('div');
    const textItem = document.createElement('h3');
    textItem.className = 'textItem';

    switch (lastClicked.id) {
        case "projects":
            console.log("Projects section triggered.");
            if( document.getElementById('infoDiv') != null){
                document.getElementById('infoDiv').remove();
            }

            // Add logic to show project details
            //Adds div for section info
            infoDiv.className = 'infoDiv';
            infoDiv.id = 'infoDiv';
            document.getElementById('container').appendChild(infoDiv);
            textItem.innerHTML = 'Tyler\'s newest project';
            document.getElementById('infoDiv').appendChild(textItem); 

            break;
        case "info":
            console.log("Info section triggered.");
            if( document.getElementById('infoDiv') != null){
                document.getElementById('infoDiv').remove();
            }
            // Add logic to show info details
            //Adds div for section info
            infoDiv.className = 'infoDiv';
            infoDiv.id = 'infoDiv';
            document.getElementById('container').appendChild(infoDiv);
            textItem.innerHTML = 'Tyler\'s newest info';
            document.getElementById('infoDiv').appendChild(textItem); 
 
            break;
        case "about":
            console.log("About section triggered.");
            if( document.getElementById('infoDiv') != null){
                document.getElementById('infoDiv').remove();
            }
            // Add logic to show info details
            //Adds div for section info
            infoDiv.className = 'infoDiv';
            infoDiv.id = 'infoDiv';
            document.getElementById('container').appendChild(infoDiv);
            textItem.innerHTML = 'Welcome to my website!  My name is Tyler and I am an aspiring software developer from ' 
            + 'Quinnipiac University.  Here I study software engineering on a path to graduate in 2026.  After that, I plan '
            + 'on furthering my education by attaining my master\'s degree in cybersecurity in 2027.  '
            + 'While I am always eager and open to learning new subsets of this field, my primary interest lies in web '
            + 'development.  I have also done some deep dives into the emerging field of artificial intelligence which should '
            + 'be evidenced by my projects section.  Thank you for taking the time to check out my website and enjoy!';
            document.getElementById('infoDiv').appendChild(textItem); 
 
            break;
        case "contact":
            console.log("Contact section triggered.");
            if( document.getElementById('infoDiv') != null){
                document.getElementById('infoDiv').remove();
            }
            // Add logic to show info details
            //Adds div for section info
            infoDiv.className = 'infoDiv';
            infoDiv.id = 'infoDiv';
            document.getElementById('container').appendChild(infoDiv);
            textItem.innerHTML = 'Phone: (603)-507-2084 \n Email: rinkotyler@gmail.com';
            document.getElementById('infoDiv').appendChild(textItem); 

            break;
        default:
            document.getElementById('infoDiv').remove();
            console.log("Home section showing");
    }
}