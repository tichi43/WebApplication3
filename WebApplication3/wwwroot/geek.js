var viccek;


function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    viccek = d;

    for (var i = 0; i < d.length; i++) {
        //console.log(d[i].question);
        let elem = document.createElement("li")
        elem.innerHTML = d[i].text;
        document.getElementById("ide").appendChild(elem);
    }

}

window.onload = function () {
    fetch('/jokes.json')
    .then(response => response.json())
    .then(data => letöltésBefejeződött(data)
);


};