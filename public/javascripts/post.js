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