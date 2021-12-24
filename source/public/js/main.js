const nav = document.getElementById('nav');
const btnNav = document.getElementById('btn-nav');
btnNav.addEventListener('click', ()=>{
    if(nav.style.left != '0px') nav.style.left = '0px';
    else     nav.style.left = '-400px';
})

