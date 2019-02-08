/* 
 * Gestion des visiteurs
 * 
 * @category PPE
 * @package GSB
 * @author Alice B. 
 * 
 */

/**
 * fait un reset de la page comme si elle était rechargée
 * @returns {void}
 */
function resetValiderFicheFrais() {
  
    //si message 'pas de facture pour ce visiteur ce mois' affiché : 
    //on le supprime pour faire un refresh
    if(document.getElementById('vide') != null){
        document.getElementById('vide').remove();
    }   
    //on vide le contenu d'erreur s'il y en avait une
    if (document.getElementById('erreurF') != null) {
        document.getElementById('erreurF').innerHTML = '';
    }
    //on vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('lesFraisF') != null) {
        document.getElementById('lesFraisF').innerHTML = '';
    }
    //on vide le contenu de tbody si déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('lesFraisHF') != null) {
        document.getElementById('lesFraisHF').innerHTML = '';
    }
    //on vide le contenu des justificatifs
    if(document.getElementById('justificatifs') != null) {
        document.getElementById('justificatifs').innerHTML = '';
    }
    //hidden du button validerFicheFrais
    document.getElementById('validerFicheFrais').setAttribute('style', 'display: none');
}

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
    
    //remise à zéro de la page
    resetValiderFicheFrais();
    //si maListeMois contient déjà des mois on les supprime pour faire un refresh
    if(document.getElementById('lstMois').length > 0){
        document.getElementById('lstMois').innerHTML = '';
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
                //hidden du button validerFicheFrais
                document.getElementById('validerFicheFrais').setAttribute('style', 'display: none');
            }else if(myObj.length != 0 && maListeVisiteurs.selectedIndex > 0) {
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
                //affichage du button validerFicheFrais
                document.getElementById('validerFicheFrais').setAttribute('style', 'display: contents');
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
 * @param {Integer} mstr value du mois sélectionné
 * @returns {void}
 */function selectFicheFraisForfait(mstr) {
    
    //declarations / conversions
    //nécessité de récupérer à nouveau le visiteur sélectionné au lieu d'utiliser la variable str de la fonction selectMoisDispos(str)
    //car si la fonction selectFicheFraisForfait est appelée par le onchange de lstMois, celle-ci n'envoie que le param du mois sélectionné this.value
    var visiteurSelected = getOptionSelected('lstVisiteurs'); //attribut value du visiteur actuellement sélectionné
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
               for(var x in myObj){
                   var label = document.createElement('label');
                   var input = document.createElement('input');
                   var div = document.createElement('div');
                   label.for = 'idFrais'; //label rattaché à l'input
                   label.textContent = myObj[x].libelle; //texte du label : libelle du frais forfait (frais km, nuitées...)
                   input.type = 'text'; //type d'input
                   input.id =  myObj[x].idfrais;
                   input.name = 'lesFrais['+ myObj[x].idfrais +']';
                   input.size = 10;
                   input.maxlength = 5;
                   input.setAttribute("value", ""+myObj[x].quantite+"");
                   //input.value = myObj[x].quantite; //contenu de l'input : quantite de frais
                   input.className = 'form-control lesFraisF';
                   div.className = "form-group";
                   div.id = 'div['+myObj[x].idfrais+']'; //id unique 
                   document.getElementById('conteneurFraisF').appendChild(div); //<fieldset> de la page v_listeFraisForfait_compta.php
                   document.getElementById('div['+myObj[x].idfrais+']').appendChild(label);
                   document.getElementById('div['+myObj[x].idfrais+']').appendChild(input);
                   //ajout des btn à la fin du formulaire
                   if(x == myObj.length-1){
                       var btnCorrect = document.createElement('button');
                       var btnReset = document.createElement('button');
                       btnCorrect.className = "btn btn-success";
                       btnCorrect.type = "submit";
                       btnCorrect.innerHTML = "Corriger";
                       btnCorrect.setAttribute("onclick", "setModifs('lesFraisF', 'validerMajFraisForfait')");
                       btnReset.className = "btn btn-primary";
                       btnReset.type="reset";
                       btnReset.innerHTML = "Réinitialiser";
                       btnReset.setAttribute("onclick", "selectFicheFraisForfait("+mstr+")");
                       document.getElementById('conteneurFraisF').appendChild(btnCorrect);
                       document.getElementById('conteneurFraisF').appendChild(btnReset);
                   }
                }
                //affichage des frais hors forfait
                $('#lesFraisHF').load('vues/v_listeFraisHorsForfait_compta.php');
                //appelle de la fonction qui va se charger de remplir les frais hors forfait
                selectFicheFraisHorsForfait(visiteurSelected, mstr);
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q="+ JSON.stringify(visiteurSelected) +"&m="+ JSON.parse(mstr) +"&action=fraisForfait", true);
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
    if (document.getElementById('justificatifs') != null) {
        document.getElementById('justificatifs').innerHTML = '';
    }
    
    xhr.onreadystatechange = function() {
        console.log(this); //pour infos
        if(xhr.readyState == 4 && xhr.status == 200){
            var myObj = JSON.parse(this.responseText); //conversion de réponse en json pour manipuler celle-ci comme un objet json
            console.log(myObj); //pour infos
            
            //fabrication du tableau des frais hors forfait + remplissage avec leurs valeurs
            if(myObj.length != 0){
                for(var x in myObj){
                    var tr = document.createElement('tr');
                    tr.id = "tr"+myObj[x].id;
                    var td1 = document.createElement('td');
                    var input1 = document.createElement('input'); //contiendra la date du frais HF
                    td1.id = "td1"+myObj[x].id;
                    td1.className = "panel panel-secondary";
                    input1.className = myObj[x].id+"row";
                    input1.id = 'date';
                    input1.type = "text";
                    input1.value = myObj[x].date;
                    var td2 = document.createElement('td');
                    var input2 = document.createElement('input'); //contiendra le libelle du frais HF
                    td2.id = "td2"+myObj[x].id;
                    td2.className = "panel panel-secondary";
                    input2.className = myObj[x].id+"row";
                    input2.id = 'libelle';
                    input2.type = "text";
                    input2.size = 30;
                    input2.value = myObj[x].libelle;
                    var td3 = document.createElement('td');
                    var input3 = document.createElement('input'); //contiendra le montant du frais HF
                    td3.id = "td3"+myObj[x].id;
                    td3.className = "panel panel-secondary";
                    input3.className = myObj[x].id+"row";
                    input3.id = 'montant';
                    input3.type = "text";
                    input3.value = myObj[x].montant;
                    var td4 = document.createElement('td'); //contiendra les btn corriger et réinitialiser
                    var btnCorrect = document.createElement('button'); //bouton corriger du frais HF
                    var btnReset = document.createElement('button'); //bouton reset du frais HF
                    var btnReport = document.createElement('button'); //bouton report de frais HF
                    var btnRefus = document.createElement('button'); //bouton refus de frais HF
                    td4.id = "btn"+myObj[x].id;
                    td4.className = "panel panel-secondary";       
                    btnCorrect.className = "btn btn-success lesFraisHF";
                    btnCorrect.type = "submit";
                    btnCorrect.setAttribute('onclick', 'setModifs("'+myObj[x].id+'row", "validerMajFraisHorsForfait")');
                    btnCorrect.innerHTML = "Corriger";
                    btnReset.className = "btn btn-primary";
                    btnReset.type = "reset";
                    btnReset.setAttribute("onclick", "selectFicheFraisHorsForfait('"+vstr+"', "+mstr+")");
                    btnReset.innerHTML = "Réinitialiser";  
                    btnReport.className = "btn btn-warning";
                    btnReport.type = "button";
                    btnReport.innerHTML = "Reporter";  
                    btnReport.setAttribute("onclick", 'reporterFraisHorsForfait("'+myObj[x].id+'row")');
                    btnRefus.className = "btn btn-danger";
                    btnRefus.id = "btnRefus"+myObj[x].id+"row";
                    btnRefus.type = "button";
                    btnRefus.innerHTML = "Refuser";  
                    btnRefus.setAttribute("onclick", 'refuserFraisHorsForfait("'+myObj[x].id+'row")');
                    
                    //création du tableau 
                    document.getElementById('tbody').appendChild(tr);
                    document.getElementById('tr'+myObj[x].id).appendChild(td1);
                    document.getElementById('td1'+myObj[x].id).appendChild(input1);
                    document.getElementById('tr'+myObj[x].id).appendChild(td2);
                    document.getElementById('td2'+myObj[x].id).appendChild(input2);
                    document.getElementById('tr'+myObj[x].id).appendChild(td3);
                    document.getElementById('td3'+myObj[x].id).appendChild(input3);
                    document.getElementById('tr'+myObj[x].id).appendChild(td4);
                    document.getElementById('btn'+myObj[x].id).appendChild(btnCorrect);
                    document.getElementById('btn'+myObj[x].id).appendChild(btnReport);
                    document.getElementById('btn'+myObj[x].id).appendChild(btnReset);
                    document.getElementById('btn'+myObj[x].id).appendChild(btnRefus);
                }
                //appelle de la fonction selectJustificatifs pour visualiser le nombre de justificatifs déjà recus pour ce visiteur 
                selectJustificatifs(vstr, mstr);
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q="+ JSON.stringify(vstr) +"&m="+ JSON.parse(mstr) +"&action=fraisHorsForfait", true);
    xhr.send();
}

/**
 * récupère les justificatifs + crée les éléments nécessaires pour l'affichage DOM
 * @param {String} vstr idvisiteur
 * @param {String} mstr mois
 * @returns {void}
 */
function selectJustificatifs(vstr, mstr){
    //déclarations
    var xhr = new XMLHttpRequest();
    
    //on vide le contenu des justificatifs comme un refresh
    if (document.getElementById('conteneurJustificatifs')!= null) {
        document.getElementById('conteneurJustificatifs').innerHTML = "";
    }
    xhr.onreadystatechange = function() {
        console.log(this);
        
        if(xhr.readyState == 4 && xhr.status == 200) {
            var myObj = JSON.parse(this.responseText);
            
            if (myObj.length != 0) {
                var fieldset = document.createElement('fieldset');
                var div = document.createElement('div');
                var label = document.createElement('label');
                var input = document.createElement('input');
                var btnCorrect = document.createElement('button');
                var btnReset = document.createElement('button');
                fieldset.id = "conteneurJustificatifs";
                div.id = 'divJ';
                label.for = 'leNb';
                label.textContent = "Nombre de justificatifs";
                input.type = "text";
                input.id = 'leNb';
                input.size = 3;
                input.maxlength = 5;
                input.value = myObj;
                input.className = "form-control";     
                btnCorrect.className = "btn btn-success";
                btnCorrect.type = "submit";
                btnCorrect.innerHTML = "Valider";
                btnCorrect.setAttribute("onclick", "setModifs('justificatifs', 'validerMajJustificatifs')");
                btnReset.className = "btn btn-primary";
                btnReset.type="reset";
                btnReset.innerHTML = "Réinitialiser";
                btnReset.setAttribute("onclick", "selectJustificatifs('"+vstr+"', "+mstr+")");
                document.getElementById('justificatifs').appendChild(fieldset);
                document.getElementById('conteneurJustificatifs').appendChild(div);
                document.getElementById('divJ').appendChild(label);
                document.getElementById('divJ').appendChild(input);
                document.getElementById('conteneurJustificatifs').appendChild(btnCorrect);
                document.getElementById('conteneurJustificatifs').appendChild(btnReset);
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q="+ JSON.stringify(vstr) +"&m="+ JSON.parse(mstr) +"&action=justificatifs", true);
    xhr.send();
}

/**
 * Renvoie la valeur de l'élément < option > actuellement sélectionné
 * @param {String} attribut id de l'élément < select > parent 
 * @returns {.document@call;getElementById.options.value} la valeur de l'option sélectionné
 */
function getOptionSelected(attrId) {
    //declarations
    var index = document.getElementById(''+attrId+'').selectedIndex; //index (int) visiteur sélectionné
    var options = document.getElementById(''+attrId+'').options; //récupère les éléments <option> de l'élément lstVisiteurs (<select>)
    var optionSelected = options[index].value; //valeur d'attribut value du visiteur sélecctionné
    
    return optionSelected;
}

/**
 * Rempli une liste clé : valeur des frais forfait ou hors forfait selon className
 * @param {String} className attribut classe pour lequel il faut récupérer les frais (F ou HF)
 * @returns {arrayList}
 */
function getLstFrais(className){
    //declarations
    var tabFrais = {};
    var lesFrais = Object.values(window.document.getElementsByClassName(''+className+'')); //récupère les input de classe (ex.: .lesFraisF)
    var y = "";
    var x = 0;
    
    //rempli tabFrais : {idFrais : qteFrais}
    $('.'+className+'').each(function(){
       y = $(this).attr('id');
       tabFrais[y] = lesFrais[x].value;
       x++;
    });
    
    return tabFrais;
}

/**
 * Effectue les modifications en fonction de la classe et de l'action demandée
 * @returns {void}
 */
function setModifs(className, action) {
    
    //demande de confirmation à l'utilisateur avant exécution des modifications 
    if (confirm('Voulez-vous vraiment effectuer ces modifications?')) {
        //declarations
        var visiteurSelected = getOptionSelected('lstVisiteurs'); //attribut value du visiteur sélectionné
        var moisSelected = getOptionSelected('lstMois'); //attribut value du mois sélectionné
        var lesFrais = getLstFrais(className);
        var xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function() {
            console.log(this); //pour infos
            if (xhr.readyState == 4 && xhr.status == 200) {
                var myObj = JSON.parse(this.responseText);
                console.log(myObj); //pour infos
                if(myObj != null && (typeof myObj != "string" | myObj === 'Refus OK.' | myObj === 'Report OK.')) {;
                    alert('La modification a bien été prise en compte.');
                    return myObj;
                }else if (typeof myObj === "string"){
                    //creation des éléments pour l'affichage d'erreur
                    var div = document.createElement('div');
                    div.id = "erreur"; //id qui contiendra le < p > erreur
                    div.className = "alert alert-danger";
                    div.setAttribute("role", "alert");
                    //affichage placé différemment selon si l'erreur vient de modif fraisF, fraisHF ou nbJustificatifs
                    if(className === 'lesFraisF'){
                        document.getElementById('divFraisF').insertBefore(div, document.getElementById('conteneurFraisF')); //sera placé après h3 éléments forfaitisés
                        document.getElementById('conteneurFraisF').innerHTML = ""; //rechargement des frais forfait à la manière d'un refresh de page
                        //$('#erreur').load('../v_erreurs.php'); //chargement de la page v_erreurs.php dans div fraîchement créee
                        var p = document.createElement('p'); //contiendra le libelle d'erreur
                        p.innerHTML = myObj;
                        document.getElementById('erreur').appendChild(p); 
                        selectFicheFraisForfait(moisSelected); //permet de garder visiteur et mois selected (ne serait pas le cas avec location.reload()
                        
                    }else if(className === 'justificatifs'){
                        document.getElementById('justificatifs').insertBefore(div, document.getElementById('conteneurJustificatifs')); //sera placé dans la div des justificatifs comme 1er enfant
                        document.getElementById('conteneurJustificatifs').innerHTML = ""; //rechargement des justificatifs à la manière d'un refresh 
                        var p = document.createElement('p'); //contiendra le libelle d'erreur
                        p.innerHTML = myObj;
                        document.getElementById('erreur').appendChild(p);
                        selectJustificatifs(visiteurSelected, moisSelected); //recharge seulement ce qui est nécessaire
                    }else {
                        document.getElementById('conteneurFraisHF').insertBefore(div, document.getElementById('tabFraisHF')); //sera placé avant le tableau des frais HF
                        document.getElementById('tbody').innerHTML = ""; //on vide le contenu du tableau pour faire un refresh
                        var p = document.createElement('p'); //contiendra le libelle d'erreur
                        p.innerHTML = myObj;
                        document.getElementById('erreur').appendChild(p);
                        selectFicheFraisHorsForfait(visiteurSelected, moisSelected);
                    }
                    setTimeout(function(){document.getElementById('erreur').remove();}, 5000); //supprime l'erreur de la page après 5sec
                    //pas le choix de faire comme ça car sinon impossibilité de le supprimer car si suppr au moment d'affichage de frais f lors d'un 
                    //changement de mois, ce sera correct mais alors lors du refresh par appel de la fonction fraisf ci-dessus, l'erreur serait supprimée également  
                    return null;
                }
            }
        };
        
        if(className === 'lesFraisF'){
            xhr.open("POST", "controleurs/c_validerFrais.php?q="+ JSON.stringify(visiteurSelected) +"&m="+ JSON.parse(moisSelected) +"&lesFrais="+ JSON.stringify(lesFrais) +"&action="+action+"", true);
        }else if(className === 'justificatifs') {  
            xhr.open("POST", "controleurs/c_validerFrais.php?q="+ JSON.stringify(visiteurSelected) +"&m="+ JSON.parse(moisSelected) +"&j="+ JSON.stringify(document.getElementById('leNb').value) +"&action="+action+"", true);
        }else {
            if (action == "validerMajFraisHorsForfait"){
                xhr.open("POST", "controleurs/c_validerFrais.php?lesFrais="+ JSON.stringify(lesFrais) +"&ligne="+JSON.parse(parseInt(className))+"&action="+action+"", true);
            } else if (action == "refuserFraisHorsForfait"){
                xhr.open("POST", "controleurs/c_validerFrais.php?ligne="+JSON.parse(parseInt(className))+"&action="+action+"", true);
            } else {
                xhr.open("POST", "controleurs/c_validerFrais.php?q="+ JSON.stringify(visiteurSelected) +"&m="+ JSON.parse(moisSelected) +"&ligne="+JSON.parse(parseInt(className))+"&action="+action+"", true);
            }
        }
        xhr.send();
    }  
}

/**
 * ajoute mention [REFUSE] devant le libelle de frais HF + recharge les frais HF
 * pour affichage de cette mention instantanément
 * @param {String} className l'attribut classe du frais HF (permet de récup. ts 
 *                           les inputs relatifs à ce frais HF
 * @returns {void}
 */
function refuserFraisHorsForfait(className) {
    
    //declarations
    var idVisiteur = getOptionSelected('lstVisiteurs');
    var mois = getOptionSelected('lstMois'); 
    
    //appel de la fonction qui va procéder aux modifications du label 
    setModifs(className, "refuserFraisHorsForfait");
    //réaffichage des frais hors forfait
    selectFicheFraisHorsForfait(idVisiteur, mois);
}

/**
 * Reporte un frais hors forfait :
 * appelle de la fonction setModifs qui envoie la requête AJAX
 * refresh les frais hors forfait
 * @param {String} className
 * @returns {void}
 */
function reporterFraisHorsForfait(className) {
    
    //declarations
    var idVisiteur = getOptionSelected('lstVisiteurs');
    var mois = getOptionSelected('lstMois');
    
    //appel de la fonction qui va procéder au report du frais HF au mois suivant par une requête update
    var reportOk = setModifs(className, "reporterFraisHorsForfait");
    //refresh des frais hors forfait si report OK
    if (reportOk !== null){
        selectFicheFraisHorsForfait(idVisiteur, mois);
    }    
}

/**
 * valide une fiche de frais après confirmation de l'utilisateur
 * envoie d'une requête HTTP avec AJAX pour modifier l'état de la fiche 
 * du visiteur concerné pour le mois concerné et met à jours la date de modif. 
 * de la fiche.
 * Puis fait un refresh de la page avec l'appelle de selectMoisDispos afin de ne
 * resélectionner que les mois dont l'état est à 'CL'
 * @returns {void}
 */
function validerFicheFrais() {
    
    if (confirm('Voulez-vous vraiment valider la fiche de frais ?')) {
        var idVisiteur = getOptionSelected('lstVisiteurs');
        var moisSelected = getOptionSelected('lstMois');
        var xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function(){
            console.log(this); //pour infos
            if(xhr.readyState === 4 && xhr.status === 200) {
                var myObj = JSON.parse(this.responseText);
                console.log(myObj); //pour infos
                if(myObj === 'Validation OK.') {
                    selectMoisDispos(idVisiteur);
                }else {
                    console.log('Une erreur est survenue..');
                }
            }
        };
        xhr.open("POST", "controleurs/c_validerFrais.php?q="+ JSON.stringify(idVisiteur) +"&m="+ JSON.parse(moisSelected) +"&action=validerFicheFrais");
        xhr.send();
    }    
}