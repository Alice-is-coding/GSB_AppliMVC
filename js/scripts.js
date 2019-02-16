/* 
 * Gestion des visiteurs
 * 
 * @category PPE
 * @package GSB
 * @author Alice B. 
 * 
 */

/**
 * Vide la liste des mois disponibles si elle possède effectivement des mois
 * 
 * @returns {void}
 */
function resetLstMois() {
    if (document.getElementById('lstMois').length > 0) {
        document.getElementById('lstMois').innerHTML = '';
    }
}

function supprMessageNonFiche() {
    //si message 'pas de facture pour ce visiteur ce mois' affiché : 
    //on le supprime pour faire un refresh
    if (document.getElementById('vide') !== null) {
        document.getElementById('vide').remove();
    }
}
/**
 * Reset de la page relative à l'onglet 'Valider les fiches de frais' comme si elle était rechargée
 * 
 * @returns {void}
 */
function resetValiderFicheFrais() {

    //si message 'pas de facture pour ce visiteur ce mois' affiché : 
    //on le supprime pour faire un refresh
    supprMessageNonFiche();
    //on vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('lesFraisF') !== null) {
        document.getElementById('lesFraisF').innerHTML = '';
    }
    //on vide le contenu de tbody si déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('lesFraisHF') !== null) {
        document.getElementById('lesFraisHF').innerHTML = '';
    }
    //on vide le contenu des justificatifs
    if (document.getElementById('justificatifs') !== null) {
        document.getElementById('justificatifs').innerHTML = '';
    }
}

/**
 * Remise à zéro de la partie justificatifs
 * Onglet 'valider les fiches de frais' ou 'suivre le paiement des fiches de frais'
 * 
 * @returns {void}
 */
function resetJustificatifs() {
    var etatSelected = getOptionSelected('lstEtats');
    //si onglet "valider les fiches de frais
    if (etatSelected === null) {
        //on vide le contenu des justificatifs comme un refresh
        if (document.getElementById('conteneurJustificatifs') !== null) {
            document.getElementById('conteneurJustificatifs').innerHTML = "";
        }
    } else {
        //onglet "suivre le paiement des fiches de frais
        //refresh des justificatifs
        if (document.getElementById('descriptifFraisHF').innerHTML !== null) {
            document.getElementById('descriptifFraisHF').innerHTML = "";
        }
    }
}

/**
 * Remise à zéro de la partie frais HF 
 * Onglet "valider les fiches de frais"
 * 
 * @returns {void}
 */
function resetFraisHF_validerFrais() {

    //on vide le contenu de tbody si déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('tbody') !== null) {
        document.getElementById('tbody').innerHTML = '';
    }
    //on vide le contenu de justificatifs (les nb justificatifs reçus)
    if (document.getElementById('justificatifs') !== null) {
        document.getElementById('justificatifs').innerHTML = '';
    }
}

/**
 * Vide le contenu du fieldset id="conteneurFraisF" pour simuler un submit de formulaire
 * Onglet "valider les fiches de frais"
 * 
 * @returns {void}
 */
function videFieldsetFraisF() {
    //on vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire
    if (document.getElementById('conteneurFraisF') !== null) {
        document.getElementById('conteneurFraisF').innerHTML = '';
    }
}

/**
 * remise à niveau de la partie frais HF de l'onglet "suivre le paiement des fiches de frais"
 * 
 * @returns {void}
 */
function resetFraisHF_suiviFrais() {
    if (document.getElementById('descriptifFraisHF').innerHTML !== null) {
        document.getElementById('descriptifFraisHF').innerHTML = "Descriptif des éléments hors forfait - justificatif(s) reçu(s)";
    }

    if (document.getElementById('tbodySuiviFraisHF').innerHTML !== "") {
        document.getElementById('tbodySuiviFraisHF').innerHTML = "";
        createTabFraisHF_suiviFrais();
    }
}

/**
 * Reset de la page relative à l'onglet 'Suivre le paiement des fiches de frais' comme si elle était rechargée
 * 
 * @returns {void}
 */
function resetSuiviPaiementFrais() {
    //on vide le la div qui coniend la vue v_etatFrais_compta.php
    if (document.getElementById('etatFrais') !== null) {
        document.getElementById('etatFrais').remove();
    }
    //si message 'pas de facture pour ce visiteur ce mois' affiché : 
    //on le supprime pour faire un refresh
    supprMessageNonFiche();
}

/**
 * Remise à zéro de l'entête récapitulative des infos de la fiche de frais (table fichefrais dans phpMyAdmin)
 * Onglet "suivre le paiement des fiches de frais"
 * 
 * @returns {void}
 */
function resetEnteteInfosFicheFrait() {

    //si la date est remplie
    if (document.getElementById('dateFicheFrais').innerHTML !== "") {
        document.getElementById('dateFicheFrais').innerHTML = "Fiche de frais du mois "; //on la vide + on remet le libelle par défaut
    }
    //si le libelle de l'état est informé
    if (document.getElementById('etat').innerHTML !== "") {
        document.getElementById('etat').innerHTML = ""; //on le vide
        var u = document.createElement('u'); //recréation de l'élément d'annotation non textuelle u
        u.innerHTML = "Etat : "; //on fixe son libelle par défaut
        document.getElementById('etat').appendChild(u);
    }
    //si la partie "montant validé" est informée
    if (document.getElementById('montantValide').innerHTML !== "") {
        document.getElementById('montantValide').innerHTML = ""; //on supprime l'information
        var u = document.createElement('u'); //recréation de l'élément d'annotation non textuelle u
        u.innerHTML = "Montant validé : "; //libelle par défaut de u
        document.getElementById('montantValide').appendChild(u);
    }
}

/**
 * Remise à zéro de la partie frais forfait de la vue v_etaFrais_compta.php
 * Onglet "suivre le paiement des fiches de frais" 
 *
 * @returns {void}
 */
function resetTabRecapFraisForfait() {

    if (document.getElementById('trLibSuiviFraisF').innerHTML !== "") {
        document.getElementById('trLibSuiviFraisF').innerHTML = "";
    }
    if (document.getElementById('trQteFraisF').innerHTML !== "") {
        document.getElementById('trQteFraisF').innerHTML = "";
    }
}

