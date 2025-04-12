/* Slider*/
// Slide index
var sliderIndex = 0;
var elements = document.getElementsByClassName("slide");
const slider = document.querySelector(".slider");
 
// Change slide index
function updateSlideIndex(index){
    sliderIndex += index;
    if(sliderIndex >= elements.length){
        sliderIndex = 0;
    }
    if(sliderIndex < 0){
        sliderIndex = elements.length - 1;
    }
    const slideWidth = elements[0].clientWidth;
    slider.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;
}

// Automatic slider
function autoSlide(){
    sliderIndex += 1;
    if(sliderIndex >= elements.length){
        sliderIndex = 0;
    }
    if(sliderIndex < 0){
        sliderIndex = elements.length - 1;
    }
    const slideWidth = elements[0].clientWidth;
    slider.style.transform = `translateX(-${sliderIndex * slideWidth}px)`;

    setTimeout(autoSlide, 5000);
}
autoSlide();


// Navigation header
function toggleNavigation(){
    var navigation = document.getElementById("main_navigation");
    var header = document.getElementById("main_header");
    if(navigation.style.display=="none"||navigation.style.display==""){
        navigation.style.display = "flex";
        //header.style["flex-direction"] = "column";
        //header.style.position = "absolute";
    } else {
        navigation.style.display = "none";
        //header.style.position = "fixed";
    }
}
