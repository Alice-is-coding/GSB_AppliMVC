/* 
 * Gestion des visiteurs
 * 
 * @category PPE
 * @package GSB
 * @author Alice B. 
 * 
 */


/**
 * sélection dynamique des mois disponibles pour un visiteur par une procédure Ajax
 * @param {type} str value de la liste déroulante lstVisiteurs pour récupérer l'id du visiteur
 * @returns {undefined}
 */
function selectMoisDispos(str) {
    
    //declarations
    var date, x = "";
    var div = document.getElementById('lesMois');
    var maListeMois = document.getElementById('lstMois');
    str = JSON.stringify(str); //conversion val js en val json
    
    //si maListeMois contient déjà des mois on les supprime pour faire un refresh
    if(maListeMois.length > 0){
        for (var j = 0; j <= maListeMois.length; j++){
            maListeMois.remove(maListeMois[j]);
        }
    }
    //si message 'pas de facture pour ce visiteur ce mois' affiché : 
    //on le supprime pour faire un refresh
    if(document.getElementById('vide') != null){
        document.getElementById('vide').remove();
    }
    
    //création nouvel objet XMLHttpRequest
    xhr = new XMLHttpRequest();
    //exé d'une fonction au changement d'état de xhr
    xhr.onreadystatechange = function() {
        console.log(this);
        //si etat = la réponse du serveur a été reçue dans son intégralité 
        //peut maintenant être traitée.
        //&& statut = OK alors
        if (this.readyState == 4 && this.status == 200) {
            //on parse la réponse (format txt) en json pour pouvoir utiliser la 
            //réponse comme un objet json et agir dessus
            var myObj = JSON.parse(this.responseText);
            console.log(myObj);

            //si pas de mois pour ce visiteur et visiteur sélectionné :
            // création d'un h5 pour affichage message
            if (myObj.length == 0 && document.getElementById('lstVisiteurs').selectedIndex > 0){
                var message = document.createElement('h5');
                message.id = "vide";
                message.textContent = "Pas de facture pour ce visiteur ce mois-ci";
                div.appendChild(message);  
            //sinon création des éléments <option> dans la liste lstMois correspondant
            //à tous  les mois dispos pour ce visiteur
            }else {
                for(x in myObj){
                    date = myObj[x].numMois +'/'+myObj[x].numAnnee;
                    var option = document.createElement('option');
                    option.value = myObj[x].mois; 
                    option.textContent = date; 
                    //on admet lstMois <select> comme parent de l'élément <option> enfant
                    maListeMois.appendChild(option); 
                }
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q=" + str + "&action=selectionnerMois", true);
    xhr.send();
};

function selectFicheFrais(str) {
    //declarations
    str = JSON.parse(str);
    var index = document.getElementById('lstVisiteurs').selectedIndex;
    var option = document.getElementById('lstVisiteurs').options;
    var optionSelectedValue = JSON.parse(option[index].value);
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj);
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q="+ str +"&m="+optionSelectedValue+"&action=validationFrais");
    xhr.send();
};

