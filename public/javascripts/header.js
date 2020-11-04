const navSlide=()=>{
    const icon=document.querySelector('.navicon')
    const nav=document.querySelector('.nav')
    const bar=document.querySelector('.navlist')
    nav.addEventListener('click', ()=> {
        bar.classList.toggle('nav-active')
        icon.classList.toggle('x')
    })
}
navSlide();