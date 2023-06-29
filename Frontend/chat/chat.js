async function sendMessage(){
    try{
        const token=localStorage.getItem('token');
        const msg=document.getElementById('msg-bar').value;
        obj={
            msg
        }
      const response=  await axios.post('http://localhost:3000/chat/sendmessage',obj, {headers:{'Authorization' : token}});
      showMessageOnScreen(response.data)
     // location.reload();
    }
    catch(err){
        console.log(err);
    }
   
}




addEventListener("DOMContentLoaded" , async () =>{
    try{
      const token=localStorage.getItem('token');
      
    const response=  await axios.get("http://localhost:3000/chat/show-all",{headers:{'Authorization':token}});
 
    response.data.msg.forEach(ele=>{
        showMessageOnScreen(ele)
    })
    }
    catch(err){
       console.log(err);
    }
})

function showMessageOnScreen(data){
    //console.log(data.userId,data.msg)
    const parentNode=document.getElementById('ul-list');
    const li=document.createElement('li');
    li.setAttribute("class" , "list-group-item");
    li.innerText=`${data.userId} : ${data.msg}`
    parentNode.appendChild(li);
}
function redirectSignup(){
    window.location.href="../signup/signup.html"
}
function redirectlogin(){
    window.location.href="../login/login.html"
}