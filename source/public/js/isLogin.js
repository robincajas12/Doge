
if(localStorage.getItem('email') != null && localStorage.getItem('password') != null)
{
    const data = {
        email:localStorage.getItem('email'),
        password:localStorage.getItem('password')
    }
    verificarUser(data);
}
else location.href = '/login';





async function verificarUser(data)
{
    const a = await fetch('/api/user',{
        method: 'POST',
        body:JSON.stringify(data),   
        headers: {"Content-Type": "application/json",}
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.isLogin == false) location.href = '/login';
    });
}
