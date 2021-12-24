const btnLogin = document.getElementById('btn-login');
const email= document.getElementById('email');
const password = document.getElementById('password');

btnLogin.addEventListener('click',()=>{
    localStorage.setItem('email', email.value);
    localStorage.setItem('password',  password.value);
})