/**
 * Reinitialise la page :
 * aucun item sélectionné dans la liste des visiteurs
 * aucun item sélectionné dans la liste des etats
 * plus aucun mois dans la liste des mois
 * plus rien n'est affiché sur la page à part les listes déroulants et les boutons valider réinitialiser
 * comme un refresh de page
 * 
 * @returns {void}
 */
function reinitialiser() {
    document.getElementById('lstVisiteurs').selectedIndex = 0;
    document.getElementById('lstEtats').selectedIndex = 0;
    document.getElementById('lstMois').innerHTML = "";
    resetValiderFicheFrais();
}

/**
 * Cache le bouton de validation
 * 
 * @returns {void}
 */
function hidingBtnValidation() {
    //hidden du button de validation
    document.getElementById('validation').setAttribute('style', 'display: none');
}

/**
 * Sélection dynamique des mois disponibles pour un visiteur par une procédure Ajax +
 * Alimentation de la liste à la volée +
 * Appel selectFicheFraisForfait pour affichage de la fiche du mois sélectionné par défaut
 *
 * @returns {void}
 */
function selectMoisDispos() {

    //declarations / conversions
    var estOngletSuiviPaiementFrais = false;
    var maListeMois = document.getElementById('lstMois');
    var maListeVisiteurs = document.getElementById('lstVisiteurs');
    var visiteurSelected = getOptionSelected('lstVisiteurs');
    //création nouvel objet XMLHttpRequest
    xhr = new XMLHttpRequest();

    //si on est dans l'onglet suivi paiement des fiches de frais
    if (document.getElementById('lstEtats') !== null) {
        resetSuiviPaiementFrais(); //reset de la page relative à suivi paiement des frais
        estOngletSuiviPaiementFrais = true;
    } else {
        //remise à zéro de la page relative à valider fiche de frais
        resetValiderFicheFrais();
    }
    //remise à zéro de la liste des mois
    resetLstMois();
    //on cache le bouton de validation
    hidingBtnValidation();

    //exé d'une fonction au changement d'état de xhr
    xhr.onreadystatechange = function () {
        console.log(this); //pour infos et debug

        //si etat == 4 (la réponse du serveur a été reçue dans son intégralité 
        //peut maintenant être traitée).
        //&& statut = 200 (OK) alors
        if (this.readyState === 4 && this.status === 200) {
            //on parse la réponse (format txt) en json pour pouvoir utiliser la 
            //réponse comme un objet json et agir dessus
            var myObj = JSON.parse(this.responseText);
            console.log(myObj); //pour infos et debug

            //si pas de mois pour ce visiteur et visiteur sélectionné :
            // création d'un h5 pour affichage message
            if (myObj.length === 0 && maListeVisiteurs.selectedIndex > 0) {
                afficheMessagePasDeFiches();

            } else if (myObj.length !== 0 && maListeVisiteurs.selectedIndex > 0) {
                //sinon création des éléments <option> dans la liste lstMois correspondant
                //à tous  les mois dispos pour ce visiteur
                alimenteListeMois(myObj);

                //si on est dans l'onglet "suivre paiement fiche de frais
                if (estOngletSuiviPaiementFrais) {
                    //on configure le btn validation si l'on ne se trouve pas dans la section "Remboursée" qui ne fait que recenser les fiches 
                    //remboursées pour chaques visiteurs --> permet de gérer un historique des remboursement
                    if (getOptionSelected('lstEtats') !== "RB") {
                        //configuration du libelle + affichage + attribut onclick du bouton de validation 
                        showBtnValidation(getOptionSelected('lstEtats'));
                    }
                    //chargement de la page v_etatFrais_compta.php
                    loadVueEtatFraisCompta();
                } else {
                    //nous sommes dans la partie valider frais
                    //alimentation du bouton de validation + son affichage
                    showBtnValidation("CL");
                    //sinon affichage de la page listeFraisForfait à la suite des mois [pour onglet "valider fiche de frais"]
                    $('#lesFraisF').load('vues/v_listeFraisForfait_compta.php');
                }

                //envoie d'une requête ajax par la fonction selectFicheFrais pour récupérer les frais F relatives au mois sélectionné par défaut
                selectFicheFraisForfait(maListeMois.options[maListeMois.selectedIndex].value);
            }
        }
    };
    //si lstEtats existe && un visiteur est sélectionné && un état est sélectionné
    if ($('#lstEtats').length && document.getElementById('lstVisiteurs').selectedIndex > 0 && document.getElementById('lstEtats').selectedIndex > 0) {
        //nous sommes dans la partie suivre paiement fiches de frais
        xhr.open("GET", "controleurs/c_suiviFrais.php?q=" + JSON.stringify(visiteurSelected) + "&etat=" + JSON.stringify(getOptionSelected('lstEtats')) + "&action=selectionnerMois", true);
        xhr.send();
    } else if (!$('#lstEtats').length) {
        //si la div avec l'id etatFrais n'existe pas on en déduit qu'on se trouve dans l'onglet valider frais 
        xhr.open("GET", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&action=selectionnerMois", true);
        xhr.send();
    }
}

/**
 * Alimentation de la liste id="lstMois" :
 * Crée à la volée les éléments option et les rattache à lstMois
 * 
 * @param {json} myObj  Objet json contenant les différents mois récupérés par requête 
 * @returns {void}
 */
function alimenteListeMois(myObj) {

    var maListeMois = document.getElementById('lstMois');
    // création des éléments <option> dans la liste lstMois correspondant à tous  les mois dispos pour un visiteur
    for (var x in myObj) {
        date = myObj[x].numMois + '/' + myObj[x].numAnnee; //forme : unMois / uneAnnée
        var option = document.createElement('option'); //création élément option
        option.value = myObj[x].mois; //forme 'anneeMois'
        option.textContent = date;  //contiend la valeur de la variable date
        //élément lstMois <select> parent de l'élément <option> enfant
        maListeMois.appendChild(option);
    }
}

/**
 * Envoi d'une requête Ajax et 
 * Alimentation à la volée de la partie frais forfait de l'onglet 
 * 'valider les fiches de frais' ou 'suivre le paiement des fiches de frais'
 * 
 * @param {Integer} mstr  attribut value du mois sélectionné
 * @returns {void}
 */function selectFicheFraisForfait(mstr) {

    //declarations
    //nécessité de récupérer à nouveau le visiteur sélectionné au lieu d'utiliser la variable str de la fonction selectMoisDispos(str)
    //car si la fonction selectFicheFraisForfait est appelée par l'attribut onchange de lstMois, celle-ci n'envoie que le param du mois sélectionné this.value
    var visiteurSelected = getOptionSelected('lstVisiteurs'); //attribut value du visiteur actuellement sélectionné
    var xhr = new XMLHttpRequest(); //permet de récupérer des données au format xml, json, html ou txt : ici nous récupérerons au format json

    //si nous sommes dans l'onglet "suivre le paiement des fiches de frais
    if (document.getElementById('lstEtats') !== null) {
        var etatSelected = getOptionSelected('lstEtats'); //on récupère l'état sélectionné
    }

    //actions au changement d'état de xhr
    xhr.onreadystatechange = function () {
        console.log(this); //pour infos et debug
        //si la requête s'est bien passée
        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObj = JSON.parse(this.responseText); //conversion en json pour manipulation de l'objet json
            console.log(myObj); //pour infos et debug

            //actions seulement si myObj != 0
            if (myObj.length !== 0) {
                //si un état est sélectionné (donc que nous sommes dans l'onglet "suivre paiement des fiches de frais")
                if (typeof etatSelected !== 'undefined') {
                    //alimentation de la page v_etatFrais_compta.php partie frais forfait de la fiche (table lignefraisforfait phpMyAdmin)
                    v_etatFrais_fraisForfait(visiteurSelected, mstr, myObj);

                } else {
                    //nous sommes dans l'onglet "valider les fiches de frais"
                    //alimentation de la page v_ficheFraisForfait_compta.php
                    v_ficheFraisForfait(visiteurSelected, mstr, myObj);
                }
            }
        }
    }
    ;
    xhr.open("GET", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(mstr) + "&action=fraisForfait", true);
    xhr.send();
}

