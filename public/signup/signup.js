async function submitEvent(e){
    try{
        console.log('i am here')
    e.preventDefault();
    const name=e.target.name.value;
    const mobile=e.target.phone.value;
    const email=e.target.email.value;
    const password=e.target.password.value;

    obj={
        name,
        mobile,
        email,
        password
    }
  const signup=  await  axios.post('http://16.171.15.72:4000/user/signup',obj);
  console.log(signup.data.message);
    alert(signup.data.message);
    window.location.href="../login/login.html"

    }
    catch(err){
        console.log(err);
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`

    }
}