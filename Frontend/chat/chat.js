async function sendMessage(){
    try{
        const token=localStorage.getItem('token');
        const msg=document.getElementById('msg-bar').value;
        obj={
            msg
        }
      const response=  await axios.post('http://localhost:3000/chat/sendmessage',obj, {headers:{'Authorization' : token}});
      showMessageOnScreen(response.data)
      console.log(response.data)
    }
    catch(err){
        console.log(err);
    }
   
}

function showMessageOnScreen(response){
    const parentNode=document.getElementById('show-msg');
    const showMessage=`<div class="message">${response.username} :  ${response.msg}</div>`
    parentNode.innerHTML+=showMessage;
}