function validateLogin(){
    var pw = document.getElementById("pswd").value; 
    var user = document.getElementById("username").value;

    if(user == "") {  
        document.getElementById("usermessage").innerHTML = "*Enter Username";  
        document.getElementById("message").innerHTML = "";  
        return false;  
    }  
      
    //check empty password field  
    if(pw == "") {  
      document.getElementById("message").innerHTML = "*Enter Password";  
      document.getElementById("usermessage").innerHTML = "";  
      return false;  
    }  

    else{
        window.open("http://127.0.0.1:5502/Screens/SearchDestination/SearchDestination.html", "_self");
    }
}