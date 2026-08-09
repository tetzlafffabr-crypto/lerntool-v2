document.getElementById("loginMain").innerHTML =`
    <div id="loginUi">
        <p>login / register</p>
        <input id="userInput" type="text" placeholder="Username">
        <input id="pwInput" type="password" placeholder="Password">
        <button id="loginButton">LOGIN</button>
        <button id="registerButton">REGISTER</button>
    <div>`;
if(localStorage.getItem("userDataTraingroundV2") === null){
    localStorage.setItem("userDataTraingroundV2" , JSON.stringify([]));
};
document.getElementById("loginButton").addEventListener("click", function(){
    loginBtn(login);
});
document.getElementById("registerButton").addEventListener("click", function(){
    loginBtn(register);
});


let userList = JSON.parse(localStorage.getItem("userDataTraingroundV2"));
const loginInterface = document.getElementById("loginUi");

document.getElementById("userInput").addEventListener("keydown",
    function(event){
        if(event.key === "Enter"){
            document.getElementById("pwInput").focus();
        }
    }
);
document.getElementById("pwInput").addEventListener("keydown",
    function(event){
        if(event.key === "Enter"){
            loginBtn(login);
        }
    }
);


loginInterface.style.cssText = `
height: 250px;
width: 550px;
transform: translate(-50%, 50%);
position: fixed;
background-color: black;
left: 50%;
bottom: 50%;
display:flex;
flex-direction:column;`;

document.getElementById("userInput").focus();


function loginBtn(type){
    console.log("id-0 function loginBtn");
    const userinput = document.getElementById("userInput").value;
    const passwordInput = document.getElementById("pwInput").value;
    if(userInput === "" || passwordInput === ""){
        console.log("id-2 invalid input");
        alert("Enter username and password");
        return;
    }

    if(type === login){
        console.log("id-0 login attempt");
        login();
        console.log("id-0 login output done");
    }else if(type === register){
        console.log("id-0 register attempt");
        register();
        console.log("id-0 register output done");
    }
    console.log("id-0 function loginBtn end");
};

function login(){
    console.log("LOGIN START");

    const userinput = document.getElementById("userInput").value;
    const passwordInput = document.getElementById("pwInput").value;

    console.log("Username:", userinput);
    console.log("Password:", passwordInput);

    const currentUserList = JSON.parse(
        localStorage.getItem("userDataTraingroundV2")
    );

    console.log("UserList:", currentUserList);

    for(let i = 0; i < currentUserList.length; i++){

        console.log("Check for: ", currentUserList[i]);

        if(
            currentUserList[i].username === userinput &&
            currentUserList[i].password === passwordInput
        ){
            console.log("LOGIN ERFOLGREICH");

            window.location.href = "index.html";
            sessionStorage.setItem("activeUser" , JSON.stringify(userinput));
            console.log("USER LOADED");
            return;
        }
    }

    console.log("LOGIN FEHLGESCHLAGEN");
};

function register(){
    console.log("REGISTER START");

    const userInput = document.getElementById("userInput").value;
    const passwordInput = document.getElementById("pwInput").value;

    console.log("Username: ", userInput);
    console.log("Password: ", passwordInput);

    for(let i = 0; i < userList.length; i++){

        console.log("Check for username: ", userList[i]);

        if(userList[i].username === userInput){
            alert(`Username: ${userInput} already exist`);

            console.log(`Username: ${userInput} already exist`);
            return;
        }
    }

    console.log("Creating Account:", userInput);

    userList.push(
        {
            username: userInput,
            password: passwordInput,
            score: 0
        }
    );

    localStorage.setItem("userDataTraingroundV2" , JSON.stringify(userList));

    console.log("ACCOUNT UPLOADED");
};