/**
 * Crée le tableau des frais forfait à la volée
 * Sera affiché dans la page v_etatFrais_compta.php
 * 
 * @param {String} vstr   Visiteur sélectionné 
 * @param {String} mstr   Mois sélectionné
 * @param {json} myObj    Objet retourné par la requête selectFicheFraisForfait, contiend l'ensemble des frais forfait
 * @returns {void}
 */
function v_etatFrais_fraisForfait(vstr, mstr, myObj) {

    //remise à zéro du tableau relatif au récapitulatif des frais forfait
    resetTabRecapFraisForfait();

    //création du tableau des frais forfait par le parcours de l'objet myObj
    for (var x in myObj) {
        //entête du tableau 
        var libelle = myObj[x].libelle; //contiend le libelle du frais forfait
        var th = document.createElement('th'); //contiendra la variable libelle
        document.getElementById('trLibSuiviFraisF').appendChild(th); //on raccroche th1 au DOM
        th.innerHTML = libelle;
        //alimentation du tableau 
        var quantite = myObj[x].quantite; //contiendra la quantite de frais forfait
        var td = document.createElement('td');  //contiendra la variable quantite
        td.className = "qteForfait";
        document.getElementById('trQteFraisF').appendChild(td); //on raccorche th2 au DOM 
        td.innerHTML = quantite;
    }
    //appel de la fonction selectInfosFicheFrais pour afficher les infos de la fiche de frais 
    selectInfosFicheFrais(vstr, mstr);
}

/**
 * Alimente la partie information de l'état de la fiche de frais dans l'onglet "suivre le paiement des fiches de frais"
 * 
 * @param {String} vstr   Visiteur sélectionné
 * @param {String} mstr   Mois sélectionné
 * @param {json} myObj    Contiend les informations sur la fiche de frais par la requête renvoyée par selectInfosFicheFrais
 * @returns {void}
 */
function v_etatFrais_etat(vstr, mstr, myObj) {
    //remise à zéro de la partie informations sur l'état de la fiche
    resetEnteteInfosFicheFrait();
    //alimentation de l'entête de l'état de la fiche de frais (* from fichefrais)
    document.getElementById('dateFicheFrais').innerHTML += mstr.substr(4, 2) + " - " + mstr.substr(0, 4) + " : ";
    document.getElementById('etat').innerHTML += " " + myObj['libEtat'] + " depuis le " + myObj['dateModif'];
    document.getElementById('montantValide').innerHTML += " " + myObj['montantValide'];
    //appel de la fonction selectfichefraishorsforfait
    selectFicheFraisHorsForfait(vstr, mstr);
}

/**
 * Crée les inputs à la volée des frais F (rattachés à l'élément fieldset id="conteneurFraisF")
 * 
 * @param {String}mstr    Mois sélectionné
 * @param {json} myObj    Contiend l'ensemble des frais F 
 * @returns {void}
 */
function createInputsValiderFraisF(mstr, myObj) {
    for (var x = 0; x < myObj.length; x++) {
        var label = document.createElement('label'); //création label de l'input
        var input = document.createElement('input'); //création input
        var div = document.createElement('div'); //création div
        label.for = 'idFrais'; //label rattaché à l'input
        label.textContent = myObj[x].libelle; //texte du label : libelle du frais forfait (frais km, nuitées...)
        input.type = 'text'; //type d'input
        input.id = myObj[x].idfrais; //id unique
        input.name = 'lesFrais[' + myObj[x].idfrais + ']'; //nom unique
        input.size = 10;
        input.maxlength = 5;
        input.className = 'form-control lesFraisF';
        div.className = "form-group";
        div.id = 'div[' + myObj[x].idfrais + ']'; //id unique 
        document.getElementById('conteneurFraisF').appendChild(div); //<fieldset> de la page v_listeFraisForfait_compta.php
        document.getElementById('div[' + myObj[x].idfrais + ']').appendChild(label);
        document.getElementById('div[' + myObj[x].idfrais + ']').appendChild(input);

        //ajout des btn à la fin du formulaire
        if (x === myObj.length - 1) {
            console.log('creation des btns frais F');
            var btnCorrect = document.createElement('button');
            var btnReset = document.createElement('button');
            btnCorrect.className = "btn btn-success";
            btnCorrect.type = "submit";
            btnCorrect.innerHTML = "Corriger";
            btnCorrect.setAttribute("onclick", "setModifs('lesFraisF', 'validerMajFraisForfait')");
            btnReset.className = "btn btn-danger";
            btnReset.type = "reset";
            btnReset.innerHTML = "Réinitialiser";
            btnReset.setAttribute("onclick", "selectFicheFraisForfait(" + mstr + ")");
            document.getElementById('conteneurFraisF').appendChild(btnCorrect);
            document.getElementById('conteneurFraisF').appendChild(btnReset);
        }
    }
}

