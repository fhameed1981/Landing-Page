/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// Tracks the active sections, do not go through all section list

let my_activeSection = document.querySelector('.my-active-section');

// Tracks the active navigation button, do not go through all button list

let my_activeNav = document.querySelector('.active-nav');

// Tracks the last Y position of the window, so code can determine if user is
// scrolling up or down. Program will set ratio of screen coverage needed to // // determine active section based on the direction
let my_lastScrollY = 0;

// Store or hold list of all sections
const my_sections = document.querySelectorAll('section');



/**
 * Function definitions
 * 
*/

// Put the navigation bar together
function my_Navigationbar() {
    const my_navBar = document.querySelector('#navbar__list');
    const my_fragment = document.createDocumentFragment();
    for (const section of my_sections) {
        const my_newNavButton = createNavButton(section);
        my_fragment.appendChild(my_newNavButton);
    }
    my_navBar.appendChild(my_fragment);
    //calls to add the listeners
    my_Listeners(my_navBar);
}

// Creates a new nav button with classes based on the section parameter, and
// returns a button
function createNavButton(section) {
    const my_newNavButton = document.createElement('li');
    my_newNavButton.classList.add('menu__link');
    my_newNavButton.textContent = section.dataset.nav;
    my_newNavButton.setAttribute('data-id', section.id);
    my_newNavButton.id = `nav-${section.id}`;
    if (my_activeNav == null) {
        my_newNavButton.classList.add('active-nav')
        my_activeNav = my_newNavButton;
    }
    return my_newNavButton;
}

// Adds listeners to 2 places:
// 1. navigation bar to listen for clicks
// 2. document to listen for scroll
function my_Listeners(my_navBar) {
    my_navBar.addEventListener('click', my_NavClick);
    document.addEventListener('scroll', function() {my_scrollCheck()});
    
}

// Smoothly scrolls to the appropriate section after click on navigation bar
function my_NavClick(event) {
    const section = document.querySelector(`#${event.target.dataset.id}`);
    section.scrollIntoView({behavior: 'smooth'});
}

// Checks the position of page in the window. Controls visibility of the
// go-up-button. Checks if user is scrolling up or down, sets the screen
// coverage ratio accordingly. Uses this ratio to determine which section
// is active. If active section is different from previous active section
// in activeSection, then calls functions to set new active section and 
// navigation button.
function my_scrollCheck() {
    const my_viewportHeight = window.innerHeight;

    if (window.scrollY > my_lastScrollY) {
        my_ratioForActive = my_viewportHeight/3;
    } else {
        my_ratioForActive = my_viewportHeight*2/3;
    }
    my_lastScrollY = window.scrollY;
    for (const section of my_sections) {
        const position = section.getBoundingClientRect();
        if (position.top < my_ratioForActive && position.bottom > my_ratioForActive && section !== my_activeSection) {
            my_setActiveSection(section);
            setActiveNav(document.querySelector(`#nav-${section.id}`));
            break;
        }
    }
}

// Removes active-section class from previous active section
// adds class to new active section.
function my_setActiveSection(section) {
    activeSection.classList.remove('active-section');
    section.classList.add('active-section');
    activeSection = section;
}

// Removes active-nav class from previous active navigation button, 
//adds class to new active navigation button.
function my_setActiveNav(nav) {
    my_activeNav.classList.remove('active-nav');
    nav.classList.add('active-nav')
    my_activeNav = nav;
}


/**
  Execute program 
*/

// Call the function to start the whole code
my_Navigationbar();

