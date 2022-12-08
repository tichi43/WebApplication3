var hotList = new Array();           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 7; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timeoutHandler;

async function kérdésBetöltés(id, dest) {
    const response = await fetch(`/api/Hajos/questions/${id}`);
    if (!response.ok) {
        console.error(response.status);
        return;
    }
    const kérdés = await response.json();
    if (!kérdés) return;
    currentQuestionID = kérdés.questionId;
    currentCorrectAns = kérdés.correctAnswer;
    console.log(kérdés);

    hotList[dest].question = kérdés;
    hotList[dest].goodAnswerCount = 0;
    if (displayedQuestion == undefined && dest == 0) { //!!!!!!!!!!!!!
        displayedQuestion = 0;
        kérdésMegjelenítés();
    }
    localStorage.setItem("hotList", JSON.stringify(hotList));
    console.log(id + " to " + dest);
}
function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = displayedQuestion + " " +kérdés.question1
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image) {
        document.getElementById("kép1").src = "https://kzgzdiag426.blob.core.windows.net/netcore/" + kérdés.image;
    } else {
        document.getElementById("kép1").src = "";
    }
    const kérdések = document.querySelectorAll('.kerdes');

    kérdések.forEach(item => {
        item.classList.remove('rossz');
        item.classList.remove('jó');
        item.style.pointerEvents = "auto";
    });
    localStorage.setItem("displayedQuestion", displayedQuestion);
}
function init() {
    if (localStorage.getItem("hotList") && localStorage.getItem("nextQuestion") && localStorage.getItem("displayedQuestion")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
        nextQuestion = localStorage.getItem("nextQuestion");
        displayedQuestion = localStorage.getItem("displayedQuestion");
        kérdésMegjelenítés();
    } else {
        for (var i = 0; i < questionsInHotList; i++) {
            let obj = {
                question: {},
                goodAnswerCount: 0
            }
            hotList[i] = obj;
        }

        //Első kérdések letöltése
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
}
function vissza() {
    if (displayedQuestion == 0) {
        displayedQuestion = questionsInHotList - 1;
    } else {
        displayedQuestion--
    }
    kérdésMegjelenítés()
}
function előre() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}
function választás(id) {
    var element = document.getElementById(`válasz${id}`);
    element.style.pointerEvents = "none"
    //element.style.background = '0';

    if (id == hotList[displayedQuestion].question.correctAnswer) {
        element.classList.add("jó");
        timeoutHandler = setTimeout(előre, 1000);
        hotList[displayedQuestion].goodAnswerCount++

        if (hotList[displayedQuestion].goodAnswerCount >= 3) { //hány helyes válasz után engedje tovább
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }

    } else {
        document.getElementById(`válasz${id}`).classList.add("rossz")
        hotList[displayedQuestion].goodAnswerCount = 0;
    }
    //element.style.removeProperty("background");
    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("nextQuestion", nextQuestion);
}
async function elsőHáromBetölt() {
    for (var i = 0; i < questionsInHotList; i++) {
        await kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}
async function reset() {
    nextQuestion = 1;
    displayedQuestion = 0;
    localStorage.clear();
    await elsőHáromBetölt()
    kérdésMegjelenítés();
}

window.onload = function () {
    init();
}