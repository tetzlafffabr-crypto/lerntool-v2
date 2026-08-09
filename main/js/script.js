const logs = [];

const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;


//___________________________________
// LIVE DEBUG CONSOLE
//___________________________________

function formatLogArguments(args) {

    return args
        .map(arg => {

            if (typeof arg === "object" && arg !== null) {

                try {
                    return JSON.stringify(arg);
                } catch (error) {
                    return "[Object could not be converted to JSON]";
                }

            }

            return String(arg);

        })
        .join(" ");
}


function addLog(type, args) {

    // Log dauerhaft im Array speichern
    logs.push({
        type: type,
        message: args
    });


    // Prüfen, ob die HTML-Konsole bereits existiert
    const output = document.getElementById("logOutput");

    if (!output) {
        return;
    }


    // Neues <p>-Element für den Log erstellen
    const logger = document.createElement("p");


    // Log-Inhalt einsetzen
    logger.innerText = formatLogArguments(args);


    // Log zur Konsole hinzufügen
    output.appendChild(logger);

    // Nach dem Rendern automatisch nach unten scrollen
    requestAnimationFrame(() => {
    output.scrollTop = output.scrollHeight;
});

}


function renderLogs() {

    const output = document.getElementById("logOutput");

    if (!output) {
        return;
    }


    // Bereits vorhandene Logs anzeigen
    logs.forEach(log => {

        const logger = document.createElement("p");

        logger.innerText = formatLogArguments(log.message);

        output.appendChild(logger);

    });


    // Nach dem Laden aller Logs nach unten scrollen
    output.scrollTop = output.scrollHeight;
}


console.log = function(...args) {

    addLog("log", args);

    originalLog.apply(console, args);

};


console.error = function(...args) {

    addLog("error", args);

    originalError.apply(console, args);

};


console.warn = function(...args) {

    addLog("warn", args);

    originalWarn.apply(console, args);

};


//___________________________________
console.log("java_found");
//___________________________________


console.log("creating_variables"); // HERE


let trainingInterface = document.getElementById("interfaceYard");

const welcomeWords = [
    "Welcome back!",
    "Look who finally made it...",
    "Look who's there",
    "Hello,",
    "Hi there!",
    "Logged in:"
];



let randomWelcome = Math.floor(Math.random() * welcomeWords.length);

let indexStatus = false;

let iframe;
let exitFrame;



console.log("variables_created"); // HERE


console.log("docs_loading"); // HERE


console.log("docs_loaded"); // HERE


console.log("running_commands"); // HERE

if(sessionStorage.getItem("activeUser") === null){

    window.location.href = "login.html";

    // Script nach Redirect nicht weiter ausführen
    throw new Error("No active user. Redirecting to login.html");

}


document.getElementById("userOutput").innerText = JSON.parse(sessionStorage.getItem("activeUser"));

document.getElementById("welcome").innerText = welcomeWords[randomWelcome];



if(JSON.parse(sessionStorage.getItem("activeUser")) === "EatSumCrips"){

    console.log("root> dev mode true");


    let tool = document.getElementById("devTool");


    console.log(tool);


    tool.style.cssText =`
        z-index:9999;
        background-color:rgba(0, 0, 0, 0.5);
        height:85%;
        width:30%;
        border:4px solid red;
        position:fixed;
        right:0px;
        text-align:center;
    `;


    tool.innerHTML = `
    <button style="
        top: 73px;
        position: fixed;
        right: 333px;
    " onclick="hideDevTool()">HIDE</button>

    <div style="
        background-color:#222121;
        margin-top:-30px;
        height:70px;
        box-shadow:
            0 5px 5px red,
            0 5px 15px red,
            0 5px 20px red;
    ">

        <h2
            id="devToolH2"
            style="
                color:red;
                text-shadow:
                    0 0 5px red,
                    0 0 10px red,
                    0 0 15px red;
                font-size:35px;
                transform:translateY(15px);
            "
        >
            DEV-TOOL
        </h2>


        <button onclick="interToggle()">
            Interaction Menu
        </button><br>

        <button onclick="createIframe()">
            iFrame
        </button><br>
        <button onclick="updateQuests()">UPDATE QUESTIONS</button>
        <button onclick="testFunction()">FUNCTION TEST</button><br>

    </div>


    <!-- DEBUG CONSOLE -->
    <div
        id="logOutput"
        style="
            color:white;
            background-color:black;
            position:relative;
            height:80px;
            width:100%;
            transform:translateY(341px);

            box-shadow:
                0 -5px 5px -3px black,
                0 -5px 15px -3px black;

            overflow-y:auto;
            overflow-x:hidden;

            scrollbar-width:none;

            font-size:15px;
            padding:5px;
            box-sizing:border-box;
        "
    ></div>
`;


    //___________________________________
    // ALTE LOGS NACHLADEN
    //___________________________________

    renderLogs();


    console.log("root> devTool loaded");

}


