/* <article>
    <div class="imagen">
    <!-- <img src="/img/cuadro (1).jpg" alt="Cuadro 1" width="250"> -->
    </div>
    <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit veritatis alias, consectetur corporis aut accusantium a voluptatum reiciendis odit architecto!
    </p>
</article> */
function mascotasList(dataMascotas) {
    const article = document.createElement('article');
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
    p2.textContent = dataMascotas.description;
    fragmento.appendChild(div);
    div.appendChild(img);
    pContainer.appendChild(p);
    pContainer.appendChild(p2);
    fragmento.appendChild(pContainer);
    article.appendChild(fragmento);
    return article;
}
const contenedorPerros = document.getElementById('contenedor-perros');
fetch('/api/dogs').then(res => res.json()).then(res =>{
    const fragmento = document.createDocumentFragment();
    res.forEach(dataMascotas => {
        fragmento.appendChild(mascotasList(dataMascotas));
    });
    contenedorPerros.appendChild(fragmento);
})


const salir = document.getElementById('salir');
salir.addEventListener('click',()=>{
    localStorage.clear();
    location.href = '/login';
})




const carrucel = document.getElementById('carrusel');
const arryImgs = [
    `https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/article/5f4e647d5cafe8e117b75536/1-adoptar-perro-refugio_1.jpg`,
    `https://www.hogarmania.com/archivos/201711/mascotas-adopcion-668x400x80xX.jpg`,
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFictb4GjEujokxfS02oymw8j8hy7w2RCZag&usqp=CAU`
]
let i = 0;
setInterval(()=>{
    if(i < arryImgs.length)
    {
        carrucel.setAttribute('src', arryImgs[i]);
        i++
    }else i = 0;
},(1000*5));