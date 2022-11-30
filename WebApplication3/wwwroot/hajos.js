async function start() {
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
start();