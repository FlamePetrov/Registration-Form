 //входящи данни
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const ageInput = document.getElementById("age");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");

  const error_email = document.getElementById("error_email");
  const error_username = document.getElementById("error_username");
  const error_password = document.getElementById("error_password");

  const success_msg = document.getElementById("success_msg");


  const userInfo = localStorage.getItem("user"); 
  const form = document.getElementById("form");
  let users = JSON.parse(localStorage.getItem("userInfo"));


//-----------------------------------------------------------------------
//показване на парола
function toggle(){
  var password = document.getElementById("password");
  var eye = document.getElementById("eye");
  var slash_eye = document.getElementById("slash_eye");
  //проверка за типа на елемента
  if(password.type === "password"){
    //промяна от тип парола към текст
    password.type = "text";
    //стилизация на изображението за показване на парола
    eye.style.display = "block";
    slash_eye.style.display = "none";
  }
  else{
    //промяна на елемента към тип парола
    password.type = "password";
    //стилизация на изображението за скриване на парола
    eye.style.display = "none"; 
    slash_eye.style.display = "block"; 
  }
}
//проверка на дължина на паролата
function validatePasswordLenght(regex_lenght, password){
  return match_lenght = password.match(regex_lenght);
}
//проверка за съдържание на малка буква в паролата
function validatePasswordLWcase(regex_lwcase, password){
  return match_lwcase = password.match(regex_lwcase);
}
//проверка за съдържание на главна буква в паролата
function validatePasswordUPcase(regex_upcase, password){
  return match_upcase = password.match(regex_upcase);
}
//проверка дали паролата съдържа поне една цифра или специален знак
function validatePasswordDigitSpChar(regex_digit_spchar, password){
  return match_digit_spchar = password.match(regex_digit_spchar);
}
//-----------------------------------------------------------------------

//таймер за съобщението SUCCESS
function successMessageTimer(success_msg){
  success_msg.classList.add("success_msg");
  success_msg.textContent = "Регистрирахте се успешно!"
 
  setTimeout(function(){
    success_msg.textContent = "";
    success_msg.classList.remove("success_msg");
  }, 5000);
  
}
//премахване на всички останали ERROR съобщения от екрана на потребителя
function setAllErrorMessageNull(error_email, error_password, error_username){
      error_username.textContent ="";
      error_email.textContent = "";  
      error_password.textContent = "";
}
function setUserData(firstName, lastName, age, email, username, password) {
  user = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
    username: username,
    password: password
  };
}
//destructuring
function getUserData() {
  var firstName = firstNameInput.value.trim();
  var lastName = lastNameInput.value.trim();
  var email = emailInput.value.trim();
  var age = ageInput.value.trim();
  var username = usernameInput.value.trim();
  var password = passwordInput.value.trim();
  let user = {firstName:firstName, lastName:lastName, email:email, age:age, username:username, password:password};
  return user;
}
function addUser(e){
  e.preventDefault();
  
  //вземане на входящи стойности
  var { firstName, lastName, age, email, username, password } = getUserData();


  //запазване в localstorage
  
    setUserData(firstName, lastName, age, email, username, password);
    //проверка дали users е null
    if(!users){
      //създаване на нов масив при вярна проверка, че users е null
      users = new Array()
    }
    else if(users.some((v) => {return v.email==email}) && users.some((v) => {return v.username==username})){
      error_email.textContent = "Вече съществува такъв имейл в системата."
      error_username.textContent = "Вече съществува потребител с това име.";
      return;
    }
    else if(users.some((v) => {return v.email==email})){
      error_email.textContent = "Вече съществува такъв имейл в системата.";
      error_username.textContent = "";
      return;
    }
    else if(users.some((v) => {return v.username==username})){   
      error_email.textContent = "";
      error_username.textContent = "Вече съществува потребител с това име.";
      return; 
    }
      
    //regex за проверка на парола
    let regex_lenght = /(?=^.{8,}$)/;
    let regex_lwcase = /(?=.*[a-z])/;
    let regex_upcase = /(?=.*[A-Z])/;
    let regex_digit_spchar = /[!_~*-]|[\d]/;
    
    //проверка дали паролата отговаря на необходимите параметри
    if( !validatePasswordLenght(regex_lenght,password) ||
        !validatePasswordLWcase(regex_lwcase,password) ||
        !validatePasswordUPcase(regex_upcase, password)){
      error_username.textContent ="";
      error_email.textContent = "";
      error_password.textContent = "Паролата трябва да има поне 8 символа, поне една малка и една голяма буква."
      return;
    }
    //проверка дали паролата съдържа поне един знак или специален символ
    else if(!validatePasswordDigitSpChar(regex_digit_spchar, password)){
      //изчистване на error съобщенията при валидност на информацията
      error_username.textContent ="";
      error_email.textContent = "";
      error_password.textContent = "Трябва да съдържа число или специален знак (\" !, *, -, _, ~\").";
      return;
    }
    else {       
      setAllErrorMessageNull(error_email, error_password, error_username);
      successMessageTimer(success_msg);
      users = [...users, user];
      localStorage.setItem("userInfo", JSON.stringify(users));
      form.reset();
    }
}

form.addEventListener("submit", addUser);





