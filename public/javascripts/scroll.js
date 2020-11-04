function navfade(){
    var screenposition=window.innerHeight/3;
    const navbar=document.querySelector('header');

    if(window.pageYOffset<screenposition){
        navbar.classList.remove('navbaractive');
    }
    if(window.pageYOffset>screenposition){
        navbar.classList.add('navbaractive');
    }
}
window.addEventListener('scroll', ()=>{
    navfade();
})

const imageCarousel = document.querySelector('.imageCarousel');
let counter= 1;
let distance= 100;

//buttons
const prev = document.querySelector('.prevButton');
const next = document.querySelector('.nextButton');

prev.addEventListener('click', ()=>{
    if(counter<=0) return;
    console.log(1);
    imageCarousel.style.transition='0.5s ease-in-out'
    counter--;
    imageCarousel.style.transform = `translateX(-${counter*distance}vw)`;
});
next.addEventListener('click', ()=>{
    if(counter>=4) return;
    console.log(2);
    imageCarousel.style.transition='0.5s ease-in-out'
    counter++;
    imageCarousel.style.transform = `translateX(-${counter*distance}vw)`;
});

imageCarousel.addEventListener('transitionend', ()=>{
    if(counter==0){
        imageCarousel.style.transition='none';
        counter=3;
        imageCarousel.style.transform = `translateX(-${counter*distance}vw)`;
    }
    if(counter==4){
        imageCarousel.style.transition='none';
        counter=1;
        imageCarousel.style.transform = `translateX(-${counter*distance}vw)`;
    }
})