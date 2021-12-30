const img = document.getElementById('img');
const btnSubmit = document.getElementById('btn-submit')
const logo = document.getElementById('container-pet');

logo.style.backgroundImage = `${img.value}`
img.addEventListener('change',()=>{
    let url = URL.createObjectURL(img.files[0]);
    logo.style.backgroundImage = `url(${url})`;
    console.log(url);
})