//___________________________________
console.log("commands_applied"); // HERE
//___________________________________


console.log("events_loading"); // HERE


console.log("events_loaded"); // HERE


console.log("functions_loading"); // HERE
setInterval(() => {
    updateClock();
}, 100);

loadProfile();
function loadProfile() {

    const userList = JSON.parse(
        localStorage.getItem("userDataTraingroundV2")
    );

    console.log("AAA");

    let activePlayer = JSON.parse(
        sessionStorage.getItem("activeUser")
    );

    console.log("b");

    for(let i = 0; i < userList.length; i++) {

        console.log("c");

        if(activePlayer === userList[i].username) {

            console.log("d");

            activePlayer = userList[i];

            console.log("e");

            break;

        }

    }

    if(typeof activePlayer === "object") {

        document.getElementById("dashUserOut").innerText =
            activePlayer.username;
        document.getElementById("dashScoreOut").innerText = activePlayer.score;

    } else {

        document.getElementById("dashUserOut").innerText =
            activePlayer;

        console.log("root> couldnt find player");

    }

}

function hideDevTool(){
    document.getElementById("devTool").style.display = "none";
    document.getElementById("showDevTool").style.display = "block";
    console.log("root> hiding: dev_tool");
}
function showDevTool(){
    document.getElementById("devTool").style.display = "block";
    document.getElementById("showDevTool").style.display = "none";
    console.log("root> loaded: dev_tool");
}


function updateClock(){
    const now = new Date();
    const hours = String(now.getHours()).padStart(2,"0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}


function indexToggle(){
    console.log("root> index found");
    indexStatus = !indexStatus;

    const index = document.getElementById("leftSidebar");
    const indexToggleButton = document.getElementById("toggleIndexBtn");

    if(indexStatus){
        index.style.display = "none";
        indexToggleButton.style.display = "block";
    }else{
        index.style.display = "flex";
        indexToggleButton.style.display = "none";
    }
}


function testFunction() {

    let functionName = "reUploading";

    console.log("root> testing Function: " + functionName);

    let target = "Local Storage";

    console.log("root> target found: " + target);

    finished();

    console.log("end");
}


function createIframe(){
    let target = document.getElementById("main");

    iframe = document.createElement("iframe");
    exitFrame = document.createElement("button");

    iframe.src = "C://Users/extra/Desktop/Programming/Projects/Beginner/Console/v2/main/index.html";

    iframe.style.cssText = `
        position: fixed;
        width: 100%;
        height: 500px;
        inset: 0;
        margin-top: 85px;
    `;

    exitFrame.innerHTML = "CLOSE";
    exitFrame.id = "exitFrameBtn";

    exitFrame.addEventListener("click", removeIframe);

    target.appendChild(iframe);
    target.appendChild(exitFrame);

}
function removeIframe() {

    iframe.remove();
    exitFrame.remove();

}


function interToggle(){
    let target = document.getElementById("interaction");
    target.style.display = "flex";
}
function interSub(){
    console.log("root> gettin input");
    let inputA = document.getElementById("inputText").value;
    let inputB = document.getElementById("inputDesc").value;
    let inputC = document.getElementById("inputValue").value;
    let inputD = document.getElementById("inputD").value;
    let selection = document.getElementById("inputSelection").value;
    if(selection === "spanish_vocs_easy"){
        trainyardData[1].data[0].levels.easy.push({
            esp:inputA,
            ger:inputB
        },);
    }
    if(selection === "spanish_vocs_mid"){
        trainyardData[1].data[0].levels.mid.push({
            esp:inputA,
            ger:inputB
        },);
    }
    if(selection === "spanish_vocs_hard"){
        trainyardData[1].data[0].levels.hard.push({
            esp:inputA,
            ger:inputB
        },);
    }
    if(selection === "alphaTest_questions"){
        trainyardData[0].data.push({
            question:inputA,
            answer:inputB,
            keywords: [inputC],
            points: inputD
        },);
    }
    if(selection === "version_update"){
        
        console.log("found")
        let currentUpd = localStorage.getItem("currentVersion");
        console.log(currentUpd)
        currentUpd = inputA;
        console.log("eg")
        localStorage.setItem("currentVersion" , currentUpd);
        console.log("f")
    }
    updateQuests();
    console.log("DONE")
}
function interClose(){
    document.getElementById("interaction").style.display = "none";
}

//________________
// TRAINYARD

//________________


console.log("functions_loaded"); // HERE


//___________________________________
console.log(
    "root> JAVA LOADED OVERVIEW:",
    JSON.stringify(logs)
);
console.log("root> localStorage Overwiew:" , localStorage)
//___________________________________