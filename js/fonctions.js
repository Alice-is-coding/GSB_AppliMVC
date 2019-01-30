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
 * @param {String} str value de la liste déroulante lstVisiteurs pour récupérer l'id du visiteur
 * @returns {void}
 */
function selectMoisDispos(vstr) {
    
    //declarations / conversions
    var date = "";
    var div = document.getElementById('lesMois');
    var maListeMois = document.getElementById('lstMois');
    var maListeVisiteurs = document.getElementById('lstVisiteurs');
    var message = document.getElementById('vide');
    
    //si maListeMois contient déjà des mois on les supprime pour faire un refresh
    if(maListeMois.length > 0){
        maListeMois.innerHTML = '';
    }
    
    //si message 'pas de facture pour ce visiteur ce mois' affiché : 
    //on le supprime pour faire un refresh
    if(message != null){
        message.remove();
    }
    
    //on vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('conteneurFraisF') != null) {
        document.getElementById('conteneurFraisF').innerHTML = '';
    }
    
    //on vide le contenu de tbody si déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('tbody') != null) {
        document.getElementById('tbody').innerHTML = '';
    }
    
    //création nouvel objet XMLHttpRequest
    xhr = new XMLHttpRequest();
    //exé d'une fonction au changement d'état de xhr
    xhr.onreadystatechange = function() {
        console.log(this); //pour infos
        
        //si etat == 4 (la réponse du serveur a été reçue dans son intégralité 
        //peut maintenant être traitée).
        //&& statut = 200 (OK) alors
        if (this.readyState == 4 && this.status == 200) {
            //on parse la réponse (format txt) en json pour pouvoir utiliser la 
            //réponse comme un objet json et agir dessus
            var myObj = JSON.parse(this.responseText);
            console.log(myObj); //pour infos

            //si pas de mois pour ce visiteur et visiteur sélectionné :
            // création d'un h5 pour affichage message
            if (myObj.length == 0 && maListeVisiteurs.selectedIndex > 0){
                message = document.createElement('h5');
                message.id = "vide";
                message.textContent = "Pas de facture pour ce visiteur ce mois-ci";
                div.appendChild(message);  
            }else {
                //sinon création des éléments <option> dans la liste lstMois correspondant
                //à tous  les mois dispos pour ce visiteur
                for(var x in myObj){
                    date = myObj[x].numMois +'/'+myObj[x].numAnnee;
                    var option = document.createElement('option');
                    option.value = myObj[x].mois; 
                    option.textContent = date; 
                    //élément lstMois <select> parent de l'élément <option> enfant
                    maListeMois.appendChild(option); 
                }
                //affichage de la page listeFraisForfait à la suite des mois
                $('#lesFraisF').load('vues/v_listeFraisForfait_compta.php');
                //envoie d'une requête ajax par la fonction selectFicheFrais pour récupérer les infos relatives au mois sélectionné par défaut
                selectFicheFraisForfait(maListeMois.options[maListeMois.selectedIndex].value);
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q="+ JSON.stringify(vstr) +"&action=selectionnerMois", true);
    xhr.send();
};

/**
 * Rempli à la volée les frais forfait d'un visiteur pour un mois sélectionné via une requête Ajax
 * @param {String} vstr value du visiteur sélectionné
 * @param {Integer} mstr value du mois sélectionné
 * @returns {void}
 */function selectFicheFraisForfait(mstr) {
    
    //declarations / conversions
    var x = "";
    //nécessité de récupérer à nouveau le visiteur sélectionné au lieu d'utiliser la variable str de la fonction selectMoisDispos(str)
    //car si la fonction selectFicheFraisForfait est appelée par le onchange de lstMois, celle-ci n'envoie que le param du mois sélectionné this.value
    var index = document.getElementById('lstVisiteurs').selectedIndex; //index (int) visiteur sélectionné
    var option = document.getElementById('lstVisiteurs').options; //récupère les éléments <option> de l'élément lstVisiteurs (<select>)
    var optionSelectedValue = option[index].value; //valeur d'attribut value du visiteur sélecctionné
    var xhr = new XMLHttpRequest();
    
    //on vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('conteneurFraisF') != null) {
        document.getElementById('conteneurFraisF').innerHTML = '';
    }

    //actions au changement d'état de xhr
    xhr.onreadystatechange = function(){
        console.log(this); //pour infos
        if(xhr.readyState == 4 && xhr.status == 200) {
            var myObj = JSON.parse(this.responseText); //conversion en json pour manipulation de l'objet json
            console.log(myObj); //pour infos
           
           //actions seulement si myObj > 0
           if (myObj.length != 0) {                      
               //parcours de la liste json pour alimenter v_listeFraisForfait_compta.php
               for(x in myObj){
                   var label = document.createElement('label');
                   var input = document.createElement('input');
                   var div = document.createElement('div');
                   label.for = 'idFrais'; //label rattaché à l'input
                   label.textContent = myObj[x].libelle; //texte du label : libelle du frais forfait (frais km, nuitées...)
                   input.type = 'text'; //type d'input
                   input.id = 'idFrais';
                   input.name = 'lesFrais['+myObj[x].idfrais+']'; //nom unique de l'input
                   input.size = 10;
                   input.maxlength = 5;
                   input.value = myObj[x].quantite; //contenu de l'input : quantite de frais
                   input.className = 'form-control';
                   div.className = "form-group";
                   div.id = 'div['+myObj[x].idfrais+']'; //id unique 
                   document.getElementById('conteneurFraisF').appendChild(div); //<fieldset> de la page v_listeFraisForfait_compta.php
                   document.getElementById('div['+myObj[x].idfrais+']').appendChild(label);
                   document.getElementById('div['+myObj[x].idfrais+']').appendChild(input);
                   //ajout des btn à la fin du formulaire
                   //if(x == myObj.length){
                       var btnCorrect = document.createElement('button');
                       var btnReset = document.createElement('button');
                       btnCorrect.className = "btn btn-success";
                       btnCorrect.type = "submit";
                       btnCorrect.innerHTML = "Corriger";
                       btnReset.className = "btn btn-danger";
                       btnReset.type="reset";
                       btnReset.innerHTML = "Réinitialiser";
                       document.getElementById('conteneurFraisF').appendChild(btnCorrect);
                       document.getElementById('conteneurFraisF').appendChild(btnReset);
                   //}
                }
                //affichage des frais hors forfait
                $('#lesFraisHF').load('vues/v_listeFraisHorsForfait_compta.php');
                //appelle de la fonction qui va se charger de remplir les frais hors forfait
                selectFicheFraisHorsForfait(optionSelectedValue, mstr);
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q="+ JSON.stringify(optionSelectedValue) +"&m="+ JSON.parse(mstr) +"&action=fraisForfait", true);
    xhr.send();
};

/**
 * Rempli à la volée les frais hors forfait pour un visiteur et un mois sélectionné via une requête Ajax
 * @param {String} vstr value du visiteur sélectionné
 * @param {Integer} mstr value du mois sélectionné
 * @returns {void}
 */function selectFicheFraisHorsForfait(vstr, mstr){
    
    //declarations / conversions
    var xhr = new XMLHttpRequest();
        
    //on vide le contenu de tbody si déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('tbody') != null) {
        document.getElementById('tbody').innerHTML = '';
    }
    
    xhr.onreadystatechange = function() {
        console.log(this); //pour infos
        if(xhr.readyState == 4 && xhr.status == 200){
            var myObj = JSON.parse(this.responseText); //conversion de réponse en json pour manipuler celle-ci comme un objet json
            console.log(myObj); //pour infos
            
            //fabrication du tableau des frais hors forfait + remplissage avec leurs valeurs
            for(var x in myObj){
                var tr = document.createElement('tr');
                tr.id = "tr"+myObj[x].id;
                var td1 = document.createElement('td'); //contiendra la date du frais HF
                td1.textContent = myObj[x].date; 
                var td2 = document.createElement('td'); //contiendra le libelle du frais HF
                td2.textContent = myObj[x].libelle;
                var td3 = document.createElement('td'); //contiendra le montant du frais HF
                td3.textContent = myObj[x].montant;
                var td4 = document.createElement('td'); //contiendra le anchor element <a> pour supprimer le frais HF
                td4.id = "btn"+myObj[x].id;
                var a = document.createElement('a'); //contiendra le bouton pour supprimer le frais HF
                a.href = "index.php?uc=gererFrais&action=supprimerFrais&idFrais="+myObj[x].id;
                a.onclick = "return confirm('Voulez-vous vraiment supprimer ce frais?');";
                a.textContent = "Supprimer ce frais";
                //création du tableau 
                document.getElementById('tbody').appendChild(tr);
                document.getElementById('tr'+myObj[x].id).appendChild(td1);
                document.getElementById('tr'+myObj[x].id).appendChild(td2);
                document.getElementById('tr'+myObj[x].id).appendChild(td3);
                document.getElementById('tr'+myObj[x].id).appendChild(td4);
                document.getElementById('btn'+myObj[x].id).appendChild(a);
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q="+ JSON.stringify(vstr) +"&m="+ JSON.parse(mstr) +"&action=fraisHorsForfait", true);
    xhr.send();
}

