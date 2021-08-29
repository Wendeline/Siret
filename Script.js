function Search() {
    //Récupération des éléments de l'index
    var siret = document.getElementById('SIRET').value;
    var DivResult = document.getElementById('Result');

    //Connexion à l'API
    var requestURL = "https://entreprise.data.gouv.fr/api/sirene/v1/siret/"+siret;
    var request = new XMLHttpRequest();
    request.open('GET',requestURL);
    request.responseType = 'json';
    request.send();

    //Traitement des données de l'API
    request.onloadend = function(){

        DivResult.innerHTML = ""; //On vide la div Result

        //On affiche la dénomination de l'entreprise
        var denomination = document.createElement('h2');
        denomination.textContent = request.response.etablissement['nom_raison_sociale'];
        DivResult.appendChild(denomination);

        //On crée le tableau dans lequel il y aura les données de l'entreprise
        var tableau = document.createElement("table");
        tableau.setAttribute("class","table table-striped");
        var tableauBody = document.createElement("tbody");

        //Traitement des données dans le tableau 
        for (const key in request.response.etablissement){
            var row = document.createElement("tr");
            var id_cell = document.createElement("td");
            var id_text = document.createTextNode(key);
            id_cell.appendChild(id_text);
            row.appendChild(id_cell);
            var content_cell = document.createElement("td");
            var content_text = document.createTextNode(request.response.etablissement[key]);
            content_cell.appendChild(content_text);
            row.appendChild(content_cell);

            tableauBody.appendChild(row);

            
        }

        //On affiche le tableau
        tableau.appendChild(tableauBody)
        DivResult.appendChild(tableau)
    }
}