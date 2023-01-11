// Set Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach(element => {

    element.classList.remove("active");

    // Add Active Class On Element With data-color === Local Storage Item
    if (element.dataset.color === mainColors) {

      // Add Active Class
      element.classList.add("active");

    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval
let backgroundInterval;

// Cheak If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Cheak If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {

  if (backgroundLocalItem === "true") {
    backgroundOption = true
  } else {
    backgroundOption = false
  }

  // Remove Active Class From All Spans
  document.querySelectorAll(".random-background span").forEach(element => {
    element.classList.remove("active")
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");

  }

}

// Add Class open To Setting-box
let toggle = document.querySelector(".toggle-settings i");
let settingsBox = document.querySelector(".settings-box");

toggle.onclick = () => settingsBox.classList.toggle("open");

//////////////////////////////////////////////////////////////////////

// Switch Color
const colorsLi =document.querySelectorAll(".colors-list li");

// Loop Om All List Items
colorsLi.forEach(li => {

  // Click On Every List Items
  li.addEventListener("click", (e) => {

    // Set Color On Root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e)

  });
});

//////////////////////////////////////////////////////////////////////
// Switch Random Background Option
const RandomBackEl =document.querySelectorAll(".random-background span");

// Loop On All Spans
RandomBackEl.forEach(span => {

  // Click On Every Span
  span.addEventListener("click", (e) => {

    handleActive(e)

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomuzeImages()
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval)
      localStorage.setItem("background_option", false);
    }
  });

});
//////////////////////////////////////////////////////////////////////

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Images
function randomuzeImages() {

  if (backgroundOption === true) {

    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
    
      // Change Background Image Url
      landingPage.style.backgroundImage = 'url("imgs/' + imagesArray[randomNumber] + '")';
    }, 10000);

  }

}

randomuzeImages();

///////////////////////////////////////////////////////////////////////

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {

      skill.style.width = skill.dataset.progress;

    });

  }

};

// Create Popuo With The Image
let ourGallery =document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener("click", (e) => {

    // Create Overlay Element
    let overlay =document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay"

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create the Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {

      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To Popup Box
      popupBox.appendChild(imgHeading)
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Src
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup To The Body
    document.body.appendChild(popupBox); 

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("x");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class Name To Close Button
    closeButton.className = "close-button";

    // Add Close Button To Popup Box
    popupBox.appendChild(closeButton)

  });

});

// Close Popup
document.addEventListener("click", (e) => {

  if(e.target.className === "close-button") {

    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove The Overlay
    document.querySelector(".popup-overlay").remove();
  };

});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {

  elements.forEach(ele => {

    ele.addEventListener("click", (e) => {
  
      e.preventDefault();
  
      document.querySelector(e.target.dataset.section).scrollIntoView({
  
        behavior: 'smooth'
  
      });
  
    });
  
  });

}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State

function handleActive(e) {

      // Remove Active Class From All Childrens
      e.target.parentElement.querySelectorAll(".active").forEach(element => {
        
        element.classList.remove("active");
        
      });
  
      // Add Active Class On Self
      e.target.classList.add("active")
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

  bulletsSpan.forEach(span => {
    
    span.classList.remove("active");

  });

  if (bulletLocalItem === "block") {

    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
    
  } else {
    
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");

  }

}

bulletsSpan.forEach(span => {

  span.addEventListener("click", (e) => {
    
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block"

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none"

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e)

  });

});


// Reset Button
document.querySelector(".reset-options").onclick = () => {

  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
}


// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {

    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {

      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");

    }

  }

});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {
  e.stopPropagation();
}