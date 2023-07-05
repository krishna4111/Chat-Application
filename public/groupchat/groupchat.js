
const socket = io('http://localhost:3000/');


socket.on('connect', () => {
    console.log(socket.id);
});


socket.on('receive', (message )=> {
    console.log("message>>>>>>>>>>>>>>>",message);
   showMessageOnScreen(message)
})





async function sendMessage(e){
    try{
      e.preventDefault();
        const token=localStorage.getItem('token');
        const msg=document.getElementById('msg-bar').value;
        const groupname=localStorage.getItem('groupname');
        console.log('i am groupname',groupname)
        obj={
            msg,
            groupname
        }
      const response = await axios.post('http://localhost:3000/groupchat/sendmessage',obj, {headers:{'Authorization' : token}});
      const username= response.data.chatDetails.username;
      obj2={
        msg,
        username
      }
      socket.emit('send-message', obj2);
      // console.log("insert",response.data.chatDetails);
      //response.data.chatDetails.username='you';
    //showMessageOnScreen(response.data.chatDetails)
      document.getElementById('msg-bar').value = "";
     //location.reload();
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

//setInterval(async()=>{
  const token=localStorage.getItem('token');
  const decodejwtToken=parseJwt(token);
  try{
    const response =  await axios.get(`http://localhost:3000/groupchat/show-all/${groupname}`,{headers:{'Authorization':token}});
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
  
  }
  catch(err){
    console.log(err);
  }

//},1000)
   
try{
  const token=localStorage.getItem('token');
  const response =  await axios.get(`http://localhost:3000/groupchat/show-all/${groupname}`,{headers:{'Authorization':token}});
  if(response.data.usergroup[0].isAdmine === false){
    document.getElementById("addmember").style.visibility="hidden";
    document.getElementById("makeadmine").style.visibility="hidden";
    document.getElementById("showuser").style.visibility="hidden";

  }
  else{
    showAllUsers();
  }
}
catch(err){
  console.log(err);
}
})




async function showAllUsers(){
  try{
    const token=localStorage.getItem('token');
    const groupname=localStorage.getItem('groupname')
  
    const response=await axios.get(`http://localhost:3000/groupchat/show-all-users/${groupname}`,{headers:{'Authorization':token}});
    console.log("users",response.data);
    response.data.getusers.forEach(user=>{
      if(user.isAdmine===true){
        showAdmineUsers(user.name,user.userId);
      }
      else{
        showUsers(user.name,user.userId)
      }
      
    })
    
  }
  catch(err){
    console.log(err);
  }

}
function showAdmineUsers(name,id){
  const parentNode = document.getElementById("showing");
  const createNewUser = `
  <div>
  <li style="margin-left: 110px;display:inline-block" id=${id}> Name : ${name} : 
  <li style="color:green;display:inline-block">Admine</li>
  <button style="padding:3px;margin:5px" onclick=removeUserFromGroup('${id}') class="btn btn-danger">Remove</button>
  
      </li>
      </div>`;
      
      parentNode.innerHTML += createNewUser;
}

function showUsers(name,id){
  const parentNode = document.getElementById("showing");
  const createNewUser = `<li style="margin-left: 38px;" id=${id}> Name : ${name} 
  <button style="padding:3px;margin:5px" onclick=removeUserFromGroup('${id}') class="btn btn-danger">Remove</button>
  
      </li>`;
      parentNode.innerHTML += createNewUser;
}

async function removeUserFromGroup(userId) {
  try{
    const groupname=localStorage.getItem('groupname');
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/groupchat/remove-user/${userId}/${groupname}`, { headers: { 'Authorization': token } })
      
        removeItemFromScreen(userId);
        location.reload();
    
  }
  catch(err){
    console.log(err);
  }
  
}
function removeItemFromScreen(UserId) {
  try{
    const parentNode = document.getElementById("showing");
    const elem = document.getElementById(UserId);
    parentNode.removeChild(elem);
  }
 
  catch(err){
    console.log(err);
  }
}


async function makeAdmine(e){
  try{
    const token=localStorage.getItem('token');
    const groupname=localStorage.getItem('groupname');
    const email=document.getElementById('admine').value;
    obj={
      email,
      groupname
    }
  const admin=  await axios.post('http://localhost:3000/groupchat/made-admine',obj,{headers:{'Authorization':token}})
  alert(admin.data.message);
  location.reload();

  }
  catch(err){
    console.log(err)
  }
}



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