/**
 * Alimentation de la page v_ficheFraisForfait_compta.php 
 * Création des éléments html et alimentation de cette page
 * 
 * @param {String} visiteurSelected   Visiteur sélectionné
 * @param {String} mstr               Mois sélectionné
 * @param {json} myObj                contient les frais forfait obtenus à partir de la requête AJAX de la fonction js selectFicheFraisForfait
 * @returns {void}
 */
function v_ficheFraisForfait(visiteurSelected, mstr, myObj) {

    //on vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire
    videFieldsetFraisF();

    //test s'il faut créer les inputs ou pas 
    //en l'état actuel de l'architecture ceci n'a pas grande utilité, les frais F étant réinitialisés à chaque changement de mois 
    //mais c'est une sécurité si jamais changement
    if (!$('#conteneurFraisF').contents().length) {
        console.log('creation des inputs frais F'); //pour debug
        createInputsValiderFraisF(mstr, myObj); //création des inputs

        //parcours de myObj
        for (var x in myObj) {
            var input = document.getElementById(myObj[x].idfrais);
            input.setAttribute("value", "" + myObj[x].quantite + ""); //alimentation de chaque input
            //input.value = myObj[x].quantite; //contenu de l'input : quantite de frais
        }
    } else {
        console.log('alimentation des inputs frais F'); //pour debug
        //parcours de la liste json pour alimenter v_listeFraisForfait_compta.php
        for (var x in myObj) {
            var input = document.getElementById(myObj[x].idfrais);
            input.setAttribute("value", "" + myObj[x].quantite + ""); //alimentation de chaque input
            //input.value = myObj[x].quantite; //contenu de l'input : quantite de frais
        }
    }

    //affichage des frais hors forfait
    $('#lesFraisHF').load('vues/v_listeFraisHorsForfait_compta.php');
    //appelle de la fonction qui va se charger de remplir les frais hors forfait
    selectFicheFraisHorsForfait(visiteurSelected, mstr);
}

/**
 * Retourne l'état sélectionné ou null si aucun sélectionné (ou inexistant (si on n'est pas dans l'onglet "suivi paiement des frais" par ex))
 * 
 * @returns {getEtatSelected.etatSelected} Etat actuellement sélectionné 
 */
function getEtatSelected() {
    if (document.getElementById('lstEtats') !== null) {
        var etatSelected = getOptionSeleted('lstEtats');
        return etatSelected;
    }
    return null;
}

/**
 * Crée le tableau par défaut des frais HF 
 * Onglet "suivre le paiement des fiches de frais"
 * 
 * @returns {void}
 */
function createTabFraisHF_suiviFrais() {
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    tr.id = "trSuiviFraisHF";
    th1.className = "date";
    th2.className = "libelle";
    th3.className = "montant";
    th1.innerHTML = "date";
    th2.innerHTML = "libelle";
    th3.innerHTML = "montant";
    document.getElementById('tbodySuiviFraisHF').appendChild(tr);
    document.getElementById('trSuiviFraisHF').appendChild(th1);
    document.getElementById('trSuiviFraisHF').appendChild(th2);
    document.getElementById('trSuiviFraisHF').appendChild(th3);
}

