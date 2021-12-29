/* <article>
    <div class="imagen">
    <!-- <img src="/img/cuadro (1).jpg" alt="Cuadro 1" width="250"> -->
    </div>
    <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit veritatis alias, consectetur corporis aut accusantium a voluptatum reiciendis odit architecto!
    </p>
</article> */

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