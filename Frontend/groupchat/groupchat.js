async function sendMessage(){
    try{
        const token=localStorage.getItem('token');
        const msg=document.getElementById('msg-bar').value;
        const groupname=localStorage.getItem('groupname');
        obj={
            msg,
            groupname
        }
      const response = await axios.post('http://localhost:3000/groupchat/sendmessage',obj, {headers:{'Authorization' : token}});
      
      console.log("insert",response.data.chatDetails);
      response.data.chatDetails.username='you';
      showMessageOnScreen(response.data.chatDetails)
      document.getElementById('msg-bar').value = "";
     // location.reload();
    }
    catch(err){
        console.log(err);
    }
   
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


addEventListener("DOMContentLoaded" ,async ()=>{
let h4= document.getElementById('groupname');
const groupname=localStorage.getItem('groupname');
h4.innerHTML=`Group Name : ${groupname}`;
 console.log(h4)
 
 console.log(groupname)

    const token=localStorage.getItem('token');
    const decodejwtToken=parseJwt(token);
    
    
  const response =  await axios.get(`http://localhost:3000/groupchat/show-all/${groupname}`,{headers:{'Authorization':token}},groupname);

  
  let array=new Array();
  if(response.data.chat.length > 10){
    let n=response.data.chat.length-1;
    while(array.length <10){
      array.push(response.data.chat[n]);
      n--;
    }
  }
  else{
    array = response.data.chat.reverse();
  }

  array=array.reverse();
  localStorage.setItem('chatArray' , JSON.stringify(array));

  let chat=JSON.parse(localStorage.getItem('chatArray'))
  document.getElementById('ul-list').innerHTML = " ";

  chat.forEach(ele=>{
    if(ele.userId === decodejwtToken.userId){
      ele.username='you';
  }
  showMessageOnScreen(ele);
  })
})

function redirectaddmembers(){
    window.location.href="../addmembers/addmember.html"
}

function showMessageOnScreen(data){
    const parentNode=document.getElementById('ul-list');
    const li=document.createElement('li');
    li.setAttribute("class" , "list-group-item");
    li.innerText=`${data.username} : ${data.msg}`
    parentNode.appendChild(li);
}

function redirectSignup(){
    window.location.href="../signup/signup.html"
}
function redirectlogin(){
    window.location.href="../login/login.html"
}