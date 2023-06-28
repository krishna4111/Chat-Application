async function loginEvent(e){
    try{
        e.preventDefault();
    
        email=e.target.email.value;
        password=e.target.password.value;
        const obj={
            email,password
        }
        const check=await axios.post('http://localhost:3000/user/login',obj)
        alert(check.data.message);
        localStorage.setItem("token",check.data.token);
 
    }
    catch(err){
        console.log(err.message);
        document.body.innerHTML +=`<div style="color:red;">${err.message}</div>`
    }
}