/**
 * Envoi d'une requête Ajax pour récupérer les informations des frais hors forfait pour un visiteur et un mois sélectionné 
 * Et alimentation de la partie frais hors forfait de l'onglet 
 * 'valider les fiches de frais' ou 'suivre le paiement des fiches de frais'
 * 
 * @param {String} vstr       Visiteur sélectionné
 * @param {Integer} mstr      Mois sélectionné
 * @returns {void}
 */function selectFicheFraisHorsForfait(vstr, mstr) {
    //declaration 
    var etatSelected = getOptionSelected('lstEtats');
    var xhr = new XMLHttpRequest();

    if ($('#lstEtats').contents().length) {
        //on remet à zéro le tableau des frais HF
        resetFraisHF_suiviFrais();
    } else {
        //on remet à zéro la partie frais hors forfait de l'onglet "valider les fiches de frais"
        resetFraisHF_validerFrais();
    }

    xhr.onreadystatechange = function () {
        console.log(this); //pour infos et debug
        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObj = JSON.parse(this.responseText); //conversion de réponse en json pour manipuler celle-ci comme un objet json
            console.log(myObj); //pour infos et debug

            //fabrication du tableau des frais hors forfait + remplissage avec leurs valeurs
            if (myObj.length !== 0) {
                if (etatSelected !== null) {
                    //alimentation de la vue v_etatFrais_compta.php partie frais hors forfait
                    v_etatFrais_fraisHorsForfait(vstr, mstr, myObj);
                } else {
                    //alimentation de la vue v_listeFraisHorsForfait_compta.php
                    v_ficheFraisHorsForfait(vstr, mstr, myObj);
                }
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q=" + JSON.stringify(vstr) + "&m=" + JSON.parse(mstr) + "&action=fraisHorsForfait", true);
    xhr.send();
}

/**
 * Alimente la partie frais HF de v_etatFrais_compta.php 
 * Onglet "suivre le paiement des fiches de frais"
 * 
 * @param {String} vstr   Visiteur sélectionné
 * @param {String} mstr   Mois sélectionné
 * @param {json} myObj    Contient tous les frais HF pour le visiteur et le mois sélectionnés
 * @returns {void}
 */
function v_etatFrais_fraisHorsForfait(vstr, mstr, myObj) {


    //alimente la partie frais hors forfait de la page v_etatFrais_compta.php
    for (var x in myObj) {
        var date = myObj[x].date;  //contiend la date du frais HF
        var libelle = myObj[x].libelle; //contiend le libelle du frais HF
        var montant = myObj[x].montant; //contiend le montant du frais HF
        var tr = document.createElement('tr'); //ligne qui contiendra date ; libelle ; montant du frais HF
        var td1 = document.createElement('td'); //contiendra var date
        var td2 = document.createElement('td'); //contiendra var libelle
        var td3 = document.createElement('td'); //contiendra var montant
        tr.id = "tr" + myObj[x].id;
        td1.innerHTML = date;
        td2.innerHTML = libelle;
        td3.innerHTML = montant;
        document.getElementById('tbodySuiviFraisHF').appendChild(tr); //on raccroche var tr au DOM
        document.getElementById("tr" + myObj[x].id).appendChild(td1); //td1 enfant de tr
        document.getElementById("tr" + myObj[x].id).appendChild(td2); //td2 enfant de tr
        document.getElementById("tr" + myObj[x].id).appendChild(td3); //td3 enfant de tr
    }
    //appel de la methode pour récupérer le nombre de justificatifs
    selectJustificatifs(vstr, mstr);
}

/**
 * Crée le tableau des frais HF à la volée 
 * Pour la page v_fraisHorsForfait_compta.php
 * Onglet "valider les fiches de frais"
 * 
 * @param {String} vstr   Visiteur sélectionné
 * @param {String} mstr   Mois sélectionné
 * @param {json} myObj    Contient l'ensemble des frais HF pour le visiteur et le mois sélectionnés
 * @returns {void}
 */
function v_ficheFraisHorsForfait(vstr, mstr, myObj) {


    //parcours de l'objet myObj [création du tableau des frais HF]
    for (var x in myObj) {
        //[creation des éléments du tableau]
        var tr = document.createElement('tr'); //création de la ligne
        tr.id = "tr" + myObj[x].id; //id unique

        var td1 = document.createElement('td'); //création de la cellule de tableau 
        var input1 = document.createElement('input'); //contiendra la date du frais HF
        td1.id = "td1" + myObj[x].id; //id unique 
        td1.className = "panel panel-secondary";
        input1.className = myObj[x].id + "row";
        input1.id = 'date';
        input1.type = "text";
        input1.value = myObj[x].date;

        var td2 = document.createElement('td'); //création cellule de tableau 
        var input2 = document.createElement('input'); //contiendra le libelle du frais HF
        td2.id = "td2" + myObj[x].id; //id unique 
        td2.className = "panel panel-secondary";
        input2.className = myObj[x].id + "row";
        input2.id = 'libelle';
        input2.type = "text";
        input2.size = 30;
        input2.value = myObj[x].libelle;

        var td3 = document.createElement('td'); //création cellule de tableau 
        var input3 = document.createElement('input'); //contiendra le montant du frais HF
        td3.id = "td3" + myObj[x].id; //id unique 
        td3.className = "panel panel-secondary";
        input3.className = myObj[x].id + "row";
        input3.id = 'montant';
        input3.type = "text";
        input3.value = myObj[x].montant;

        var td4 = document.createElement('td'); //contiendra les btn corriger et réinitialiser
        var btnCorrect = document.createElement('button'); //bouton corriger du frais HF
        var btnReset = document.createElement('button'); //bouton reset du frais HF
        var btnReport = document.createElement('button'); //bouton report de frais HF
        var btnRefus = document.createElement('button'); //bouton refus de frais HF
        td4.id = "btn" + myObj[x].id; //id unique 
        td4.className = "panel panel-secondary";
        btnCorrect.className = "btn btn-success lesFraisHF";
        btnCorrect.type = "button";
        btnCorrect.setAttribute('onclick', 'setModifs("' + myObj[x].id + 'row", "validerMajFraisHorsForfait")');
        btnCorrect.innerHTML = "Corriger";
        btnReset.className = "btn btn-danger";
        btnReset.type = "button";
        btnReset.setAttribute("onclick", "selectFicheFraisHorsForfait('" + vstr + "', " + mstr + ")");
        btnReset.innerHTML = "Réinitialiser";
        btnReport.className = "btn btn-warning";
        btnReport.type = "button";
        btnReport.innerHTML = "Reporter";
        btnReport.setAttribute("onclick", 'reporterFraisHorsForfait("' + myObj[x].id + 'row")');
        btnRefus.className = "btn btn-danger";
        btnRefus.id = "btnRefus" + myObj[x].id + "row";
        btnRefus.type = "button";
        btnRefus.innerHTML = "Refuser";
        btnRefus.setAttribute("onclick", 'refuserFraisHorsForfait("' + myObj[x].id + 'row")');

        //[création du tableau] 
        document.getElementById('tbody').appendChild(tr);
        document.getElementById('tr' + myObj[x].id).appendChild(td1);
        document.getElementById('td1' + myObj[x].id).appendChild(input1);
        document.getElementById('tr' + myObj[x].id).appendChild(td2);
        document.getElementById('td2' + myObj[x].id).appendChild(input2);
        document.getElementById('tr' + myObj[x].id).appendChild(td3);
        document.getElementById('td3' + myObj[x].id).appendChild(input3);
        document.getElementById('tr' + myObj[x].id).appendChild(td4);
        document.getElementById('btn' + myObj[x].id).appendChild(btnCorrect);
        document.getElementById('btn' + myObj[x].id).appendChild(btnReport);
        document.getElementById('btn' + myObj[x].id).appendChild(btnReset);
        document.getElementById('btn' + myObj[x].id).appendChild(btnRefus);
    }
    //appelle de la fonction selectJustificatifs pour visualiser le nombre de justificatifs déjà recus pour ce visiteur 
    selectJustificatifs(vstr, mstr);
}

/**
 * Envoi d'une requête AJAX pour récupérer le nombre de justificatifs pour le visiteur et le mois sélectionné
 * 
 * @param {String} vstr    Visiteur sélectionné
 * @param {String} mstr    Mois sélectionné
 * @returns {void}
 */
function selectJustificatifs(vstr, mstr) {
    //déclarations
    var xhr = new XMLHttpRequest(); //permet de récupérer des données au format xml, json, html ou txt : ici nous récupérerons au format json

    //refresh des justificatifs
    resetJustificatifs();

    xhr.onreadystatechange = function () {
        console.log(this); //pour infos et debug
        //si la requête s'est bien passé
        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj); //pour infos et debug

            if (myObj.length !== 0) {
                //si on se trouve dans l'onglet "suivre le paiement des fiches de frais"
                if (document.getElementById('lstEtats') !== null) {
                    //alimentation de la partie justificatifs de la vue v_etatFrais_compta.php
                    v_etatFrais_justificatifs(myObj);
                } else {
                    //création de la partie justificatifs à la volée
                    v_justificatifs(vstr, mstr, myObj);
                }
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q=" + JSON.stringify(vstr) + "&m=" + JSON.parse(mstr) + "&action=justificatifs", true); //(true = requête asynchrone)
    xhr.send();
}

/**
 * Alimente la partie justificatifs de la page v_etatFrais_compta.php
 * Onglet "suivre le paiement des fiches de frais"
 * 
 * @param {json} myObj  Contient le nombre de justificatifs 
 * @returns {void}
 */
function v_etatFrais_justificatifs(myObj) {
    //alimente la partie justificatifs de la vue v_etatFrais_compta.php
    document.getElementById('descriptifFraisHF').innerHTML = "Descriptif des éléments hors forfait - " + myObj + " justificatif(s) reçu(s)";
}

/**
 * Crée la partie justificatifs à la volée
 * Onglet "valider les fiches de frais"
 * 
 * @param {String} vstr   Visiteur sélectionné
 * @param {String} mstr   Mois sélectionné
 * @param {json} myObj    Contient le nombre de justificatifs pour le visiteur et le mois sélectionnés
 * @returns {void}
 */
function v_justificatifs(vstr, mstr, myObj) {

    var fieldset = document.createElement('fieldset'); //conteneur de la div
    var div = document.createElement('div'); //conteneur du label, de l'input et des btnCorriger et btnReinitialiser 
    var label = document.createElement('label'); //label de l'input 
    var input = document.createElement('input'); //contiendra le nombre de justificatifs
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
    input.value = myObj; //contiend le nombre de justificatifs
    input.className = "form-control";
    btnCorrect.className = "btn btn-success";
    btnCorrect.type = "submit";
    btnCorrect.innerHTML = "Valider";
    btnCorrect.setAttribute("onclick", "setModifs('justificatifs', 'validerMajJustificatifs')");
    btnReset.className = "btn btn-danger";
    btnReset.type = "reset";
    btnReset.innerHTML = "Réinitialiser";
    btnReset.setAttribute("onclick", "selectJustificatifs('" + vstr + "', " + mstr + ")");
    document.getElementById('justificatifs').appendChild(fieldset);
    document.getElementById('conteneurJustificatifs').appendChild(div);
    document.getElementById('divJ').appendChild(label);
    document.getElementById('divJ').appendChild(input);
    document.getElementById('conteneurJustificatifs').appendChild(btnCorrect);
    document.getElementById('conteneurJustificatifs').appendChild(btnReset);
}

/**
 * Renvoie la valeur de l'élément < option > actuellement sélectionné s'il existe, null sinon
 * 
 * @param {String} attrId                                  attribut id de l'élément < select > parent 
 * @returns {.document@call;getElementById.options.value}  la valeur de l'option sélectionné
 */
function getOptionSelected(attrId) {
    if (document.getElementById('' + attrId + '') !== null) {
        //declarations
        var index = document.getElementById('' + attrId + '').selectedIndex; //index (int) visiteur sélectionné
        var options = document.getElementById('' + attrId + '').options; //récupère les éléments <option> de l'élément lstVisiteurs (<select>)
        var optionSelected = options[index].value; //valeur d'attribut value du visiteur sélecctionné

        return optionSelected;
    }
    return null;
}

/**
 * Rempli une liste clé : valeur des frais forfait ou hors forfait selon className
 * 
 * @param {String} className  attribut classe pour lequel il faut récupérer les frais (F ou HF)
 * @returns {arrayList}       les frais de la classe envoyée en paramètre
 */
function getLstFrais(className) {
    //declarations
    var tabFrais = {};
    var lesFrais = Object.values(window.document.getElementsByClassName('' + className + '')); //récupère les input de classe (ex.: .lesFraisF)
    var y = "";
    var x = 0;

    //rempli tabFrais : {idFrais : qteFrais}
    $('.' + className + '').each(function () {
        y = $(this).attr('id');
        tabFrais[y] = lesFrais[x].value;
        x++;
    });

    return tabFrais;
}

/**
 * Créer les élements HTML pour l'affichage d'erreur
 * Et appelle la fonction chargée de placer le message au bon endroit selon où le user à "commis" l'erreur
 * 
 * @param {String} vstr         Visiteur sélectionné
 * @param {String} mstr         Mois sélectionné
 * @param {String} className    Attribut class concerné
 * @param {json} myObj          Contient le message d'erreur  selon le type d'erreur
 * @returns {void}
 */
function creerErreur(vstr, mstr, className, myObj) {
    // [création des éléments]
    var div = document.createElement('div');
    var p = document.createElement('p'); //contiendra le libelle d'erreur
    div.id = "erreur"; //id qui contiendra le < p > erreur
    div.className = "alert alert-danger";
    div.setAttribute("role", "alert");
    p.innerHTML = myObj; //contient le message d'erreur
    div.appendChild(p);
    //placement du message au bon endroit
    placeMessageErreur(vstr, mstr, className, div);
}

/**
 * Place le message d'erreur au bon endroit selon où le user a "commis" l'erreur 
 * Se base sur la classe envoyée en paramètre pour identifier l'endroit où l'erreur a été faite
 * 
 * @param {String} vstr        Visiteur sélectionné
 * @param {String} mstr        Mois sélectionné
 * @param {String} className   Attribut class concerné
 * @param {div} div            Element HTML div
 * @returns {void} 
 */
function placeMessageErreur(vstr, mstr, className, div) {
    //si erreur commise dans partie "frais forfait"
    if (className === 'lesFraisF') {
        document.getElementById('divFraisF').insertBefore(div, document.getElementById('conteneurFraisF')); //sera placé après h3 éléments forfaitisés
        document.getElementById('conteneurFraisF').innerHTML = ""; //rechargement des frais forfait à la manière d'un refresh de page
        selectFicheFraisForfait(mstr); //permet de garder visiteur et mois selected (ne serait pas le cas avec location.reload()

    } else if (className === 'justificatifs') {
        //si erreur commise dans partie "justificatifs"
        document.getElementById('justificatifs').insertBefore(div, document.getElementById('conteneurJustificatifs')); //sera placé dans la div des justificatifs comme 1er enfant
        document.getElementById('conteneurJustificatifs').innerHTML = ""; //rechargement des justificatifs à la manière d'un refresh 
        selectJustificatifs(vstr, mstr); //recharge seulement ce qui est nécessaire
    } else {
        //erreur forcément commise dans partie "frais hors forfait"
        document.getElementById('conteneurFraisHF').insertBefore(div, document.getElementById('tabFraisHF')); //sera placé avant le tableau des frais HF
        document.getElementById('tbody').innerHTML = ""; //on vide le contenu du tableau pour faire un refresh
        selectFicheFraisHorsForfait(vstr, mstr); //rechargement des frais hors forfait
    }
}

/**
 * Créer et affiche l'erreur pendant 5 secondes au bon endroit dans le DOM 
 * 
 * @param {String} vstr         Visiteur sélectionné
 * @param {String} mstr         Mois sélectionné
 * @param {String} className    Attribut classe concerné
 * @param {json} myObj          Contient le message d'erreur
 * @returns {void}
 */
function afficheErreur(vstr, mstr, className, myObj) {

    creerErreur(vstr, mstr, className, myObj);
    //affiche l'erreur pendant 5 secondes 
    setTimeout(function () {
        document.getElementById('erreur').remove();
    }, 5000); //supprime l'erreur de la page après 5sec
    //pas le choix de faire comme ça car sinon impossibilité de le supprimer car si suppr au moment d'affichage de frais f lors d'un 
    //changement de mois, ce sera correct mais alors lors du refresh par appel de la fonction fraisf ci-dessus, l'erreur serait supprimée également  

}

/**
 * Envoi d'une requête "POST" avec AJAX pour effectuer des modifications selon la classe et l'action demandée
 * 
 * @param {String} className    Nom de la classe
 * @param {String} action       Action demandée
 * @returns {void}
 */
function setModifs(className, action) {

    //demande de confirmation à l'utilisateur avant exécution des modifications 
    if (confirm('Voulez-vous vraiment effectuer ces modifications?')) {
        //declarations
        var visiteurSelected = getOptionSelected('lstVisiteurs'); //attribut value du visiteur sélectionné
        var moisSelected = getOptionSelected('lstMois'); //attribut value du mois sélectionné
        var lesFrais = getLstFrais(className); //récupère la liste des frais F ou HF (selon la classe envoyée en param.)
        var xhr = new XMLHttpRequest(); //permet de récupérer des infos au format xml, json, html, text : ici nous récupérerons les infos au format json

        //au changement d'état de xhr
        xhr.onreadystatechange = function () {
            console.log(this); //pour infos et debug
            //si la requête s'est bien passée
            if (xhr.readyState === 4 && xhr.status === 200) {
                var myObj = JSON.parse(this.responseText); //récupère et parse la réponse de la requête au format json pour pouvoir l'utiliser comme un objet
                console.log(myObj); //pour infos et debug
                if (myObj !== null && (typeof myObj !== "string" | myObj === 'Refus OK.' | myObj === 'Report OK.')) {
                    alert('La modification a bien été prise en compte.');
                    return myObj;
                } else if (typeof myObj === "string") {
                    //affichage d'erreur
                    afficheErreur(visiteurSelected, moisSelected, className, myObj);
                    return null;
                }
            }
        };

        //envoie la requête au bon endroit selon la classe concernée puis l'action concernée
        if (className === 'lesFraisF') {
            xhr.open("POST", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(moisSelected) + "&lesFrais=" + JSON.stringify(lesFrais) + "&action=" + action + "", true);
        } else if (className === 'justificatifs') {
            xhr.open("POST", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(moisSelected) + "&j=" + JSON.stringify(document.getElementById('leNb').value) + "&action=" + action + "", true);
        } else {
            if (action === "validerMajFraisHorsForfait") {
                xhr.open("POST", "controleurs/c_validerFrais.php?lesFrais=" + JSON.stringify(lesFrais) + "&ligne=" + JSON.parse(parseInt(className)) + "&action=" + action + "", true);
            } else if (action === "refuserFraisHorsForfait") {
                xhr.open("POST", "controleurs/c_validerFrais.php?ligne=" + JSON.parse(parseInt(className)) + "&action=" + action + "", true);
            } else {
                xhr.open("POST", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(moisSelected) + "&ligne=" + JSON.parse(parseInt(className)) + "&action=" + action + "", false);
            }
        }
        xhr.send();
    }
}

/**
 * Ajoute la mention [REFUSE] devant le libelle de frais HF + recharge les frais HF
 * pour affichage de cette mention instantanément
 * 
 * @param {String} className Attribut classe du frais HF (permet de récupérer tous 
 *                           les inputs relatifs à ce frais HF)
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
 * Appelle la fonction setModifs qui envoie la requête AJAX
 * Refresh les frais hors forfait
 * 
 * @param {String} className   Attribut classe du frais HF concerné
 * @returns {void}
 */
function reporterFraisHorsForfait(className) {

    //declarations
    var idVisiteur = getOptionSelected('lstVisiteurs');
    var mois = getOptionSelected('lstMois');

    //appel de la fonction qui va procéder au report du frais HF au mois suivant par une requête update 
    setModifs(className, "reporterFraisHorsForfait");
    //refresh des frais hors forfait
    selectFicheFraisHorsForfait(idVisiteur, mois);
}

/**
 * Met à jour une fiche de frais 
 * (tests pour actions légèrement différentes entre une fiche à valider et les
 * autres actions de maintenance d'état de frais ("MP", "RB"))
 * 
 * @param {String} etat    Etat de la fiche envoyé par le bouton de validation 
 * @returns {void}
 */
function majEtatFicheFrais(etat) {

    if (confirm('Voulez-vous vraiment mettre à jour l\'état de la fiche de frais ?')) {
        var visiteurSelected = getOptionSelected('lstVisiteurs');
        var moisSelected = getOptionSelected('lstMois');
        var xhr = new XMLHttpRequest(); //permet de manipuler des resultats au format json, xml, html, text (ici nous utiliserons json)

        xhr.onreadystatechange = function () {
            console.log(this); //pour infos et debug

            if (xhr.readyState === 4 && xhr.status === 200) {
                var myObj = JSON.parse(this.responseText);
                console.log(myObj); //pour infos et debug
                if (myObj === "Mise à jour fichefrais.idetat OK.") {
                    selectMoisDispos(visiteurSelected); //resélection des mois disponibles pour prendre en compte le changement d'état
                } else {
                    //une erreur est survenue
                    console.log("Une erreur est survenue lors de la mise à jour de l'état de la fiche de frais..");
                }
            }
        };
        //si onglet "suivre le paiement des fiches de frais" et état sélectionné
        if (document.getElementById('lstEtats') !== null && document.getElementById('lstEtats').selectedIndex > 0) {
            //préparation de la requête
            xhr.open("POST", "controleurs/c_suiviFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.stringify(moisSelected) + "&etat=" + JSON.stringify(etat) + "&action=majEtatFicheFrais", true);
        } else {
            //onglet "valider les fiches de frais"
            xhr.open("POST", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.stringify(moisSelected) + "&etat=VA&action=validerFicheFrais", true);
        }
        xhr.send();
    }
}

/**
 * Affiche le message "Pas de fiche de frais pour ce visiteur ce mois-ci"
 * 
 * @returns {void}
 */
function afficheMessagePasDeFiches() {
    var message = document.createElement('h5'); //contiendra le message
    message.id = "vide";
    message.textContent = "Pas de fiche de frais pour ce visiteur ce mois-ci";
    document.getElementById('lesMois').appendChild(message);
    //hidden du button validerFicheFrais
    document.getElementById('validation').setAttribute('style', 'display: none');
}

/**
 * Charge la vue v_etatFrais_compta.php à la volée
 * 
 * @returns {void}
 */
function loadVueEtatFraisCompta() {

    //création de l'élément div qui contiendra la page à charger 
    var div = document.createElement('div');
    div.id = 'etatFrais';
    document.getElementById('conteneur-global').insertBefore(div, document.getElementById('validation')); //placée avant les balises <script> en v_pied.php
    $('#etatFrais').load('vues/v_etatFrais_compta.php'); //chargement de la page
}

/**
 * Affiche le bouton de validation selon l'état envoyé en paramètre
 * 
 * @param {String} etat   Etat nécessaire pour configurer le bon bouton de validation
 * @returns {void}
 */
function showBtnValidation(etat) {

    //serie de tests pour configurer le button approprié à chaque état 
    if (etat === "CL") {
        configBtnValidation("Valider la Fiche de Frais", "VA");
    } else if (etat === "VA") {
        configBtnValidation("Mettre en paiement la Fiche de Frais", "MP");
    } else {
        configBtnValidation("Fiche de Frais Remboursée", "RB");
    }
}

/**
 * Configure le bouton de validation avec les paramètres
 * 
 * @param {String} libelle  Libelle de l'élément button
 * @param {String} etat     Etat nécessaire pour la bonne configuration du bouton 
 * @returns {void}
 */
function configBtnValidation(libelle, etat) {

    //alimentation du bouton de validation + son affichage
    document.getElementById('btn-validation').innerHTML = libelle;
    document.getElementById('btn-validation').setAttribute("value", etat);
    document.getElementById('validation').setAttribute('style', 'display: contents');
}

/**
 * Envoi d'une requête AJAX pour mettre la fiche en paiement : 
 * Passe la fiche à l'état "MP"
 * 
 * @returns {void}
 */
function mettreEnPaiementFicheFrais() {

    if (confirm('Voulez-vous vraiment mettre cette fiche de frais en paiement ?')) {
        var visiteurSelected = getOptionSelected('lstVisiteurs');
        var moisSelected = getOptionSelected('lstMois');
        var xhr = new XMLHttpRequest(); //permet de récupérer des informations au format json, xml, html, text (ici nous utiliserons le format json)

        xhr.onreadystatechange = function () {
            console.log(this); //pour infos et debug

            if (xhr.readyState === 4 && xhr.status === 200) {
                var myObj = JSON.parse(this.responseText);
                console.log(myObj); //pour infos et debug
                //si réponse positive
                if (myObj === "Mise à jour fichefrais.idetat OK.") {
                    selectMoisDispos(); //on resélectionne les mois disponibles pour prendre en compte le changement d'état
                } else {
                    //si réponse négative
                    console.log("une erreur est survenue lors de la mise à jour de l'état de la fiche de frais..");
                }
            }
        };
        xhr.open("POST", "controleurs/c_suiviFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(moisSelected) + "&etat=" + JSON.stringify("MP") + "&action=majEtatFicheFrais", true);
        xhr.send();
    }
}

/**
 * Envoi d'une requête AJAX pour récupérer les infos de la fiche de frais (table fichefrais phpMyAdmin)
 * 
 * @param {String} vstr    Visiteur sélectionné
 * @param {String} mstr    Mois sélectionné
 * @returns {void}
 */
function selectInfosFicheFrais(vstr, mstr) {
    //declaration
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        console.log(this); //pour infos et debug

        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj); //pour infos et debug

            if (myObj !== null) {
                //alimentation partie information de la fiche sélectionné dans v_etatFrais_compta.php
                v_etatFrais_etat(vstr, mstr, myObj);
            }
        }
    };
    xhr.open("GET", "controleurs/c_suiviFrais.php?q=" + JSON.stringify(vstr) + "&m=" + JSON.stringify(mstr) + "&action=infosFrais", true);
    xhr.send();
}
