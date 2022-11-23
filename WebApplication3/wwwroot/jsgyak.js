window.onload = function () {

    function factorialize(num) {
        if (num < 0)
            return -1;
        else if (num == 0)
            return 1;
        else {
            return (num * factorialize(num - 1));
        }
    }
    console.log(factorialize(3));

   // document.getElementById("container").style.width = 10 * 30;

    for (var sor = 0; sor < 10; sor++) {
        var újsor = document.createElement("div");
        újsor.classList.add("sor");
        document.getElementById("container").appendChild(újsor);
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var újelem = document.createElement("div");
            újelem.classList.add("elem");
            let szám = factorialize(sor) / (factorialize(oszlop) * factorialize(sor - oszlop));
            újelem.innerHTML = szám;
            újelem.style.backgroundColor = `rgba(${szám},${155-szám},${60-szám})`
            újsor.appendChild(újelem);
        }
    }


}