
async function sendMessage(){
    try{
        const token=localStorage.getItem('token');
        const msg=document.getElementById('msg-bar').value;
        obj={
            msg
        }
      const response=  await axios.post('http://localhost:3000/chat/sendmessage',obj, {headers:{'Authorization' : token}});
      
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




//const interval = setInterval(location.reload(), 60000);

addEventListener("DOMContentLoaded" ,async ()=>{
 const intervalId = setInterval(async () =>{
    const token=localStorage.getItem('token');
    const decodejwtToken=parseJwt(token);
    console.log('decodejwtToken',decodejwtToken)
    
    
  const response=  await axios.get("http://localhost:3000/chat/show-all",{headers:{'Authorization':token}});
  console.log('show all' ,response.data.chat);
  
  let array=new Array();
  if(response.data.chat.length > 10){
    let n=response.data.chat.length-1;
    console.log(response.data.chat.length)
    console.log(response.data.chat[n])
    while(array.length <10){
      array.push(response.data.chat[n]);
      n--;
    }
  }
  else{
    array = response.data.chat.reverse();
  }

  array=array.reverse();
  console.log( "array",array);
  localStorage.setItem('chatArray' , JSON.stringify(array));

  let chat=JSON.parse(localStorage.getItem('chatArray'))
  document.getElementById('ul-list').innerHTML = " ";

  chat.forEach(ele=>{
    if(ele.userId === decodejwtToken.userId){
      ele.username='you';
  }
  showMessageOnScreen(ele);
  })

  },2000)
 
 //clearInterval(intervalId)
  })
    
   



// async function refresh() {
//     try {
//       const token = localStorage.getItem('token');
//       const decodejwtToken = parseJwt(token);
//       console.log('decodejwtToken', decodejwtToken)
      
//       const response = await axios.get("http://localhost:3000/chat/show-all", { headers: { 'Authorization': token } });
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
function redirectSignup(){
    window.location.href="../signup/signup.html"
}
function redirectlogin(){
    window.location.href="../login/login.html"
}