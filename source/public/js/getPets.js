function mascotasList(dataMascotas) {
    const article = document.createElement('article');
    article.style.paddingRight = '50px';
    const img = document.createElement('img');
    const fragmento = document.createDocumentFragment();
    const div = document.createElement('div');
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    article.classList.add('adoptame__article')
    img.setAttribute('width',"250")
    div.classList.add('imagen');    
    img.setAttribute('src', `data:image/png;base64,${dataMascotas.urlImg}`);
    img.classList.add('img-mascota')
    const pContainer = document.createElement('p');
    p.textContent = dataMascotas.title;
    p2.textContent = dataMascotas.description.slice(0,120) + "...";
    fragmento.appendChild(div);
    div.appendChild(img);
    pContainer.appendChild(p);
    pContainer.appendChild(p2);
    fragmento.appendChild(pContainer);
    article.appendChild(fragmento);
    article.addEventListener('click',()=>{
        location.href = `/adoptar/${dataMascotas.id}`
    })
    return article;
}
const contenedorPerros = document.getElementById('contenedor-perros');
const loading = document.getElementById('loading');
fetch('/api/dogs').then(res => res.json()).then(res =>{
    const fragmento = document.createDocumentFragment();
    res.forEach(dataMascotas => {
        fragmento.appendChild(mascotasList(dataMascotas));
    });
    
    contenedorPerros.appendChild(fragmento);
    contenedorPerros.removeChild(loading);
})