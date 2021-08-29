function Search() {
    //Récupération des éléments de l'index
    var siret = document.getElementById('SIRET').value;
    var DivResult = document.getElementById('Result');

    DivResult.innerHTML = siret;
}