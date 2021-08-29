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
        var i = 0
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
            //On décide de n'afficher que les 4 premières informations de l'entrepries
            if(i > 3){
                row.hidden = true;
            }
            tableauBody.appendChild(row);
            i++;            
        }

        //On affiche le tableau
        tableau.appendChild(tableauBody)
        DivResult.appendChild(tableau)

        //Création du bouton permettant d'afficher les informations cachées
        var display_button = document.createElement("button");
        display_button.setAttribute("id","disp");
        display_button.textContent = "Plus d'informations";
        DivResult.appendChild(display_button);

        //Fonctionnement du bouton 
        var etatBtn = true;
        document.getElementById("disp").onclick = function(){
            if (etatBtn == true){
                tableauBody.querySelectorAll("tr").forEach(function(InvisibleRow){
                    InvisibleRow.hidden = false;
                })
                display_button.textContent = "Moins d'informations";
                etatBtn = false;
            } else {
                lenTab = tableauBody.querySelectorAll("tr").length;
                for (var j = 4; j < lenTab; j++){
                    tableauBody.querySelectorAll("tr")[j].hidden = true;
                }
                display_button.textContent = "Plus d'informations";
                etatBtn = true;
            }
        }
    }
}