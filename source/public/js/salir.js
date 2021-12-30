const salir = document.getElementById('salir');
salir.addEventListener('click',()=>{
    console.log('click');
    localStorage.clear();
})