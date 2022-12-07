/*async function start() {
    const response = await fetch("/api/Hajos/questions/all");
    const data = await response.json();
    kiíratás(data);
}

function kiíratás(kérdések) {
    console.log(kérdések);
    kérdések.forEach(function (item) {
        let újelem = document.createElement("div");
        újelem.innerHTML = (item);
        document.getElementById("eredmeny").appendChild(újelem);
    });
}


start();*/


let currentQuestionID;
let currentCorrectAns;

async function kérdésBetöltés(id) {
    const response = await fetch(`/api/Hajos/questions/${id}`);
    if (!response.ok) {
        console.error(response.status);
        return;
    }
    const kérdés = await response.json();
    currentQuestionID = kérdés.questionId;
    currentCorrectAns = kérdés.correctAnswer;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.question1
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image == "") {
        document.getElementById("kép1").src = "";
        return;
    }
    document.getElementById("kép1").src = "https://kzgzdiag426.blob.core.windows.net/netcore/" + kérdés.image;
}

function vissza() {
    kérdésBetöltés(currentQuestionID - 1);
}
function előre() {
    kérdésBetöltés(currentQuestionID + 1);
}
function választás(id) {
    if (id == currentCorrectAns) {
        document.getElementById(`válasz${id}`).classList.add("jó")
    } else {
        document.getElementById(`válasz${id}`).classList.add("rossz")
    }
}
window.onload = function () {
    kérdésBetöltés(5)
}