async function creategroup(e){
    try{
        e.preventDefault();
        const token =localStorage.getItem('token');
        const groupname=document.getElementById('groupname').value;
        console.log(groupname)
        const obj={
         groupname
        }
       const response= await axios.post('http://16.171.15.72:3000/group/create-group' , obj , { headers : { 'Authorization' : token } } );
        console.log(response.data);
       if(response.data.success === true){
        localStorage.setItem('groupname' , response.data.creategroup.groupname)
        alert(response.data.message);
       window.location.href="../groupchat/groupchat.html"
     }

    }
    catch(err){
     console.log(err);
    }
  

}