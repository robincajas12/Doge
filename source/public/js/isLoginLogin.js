
function iniciarVerificacion(ruta)
{
    if(localStorage.getItem('email') != null && localStorage.getItem('password') != null)
    {
        const data = {
            email:localStorage.getItem('email'),
            password:localStorage.getItem('password')
        }
        verificarUser(data, ruta);
    }
}
async function verificarUser(data, ruta)
{
    console.log('--------------------------')
    const a = await fetch('/api/user',{
        method: 'POST',
        body:JSON.stringify(data),   
        headers: {"Content-Type": "application/json",}
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        if(res.isLogin == false){location.href = '/login'; localStorage.clear();}
        else location.href = '/home';
    });
}

