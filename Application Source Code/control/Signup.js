



function validateForm(pw1, pw2, email) {
    //check empty first name field  
    var num = /[0-9]+/g;
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;


    if(email == "") {  
      document.getElementById("usermessage").innerHTML = "*Enter email address";  
      document.getElementById("message1").innerHTML = "";  
      document.getElementById("message2").innerHTML = "";  
      return false;  
    }

    if (expression.test(email) == false){
      document.getElementById("usermessage").innerHTML = "*Invalid email address";  
      document.getElementById("message1").innerHTML = "";  
      document.getElementById("message2").innerHTML = "";
      return false;
    }
      
    //check empty password field  
    if(pw1 == "") {  
      document.getElementById("message1").innerHTML = "*Enter Password";  
      document.getElementById("usermessage").innerHTML = "";  
      document.getElementById("message2").innerHTML = "";  
      return false;  
    }  
    
     
    //minimum password length validation  
    if(pw1.length < 8) {  
      document.getElementById("message1").innerHTML = "*Password length must be atleast 8 characters";  
      document.getElementById("message2").innerHTML = "";  
      document.getElementById("usermessage").innerHTML = "";  
      return false;  
    }  

    if(!num.test(pw1)){
      document.getElementById("message1").innerHTML = "*Password length must have at least 1 number";  
      document.getElementById("message2").innerHTML = "";  
      document.getElementById("usermessage").innerHTML = "";  
        return false;
    }

    //maximum length of password validation  
    if(pw1.length > 15) {  
      document.getElementById("message1").innerHTML = "*Password length must not exceed 15 characters";  
      document.getElementById("message2").innerHTML = "";  
      document.getElementById("usermessage").innerHTML = "";  

      return false;  
    }  

    //check empty confirm password field  
    if(pw2 == "") {  
        document.getElementById("message2").innerHTML = "*Enter Password";  
        document.getElementById("message1").innerHTML = "";  
        document.getElementById("usermessage").innerHTML = "";  
        return false;  
      }   
    
    if(pw1 != pw2) {  
      document.getElementById("message2").innerHTML = "*Password and Confirm Password do not match"; 
      document.getElementById("message1").innerHTML = "";  
      document.getElementById("usermessage").innerHTML = "";   
      return false;  
    } 

    return true;
}


