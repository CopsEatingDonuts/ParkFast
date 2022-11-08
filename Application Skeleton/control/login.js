function validateLogin(email, pw){

    if(email == "") {  
        document.getElementById("usermessage").innerHTML = "*Enter Email";  
        document.getElementById("message").innerHTML = "";  
        return false;  
    }  
      
    //check empty password field  
    if(pw == "") {  
      document.getElementById("message").innerHTML = "*Enter Password";  
      document.getElementById("usermessage").innerHTML = "";  
      return false;  
    }
    return true;
}
    