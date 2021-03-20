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
const LandingSections=document.querySelectorAll('section');  /// represent all sections for  page to a variable 
const ul=document.querySelector('.navbar_TOP');   ///represent all ul list and save  to a variable 
const Documentfragment=document.createDocumentFragment();   ///to enhance performance 
let  Scrollat0 = window.pageYOffset;            //get the Y position AS initall postion which will updata 
let  scrollTopButt = document.getElementById("ScrollTopButt");    ///get button by id  and save it to avariable 
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function removeSectionActive()         /// remove active state from all section to active one section only
  {
    LandingSections.forEach((section)=>{
    section.classList.remove("your-active-class");
 })

}


function removeAncorActive()      ///remove active state from all navigation bar item 
    {                            ///to active which relate to active section only 
    const  allLINKS=document.querySelectorAll('li')
    allLINKS.forEach((NAVlink)=>{
        NAVlink.classList.remove("your-active-List-ancor");
    })


}

function highlightSecList(sec)
{
    const  allLINKS=document.querySelectorAll('li')
    allLINKS.forEach((NAVlink)=>{
        if(sec.getAttribute('data-nav')==NAVlink.textContent){
            NAVlink.classList.add("your-active-List-ancor");
        }

    })
}

function ResponsiveNav() {
    var x = document.getElementById("navbar__list");
     // console.log(x.className);
      if (x.className === "navbar_TOP") {
        x.className += " responsive";
      } else {
        x.className = "navbar_TOP";
      }
    }
function ScrollToTop()   ///Scroll to top by move to postion x=0,y=0;
{
   window.scrollTo(0,0);

}

function HideFixedNavigationBar(){
    let  Scrollatf = window.pageYOffset;    ///update Y postion after scroll 
    if (Scrollat0  > Scrollatf ) {     //scroll to top
      document.querySelector('.page__header').style.top = "0";        // show nav bar  at header of page 
      //console.log("0")
    } else {                              //scroll to bottom
      document.querySelector('.page__header').style.top = "-500px";   //hide nav bar from header of page  
      //console.log("-100")
    }
    Scrollat0 = Scrollatf;   ///update last postion as initall postion to compare with next postion when scroll
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
(function createLinks()
{    // Build menu 
    LandingSections.forEach((element) => {
        const LandingSecdataNav=element.getAttribute('data-nav');   //save name of section to variable  
        const NavLi=document.createElement('li');      //append li to ul
        const NavLink=document.createElement('a');     //append ancor link  to  nav item 
        const SectionNameText=document.createTextNode(LandingSecdataNav); //create node to save text 
        ScrollWhenclick(NavLink,element);   //function to go to section when click nav item
        NavLink.appendChild(SectionNameText);  
        NavLi.appendChild(NavLink);
        Documentfragment.appendChild(NavLi);  //append all this to document fragment instead of document
                                             //to avoid reflow and repaint each time and increase performance 
        
    });
})();
ul.appendChild(Documentfragment);



// Scroll to section on link click
function ScrollWhenclick(NavLink,element)
{  
    NavLink.addEventListener('click', function ScrollThePage(e)

        {   element.classList.add("your-active-class");
            e.preventDefault();
            element.scrollIntoView({behavior: "smooth"});
             

        });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Add class 'active' to section when near top of viewport
// Set sections as active
(function ActiveSec(){
window.addEventListener('scroll', function () {
  
    if (window.pageYOffset > 100 ) {    
        scrollTopButt.style.display = "block";   ///show  button when  scoll down  
      } else {
        scrollTopButt.style.display = "none";    //hide button at top of page (befor scoll down )   
      }
    setTimeout( HideFixedNavigationBar(), 3000);     //hide navigation bar after 3 sec from scrlloing
    LandingSections.forEach((section)=>{
    const  rectElement=section.getBoundingClientRect(),
           rectElementTop=rectElement.top;
     // alert(rectElementTop);
    //console.log(window.innerHeight);
    if (rectElementTop>=0 && rectElementTop<=300)
    {   
        removeSectionActive();
        section.classList.add("your-active-class");  //add active class to section in viewport 
        removeAncorActive();
        highlightSecList(section);
    }
    
    })
})
})();






