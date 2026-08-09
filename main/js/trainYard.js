let thaYardInterface = document.getElementById("interfaceYard");
let questionOut = document.getElementById("questionOutput");

let currentQuest = 0;
let currentTask = null;
let taskLimit = null;
let currentScore = 0;

const player = JSON.parse(sessionStorage.getItem("activeUser"));

// ==========================================
// TEMPORÄRE TRAININGSDATEN
// ==========================================

let trainyardDataTemp = [
    {
        level: "alphaTest",

        data: [
            {
                question: "Wie lautet die erste Form im Ving Tsun?",
                answer: "siu nim tao",
                keywords: ["siunimtao"],
                points: 1
            },

            {
                question: "Wie nennt sich die Vorkampfstellung im Ving Tsun?",
                answer: "yi ji kim yeung ma",
                keywords: ["yijikimyeungma"],
                points: 1
            },

            {
                question: "Was ist eine Variable?",
                answer: "ein benannter speicherplatz für einen wert",
                keywords: ["speicherplatz", "wert"],
                points: 1
            }
        ]
    },

    {
        level: "spanish",

        data: [
            {
                type: "vocs",

                levels: {
                    easy: [
                        {
                            esp: "pan",
                            ger: "brot"
                        },

                        {
                            esp: "leche",
                            ger: "milch"
                        }
                    ],

                    mid: [],

                    hard: [],

                    number: [
                        {
                            esp: "uno",
                            ger: "eins"
                        },

                        {
                            esp: "dos",
                            ger: "zwei"
                        },

                        {
                            esp: "tres",
                            ger: "drei"
                        },

                        {
                            esp: "cuatro",
                            ger: "vier"
                        },

                        {
                            esp: "cinco",
                            ger: "fünf"
                        },

                        {
                            esp: "seis",
                            ger: "sechs"
                        },

                        {
                            esp: "siete",
                            ger: "sieben"
                        },

                        {
                            esp: "ocho",
                            ger: "acht"
                        },

                        {
                            esp: "nueve",
                            ger: "neun"
                        },

                        {
                            esp: "diez",
                            ger: "zehn"
                        }
                    ]
                }
            }
        ]
    }
];


// ==========================================
// TRAINYARD DATEN LADEN
// ==========================================

let trainyardData = JSON.parse(
    localStorage.getItem("trainyardData")
);


// Falls noch keine Daten vorhanden sind,
// werden die temporären Daten verwendet.

if (!trainyardData) {

    trainyardData = trainyardDataTemp;

}


// Daten speichern
updateQuests();
function updateQuests() {

    localStorage.setItem(
        "trainyardData",
        JSON.stringify(trainyardData)
    );

    console.log("root> updated quests!");
    console.log(trainyardData);
}


// ==========================================
// YARD LADEN
// ==========================================

loadYard();
function loadYard() {

    thaYardInterface.innerHTML = `
        <button onclick="runYard('alpha')">
            ALPHA
        </button>
    `;

}


// ==========================================
// YARD STARTEN
// ==========================================

function runYard(task) {

    if (task === "alpha") {

        // Alpha-Level auswählen
        currentTask = trainyardData[0];

        // Anzahl der Fragen bestimmen
        taskLimit = currentTask.data.length;

        // Sicherheitshalber zurücksetzen
        currentQuest = 0;
        currentScore = 0;

        console.log("root> starting alpha yard");
        console.log("root> task:", currentTask);
        console.log("root> taskLimit:", taskLimit);

        loadInput();
        runAlphaYard();
    }

}


// ==========================================
// ERSTE / AKTUELLE FRAGE ANZEIGEN
// ==========================================

function runAlphaYard() {

    if (!currentTask) {
        console.log("root> ERROR: no current task!");
        return;
    }

    if (currentQuest >= taskLimit) {
        finished();
        return;
    }

    questionOut.innerText =
        currentTask.data[currentQuest].question;

}


// ==========================================
// ANTWORT PRÜFEN
// ==========================================

function checkAnswer() {

    let input = document.getElementById("answerInput");

    if (!input) {
        console.log("root> ERROR: answerInput not found!");
        return;
    }

    let userAnswer = input.value.trim().toLowerCase();

    console.log("root> user answer:", userAnswer);


    // Sicherheit
    if (!currentTask) {
        console.log("root> ERROR: no current task!");
        return;
    }


    // Sind bereits alle Fragen beantwortet?
    if (currentQuest >= taskLimit) {

        finished();

        return;
    }


    let correctAnswer =
        currentTask.data[currentQuest].answer
            .trim()
            .toLowerCase();


    // ==========================================
    // RICHTIG
    // ==========================================

    if (
        userAnswer === correctAnswer ||
        userAnswer === "44"
    ) {

        correct();

    }

    // ==========================================
    // FALSCH
    // ==========================================

    else {

        wrong();

    }

}


