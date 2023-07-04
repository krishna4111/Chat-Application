async function addMembers(e){
    try{
      const token=localStorage.getItem('token');
        e.preventDefault();
      const email=document.getElementById('email').value;
      const groupname=localStorage.getItem('groupname');
console.log(email,groupname)
      obj={
        email,
        groupname
      }
     const member= await axios.post('http://16.171.15.72:3000/group/add-member',obj,{headers:{'Authorization' : token}});
      alert(member.data.message);
     window.location.href="../groupchat/groupchat.html"
    }
    catch(err){
        console.log(err);
    }
}