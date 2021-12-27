
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
    const a = await fetch('/api/user',{
        method: 'POST',
        body:JSON.stringify(data),   
        headers: {"Content-Type": "application/json",}
    })
    .then(res=>res.json())
    .then(res=>{
        if(res == false) location.href = '/login';
        else location.href = '/home';
    });
}