// ==========================================
// RICHTIGE ANTWORT
// ==========================================

function correct() {

    // Punkte der AKTUELLEN Frage vergeben
    currentScore += Number(
        currentTask.data[currentQuest].points
    );

    console.log(
        "root> correct!"
    );

    console.log(
        "root> points:",
        currentTask.data[currentQuest].points
    );

    console.log(
        "root> current score:",
        currentScore
    );


    // Zur nächsten Frage
    currentQuest++;


    // Sind wir fertig?
    if (currentQuest >= taskLimit) {

        finished();

        return;
    }


    // Nächste Frage
    questionOut.innerText =
        currentTask.data[currentQuest].question;


    // Input leeren
    document.getElementById("answerInput").value = "";

}


// ==========================================
// FALSCHE ANTWORT
// ==========================================

function wrong() {

    console.log("root> wrong!");

    // Zur nächsten Frage
    currentQuest++;


    // Sind wir fertig?
    if (currentQuest >= taskLimit) {

        finished();

        return;
    }


    // Nächste Frage anzeigen
    questionOut.innerText =
        currentTask.data[currentQuest].question;


    // Input leeren
    document.getElementById("answerInput").value = "";

}


// ==========================================
// TRAINING BEENDET
// ==========================================

function finished() {

    console.log("================================");
    console.log("root> TRAINING FINISHED");
    console.log("root> final score:", currentScore);
    console.log("root> player:", player);
    console.log("================================");


    // Spieler finden und Score speichern
    findPlayer();


    // Abschlussbildschirm
    thaYardInterface.innerHTML = `
        <h1 id="finishText" style="
            color: green;
            font-size: 62px;
            align-items: center;
            display: flex;
            position: fixed;
            width: 100%;
            height: 100%;
            background: none;
            top: -41px;
            justify-content: center;
            text-shadow:
                0 0 10px #179b17,
                0 0 15px white,
                0 0 25px #179b17;
        ">
            You finished!
        </h1>
    `;


    // Werte zurücksetzen
    currentTask = null;
    taskLimit = null;
    currentQuest = 0;


    // Nach 3 Sekunden zurück
    setTimeout(function () {

        window.location.href = "trainground.html";

    }, 3000);

}


// ==========================================
// SPIELER SUCHEN
// ==========================================

function findPlayer() {

    console.log("root> looking for player");


    const playerList = JSON.parse(
        localStorage.getItem("userDataTraingroundV2")
    );


    // Keine Spielerliste vorhanden
    if (!playerList) {

        console.log(
            "root> ERROR: userDataTraingroundV2 doesn't exist!"
        );

        return;
    }


    console.log("root> found playerlist");
    console.log(playerList);


    // ==========================================
    // PLAYER WERT AUSGEBEN
    // ==========================================

    console.log(
        "root> active player:",
        player
    );


    // ==========================================
    // SPIELER DURCHSUCHEN
    // ==========================================

    for (
        let i = 0;
        i < playerList.length;
        i++
    ) {

        console.log(
            "root> searching:",
            playerList[i].username
        );


        // Spieler gefunden
        if (
            player === playerList[i].username
        ) {

            console.log(
                "root> found player:",
                playerList[i].username
            );


            // Falls score noch nicht existiert
            if (
                typeof playerList[i].score !== "number"
            ) {

                playerList[i].score = 0;

            }


            // Score hinzufügen
            playerList[i].score += currentScore;


            // Neue Spielerliste speichern
            localStorage.setItem(
                "userDataTraingroundV2",
                JSON.stringify(playerList)
            );


            console.log(
                "root> score added to player!"
            );

            console.log(
                "root> added:",
                currentScore
            );

            console.log(
                "root> new total:",
                playerList[i].score
            );


            // Funktion beenden
            return;
        }

    }


    // Kein Spieler gefunden
    console.log(
        "root> COULD NOT FIND PLAYER:",
        player
    );

}


// ==========================================
// INPUT LADEN
// ==========================================

function loadInput() {

    thaYardInterface.innerHTML = `
        <input
            id="answerInput"
            type="text"
            placeholder="Your answer here"
            autofocus
        >

        <button onclick="checkAnswer()">
            SUBMIT
        </button>
    `;


    let answerInput =
        document.getElementById("answerInput");


    // ENTER = SUBMIT
    answerInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                checkAnswer();

            }

        }
    );

}