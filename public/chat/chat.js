
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}




//const interval = setInterval(location.reload(), 60000);

addEventListener("DOMContentLoaded" ,async ()=>{
 //const intervalId = setInterval(async () =>{
    const token=localStorage.getItem('token');
  
  const dropdown=document.getElementById('groups');
  dropdown.innerHTML='<option value="">SelectGroup</option>';
  const groups =  await axios.get('http://16.171.15.72:3000/chat/show-all-group' ,{headers:{'Authorization':token}})

  groups.data.groups.forEach(group=>{
    const option =document.createElement('option');
    option.value = group.groupname;
    option.textContent=group.groupname;
    dropdown.appendChild(option);
  })

 // },2000)
 
 //clearInterval(intervalId)
  })
    
   



// async function refresh() {
//     try {
//       const token = localStorage.getItem('token');
//       const decodejwtToken = parseJwt(token);
//       console.log('decodejwtToken', decodejwtToken)
      
//       const response = await axios.get("http://16.171.15.72:3000/chat/show-all", { headers: { 'Authorization': token } });
//       console.log('show all', response.data);
//       document.getElementById('msg-bar').value = "";
//       response.data.chat.forEach(ele => {
//         if (ele.userId === decodejwtToken.userId) {
//           ele.username = 'you';
//         }
        
//         showMessageOnScreen(ele);
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
  
//   // Set the interval duration in milliseconds (e.g., 1 second)
//   const intervalDuration = 1000;
  
//   // Call the refresh function immediately
//   refresh();
  
//   // Schedule the refresh function at the specified interval
//  //const interval = setInterval(refresh, intervalDuration);
  


function showMessageOnScreen(data){
    const parentNode=document.getElementById('ul-list');
    const li=document.createElement('li');
    li.setAttribute("class" , "list-group-item");
    li.innerText=`${data.username} : ${data.msg}`
    parentNode.appendChild(li);
}


async function groupsYouPresent(e){
  try{
  const group=document.getElementById('groups').value;
  localStorage.setItem('groupname',group);
  window.location.href="../groupchat/groupchat.html"
  
  }
  catch(err){
    console.log(err);
  }
    
  
}




function redirectSignup(){
    window.location.href="../signup/signup.html"
}
function redirectlogin(){
    window.location.href="../login/login.html"
}
function redirectcreategroup(){
  window.location.href="../creategroup/creategroup.html"
}