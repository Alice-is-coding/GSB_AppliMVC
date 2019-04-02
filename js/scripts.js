 /*
  * 
  * Gestion dynamique du site côté comptables avec javaScript
  *  
 * @category  PPE
 * @package   GSB
 * @author    Alice BORD <alice.bord1@gmail.com>
 * @link      http://www.reseaucerta.org Contexte « Laboratoire GSB »
 */

/**
 * Vide le contenu d'un élément html dont l'id est passé en paramètre.
 * 
 * @param {String} strId             Nom de l'id.
 * @param {String} strInnerHTML      Chaîne devant apparaître dans la propriété innerHTML de l'id passé en paramètre.
 * @returns {void}
 */
function reset(strId, strInnerHTML) {
    if (document.getElementById(strId) !== null) {
        document.getElementById(strId).innerHTML = strInnerHTML;
    }
}

/**
 * Vide la liste des mois disponibles si elle possède effectivement des mois.
 * 
 * @returns {void}
 */
function resetLstMois() {
    if (document.getElementById('lstMois').length > 0) {
        document.getElementById('lstMois').innerHTML = '';
    }
}

/**
 * Supprime le message stipulant la non présence de fiche pour un visiteur à un mois donné.
 * 
 * @returns {void}
 */
function supprMessageNonFiche() {
    // Si message 'pas de facture pour ce visiteur ce mois' affiché : 
    // On le supprime pour faire un refresh.
    if (document.getElementById('vide') !== null) {
        document.getElementById('vide').remove();
    }
}

/**
 * Reset de la page relative à l'onglet 'Valider les fiches de frais' comme si elle était rechargée.
 * 
 * @returns {void}
 */
function resetValiderFicheFrais() {

    // Si message 'pas de facture pour ce visiteur ce mois' affiché : 
    // On le supprime pour faire un refresh.
    supprMessageNonFiche();
    // On vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire
    reset('lesFraisF', '');
    //on vide le contenu de tbody si déjà rempli pour simuler un submit de formulaire
    reset('lesFraisHF', '');
    //on vide le contenu des justificatifs
    reset('justificatifs', '');
}

/**
 * Remise à zéro de la partie justificatifs :
 * Onglet 'valider les fiches de frais' ou 'suivre le paiement des fiches de frais'.
 * 
 * @returns {void}
 */
function resetJustificatifs() {
    var etatSelected = getOptionSelected('lstEtats');
    // Si onglet "valider les fiches de frais" :
    if (etatSelected === null) {
        // On vide le contenu des justificatifs comme un refresh.
        reset('conteneurJustificatifs', '');
    } else {
        // Onglet "suivre le paiement des fiches de frais" :
        // Refresh des justificatifs.
        reset('descriptifFraisHF', '');
    }
}

/**
 * Remise à zéro de la partie frais HF :
 * Onglet "valider les fiches de frais".
 * 
 * @returns {void}
 */
function resetFraisHF_validerFrais() {

    // On vide le contenu de tbody si déjà rempli pour simuler un submit de formulaire.
    reset('tbody', '');
    // On vide le contenu de justificatifs (les nb justificatifs reçus).
    reset('justificatifs', '');
}

/**
 * Vide le contenu du fieldset id="conteneurFraisF" pour simuler un submit de formulaire :
 * Onglet "valider les fiches de frais".
 * 
 * @returns {void}
 */
function videFieldsetFraisF() {
    // On vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire.
    reset('conteneurFraisF', '');
}

/**
 * Remise à niveau de la partie frais HF : 
 * Onglet "suivre le paiement des fiches de frais".
 * 
 * @returns {void}
 */
function resetFraisHF_suiviFrais() {
    reset('descriptifFraisHF', "Descriptif des éléments hors forfait - justificatif(s) reçu(s)");
    if (document.getElementById('tbodySuiviFraisHF').innerHTML !== "") {
        document.getElementById('tbodySuiviFraisHF').innerHTML = "";
        createTabFraisHF_suiviFrais();
    }
}

/**
 * Reset de la page relative à l'onglet 'Suivre le paiement des fiches de frais' comme si elle était rechargée.
 * 
 * @returns {void}
 */
function resetSuiviPaiementFrais() {
    // On vide le la div qui coniend la vue v_etatFrais_compta.php .
    if (document.getElementById('etatFrais') !== null) {
        document.getElementById('etatFrais').remove();
    }
    // Si message 'pas de facture pour ce visiteur ce mois' affiché : 
    // On le supprime pour faire un refresh.
    supprMessageNonFiche();
    //On cache le button de validation 
    hidingBtnValidation();
}

/**
 * Remise à zéro de l'entête récapitulative des infos de la fiche de frais (table fichefrais dans phpMyAdmin):
 * Onglet "suivre le paiement des fiches de frais".
 * 
 * @returns {void}
 */
function resetEnteteInfosFicheFrait() {

    // Si la date est remplie : on la vide + on remet le libelle par défaut.
    reset('dateFicheFrais', "Fiche de frais du mois ");
    // Si le libelle de l'état est informé :
    if (document.getElementById('etat').innerHTML !== "") {
        document.getElementById('etat').innerHTML = ""; // On le vide.
        var u = document.createElement('u'); // Recréation de l'élément d'annotation non textuelle u .
        u.innerHTML = "Etat : "; // On fixe son libelle par défaut.
        document.getElementById('etat').appendChild(u);
    }
    // Si la partie "montant validé" est informée :
    if (document.getElementById('montantValide').innerHTML !== "") {
        document.getElementById('montantValide').innerHTML = ""; // On supprime l'information.
        var u = document.createElement('u'); // Recréation de l'élément d'annotation non textuelle u .
        u.innerHTML = "Montant validé : "; // Libelle par défaut de u .
        document.getElementById('montantValide').appendChild(u);
    }
}

/**
 * Remise à zéro de la partie frais forfait de la vue v_etaFrais_compta.php :
 * Onglet "suivre le paiement des fiches de frais".
 *
 * @returns {void}
 */
function resetTabRecapFraisForfait() {
    reset('trLibSuiviFraisF', '');
    reset('trQteFraisF', '');
}

/**
 * Reinitialise la page :
 * Aucun item sélectionné dans la liste des visiteurs,
 * Aucun item sélectionné dans la liste des etats,
 * Plus aucun mois dans la liste des mois,
 * Plus rien n'est affiché sur la page à part les listes déroulants et les boutons valider réinitialiser,
 * Comme un refresh de page.
 * 
 * @returns {void}
 */
function reinitialiser() {
    document.getElementById('lstVisiteurs').selectedIndex = 0;
    document.getElementById('lstEtats').selectedIndex = 0;
    document.getElementById('lstMois').innerHTML = "";
    
    if($('#lesEtats') === null) {
        resetValiderFicheFrais();
    } else {
        resetSuiviPaiementFrais();
    }
}

/**
 * Cache le bouton de validation.
 * 
 * @returns {void}
 */
function hidingBtnValidation() {
    // Hidden du button de validation.
    document.getElementById('validation').setAttribute('style', 'display: none');
}

/**
 * Sélection dynamique des mois disponibles pour un visiteur par une procédure Ajax +
 * Alimentation de la liste à la volée +
 * Appel selectFicheFraisForfait pour affichage de la fiche du mois sélectionné par défaut.
 *
 * @returns {void}
 */
function selectMoisDispos() {

    // Declarations.
    var estOngletSuiviPaiementFrais = false;
    var maListeMois = document.getElementById('lstMois');
    var maListeVisiteurs = document.getElementById('lstVisiteurs');
    var visiteurSelected = getOptionSelected('lstVisiteurs');
    // Création nouvel objet XMLHttpRequest.
    xhr = new XMLHttpRequest();

    // Si on est dans l'onglet suivi paiement des fiches de frais :
    if (document.getElementById('lstEtats') !== null) {
        resetSuiviPaiementFrais(); // Reset de la page relative à suivi paiement des frais.
        estOngletSuiviPaiementFrais = true;
    } else {
        // Remise à zéro de la page relative à valider fiche de frais.
        resetValiderFicheFrais();
    }
    // Remise à zéro de la liste des mois.
    resetLstMois();
    // On cache le bouton de validation.
    hidingBtnValidation();

    // Exé d'une fonction au changement d'état de xhr.
    xhr.onreadystatechange = function () {
        console.log(this); // Pour infos et debug.

        // Si etat == 4 (la réponse du serveur a été reçue dans son intégralité,
        // Peut maintenant être traitée),
        // && statut = 200 (OK) alors :
        if (this.readyState === 4 && this.status === 200) {
            // On parse la réponse (format txt) en json pour pouvoir utiliser la 
            // réponse comme un objet json et agir dessus.
            var myObj = JSON.parse(this.responseText);
            console.log(myObj); // Pour infos et debug.

            // Si pas de mois pour ce visiteur et visiteur sélectionné :
            if (myObj.length === 0 && maListeVisiteurs.selectedIndex > 0) {
                // Création d'un h5 pour affichage message.
                afficheMessagePasDeFiches();

            } else if (myObj.length !== 0 && maListeVisiteurs.selectedIndex > 0) {
                // Sinon création des éléments <option> dans la liste lstMois correspondant
                // à tous  les mois dispos pour ce visiteur.
                alimenteListeMois(myObj);

                // Si on est dans l'onglet "suivre paiement fiche de frais" :
                if (estOngletSuiviPaiementFrais) {
                    // Cn configure le btn validation si l'on ne se trouve pas dans la section "Remboursée" qui ne fait que recenser les fiches 
                    // remboursées pour chaques visiteurs --> permet de gérer un historique des remboursement.
                    if (getOptionSelected('lstEtats') !== "RB") {
                        // Configuration du libelle + affichage + attribut onclick du bouton de validation.
                        showBtnValidation(getOptionSelected('lstEtats'));
                    }
                    // Chargement de la page v_etatFrais_compta.php.
                    loadVueEtatFraisCompta();
                } else {
                    // Sinon : nous sommes dans la partie valider frais :
                    // Alimentation du bouton de validation + son affichage.
                    showBtnValidation("CL");
                    // Affichage de la page listeFraisForfait à la suite des mois [pour onglet "valider fiche de frais"].
                    $('#lesFraisF').load('vues/v_listeFraisForfait_compta.php');
                }

                // Envoie d'une requête ajax par la fonction selectFicheFrais pour récupérer les frais F relatives au mois sélectionné par défaut.
                selectFicheFraisForfait(maListeMois.options[maListeMois.selectedIndex].value);
            }
        }
    };
    // Si lstEtats existe && un visiteur est sélectionné && un état est sélectionné :
    if ($('#lstEtats').length && document.getElementById('lstVisiteurs').selectedIndex > 0 && document.getElementById('lstEtats').selectedIndex > 0) {
        // Nous sommes dans la partie suivre paiement fiches de frais.
        xhr.open("GET", "controleurs/c_suiviFrais.php?q=" + JSON.stringify(visiteurSelected) + "&etat=" + JSON.stringify(getOptionSelected('lstEtats')) + "&action=selectionnerMois", true);
        xhr.send();
    } else if (!$('#lstEtats').length) {
        // Si la div avec l'id etatFrais n'existe pas on en déduit qu'on se trouve dans l'onglet valider frais.
        xhr.open("GET", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&action=selectionnerMois", true);
        xhr.send();
    }
}

/**
 * Alimentation de la liste id="lstMois" :
 * Crée à la volée les éléments option et les rattache à lstMois.
 * 
 * @param {json} myObj  Objet json contenant les différents mois récupérés par requête.
 * @returns {void}
 */
function alimenteListeMois(myObj) {

    var maListeMois = document.getElementById('lstMois');
    // Création des éléments <option> dans la liste lstMois correspondant à tous  les mois dispos pour un visiteur.
    for (var x in myObj) {
        date = myObj[x].numMois + '/' + myObj[x].numAnnee; // Forme : unMois / uneAnnée .
        var option = document.createElement('option'); // Création élément option.
        option.value = myObj[x].mois; // Forme : 'anneeMois' .
        option.textContent = date;  // Contient la valeur de la variable date.
        // Elément lstMois <select> parent de l'élément <option> enfant.
        maListeMois.appendChild(option);
    }
}

/**
 * Envoi d'une requête Ajax et 
 * Alimentation à la volée de la partie frais forfait de l'onglet :
 * 'valider les fiches de frais' ou 'suivre le paiement des fiches de frais'.
 * 
 * @param {Integer} mstr  Attribut value du mois sélectionné.
 * @returns {void}
 */function selectFicheFraisForfait(mstr) {

    // Declarations
    // Nécessité de récupérer à nouveau le visiteur sélectionné au lieu d'utiliser la variable str de la fonction selectMoisDispos(str) :
    // Car si la fonction selectFicheFraisForfait est appelée par l'attribut onchange de lstMois, celle-ci n'envoie que le param du mois sélectionné this.value
    var visiteurSelected = getOptionSelected('lstVisiteurs'); // Attribut value du visiteur actuellement sélectionné.
    var xhr = new XMLHttpRequest(); // Permet de récupérer des données au format xml, json, html ou txt : ici nous récupérerons au format json.

    // Si nous sommes dans l'onglet "suivre le paiement des fiches de frais" :
    if (document.getElementById('lstEtats') !== null) {
        var etatSelected = getOptionSelected('lstEtats'); // On récupère l'état sélectionné.
    }

    // Actions au changement d'état de xhr :
    xhr.onreadystatechange = function () {
        console.log(this); // Pour infos et debug.
        // Si la requête s'est bien passée :
        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObj = JSON.parse(this.responseText); // Conversion en json pour manipulation de l'objet json.
            console.log(myObj); // Pour infos et debug.

            // Actions seulement si myObj != 0 :
            if (myObj.length !== 0) {
                // Si un état est sélectionné (donc que nous sommes dans l'onglet "suivre paiement des fiches de frais") :
                if (typeof etatSelected !== 'undefined') {
                    // Alimentation de la page v_etatFrais_compta.php partie frais forfait de la fiche (table lignefraisforfait phpMyAdmin).
                    v_etatFrais_fraisForfait(visiteurSelected, mstr, myObj);

                } else {
                    // Sinon : nous sommes dans l'onglet "valider les fiches de frais" :
                    // Alimentation de la page v_ficheFraisForfait_compta.php .
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
 * Crée le tableau des frais forfait à la volée :
 * Sera affiché dans la page v_etatFrais_compta.php .
 * 
 * @param {String} vstr   Visiteur sélectionné. 
 * @param {String} mstr   Mois sélectionné.
 * @param {json} myObj    Objet retourné par la requête selectFicheFraisForfait, contient l'ensemble des frais forfait.
 * @returns {void}
 */
function v_etatFrais_fraisForfait(vstr, mstr, myObj) {

    // Remise à zéro du tableau relatif au récapitulatif des frais forfait.
    resetTabRecapFraisForfait();

    // Création du tableau des frais forfait par le parcours de l'objet myObj :
    for (var x in myObj) {
        // Entête du tableau :
        var libelle = myObj[x].libelle; // Contient le libelle du frais forfait.
        var th = document.createElement('th'); // Contiendra la variable libelle.
        document.getElementById('trLibSuiviFraisF').appendChild(th); // On raccroche th1 au DOM.
        th.innerHTML = libelle;
        // Alimentation du tableau :
        var quantite = myObj[x].quantite; // Contient la quantite de frais forfait.
        var td = document.createElement('td');  // Contiendra la variable quantite.
        td.className = "qteForfait";
        document.getElementById('trQteFraisF').appendChild(td); // On raccorche th2 au DOM.
        td.innerHTML = quantite;
    }
    // Appel de la fonction selectInfosFicheFrais pour afficher les infos de la fiche de frais.
    selectInfosFicheFrais(vstr, mstr);
}

/**
 * Alimente la partie information de l'état de la fiche de frais dans l'onglet "suivre le paiement des fiches de frais".
 * 
 * @param {String} vstr   Visiteur sélectionné.
 * @param {String} mstr   Mois sélectionné.
 * @param {json} myObj    Contient les informations sur la fiche de frais par la requête renvoyée par selectInfosFicheFrais.
 * @returns {void}
 */
function v_etatFrais_etat(vstr, mstr, myObj) {
    // Remise à zéro de la partie informations sur l'état de la fiche.
    resetEnteteInfosFicheFrait();
    // Alimentation de l'entête de l'état de la fiche de frais (* from fichefrais) :
    document.getElementById('dateFicheFrais').innerHTML += mstr.substr(4, 2) + " - " + mstr.substr(0, 4) + " : ";
    document.getElementById('etat').innerHTML += " " + myObj['libEtat'] + " depuis le " + myObj['dateModif'];
    document.getElementById('montantValide').innerHTML += " " + myObj['montantValide'];
    // Appel de la fonction selectfichefraishorsforfait.
    selectFicheFraisHorsForfait(vstr, mstr);
}

/**
 * Crée les inputs à la volée des frais F (rattachés à l'élément fieldset id="conteneurFraisF").
 * 
 * @param {String}mstr    Mois sélectionné.
 * @param {json} myObj    Contient l'ensemble des frais F.
 * @returns {void}
 */
function createInputsValiderFraisF(mstr, myObj) {
    for (var x = 0; x < myObj.length; x++) {
        var label = document.createElement('label'); // Création label de l'input.
        var input = document.createElement('input'); // Création input.
        var div = document.createElement('div'); // Création div.
        label.for = 'idFrais'; // Label rattaché à l'input.
        label.textContent = myObj[x].libelle; // Texte du label : libelle du frais forfait (frais km, nuitées...).
        input.type = 'text'; // Type d'input.
        input.id = myObj[x].idfrais; // Id unique.
        input.name = 'lesFrais[' + myObj[x].idfrais + ']'; // Nom unique.
        input.size = 10;
        input.maxlength = 5;
        input.className = 'form-control lesFraisF';
        div.className = "form-group";
        div.id = 'div[' + myObj[x].idfrais + ']'; // Id unique. 
        document.getElementById('conteneurFraisF').appendChild(div); // <fieldset> de la page v_listeFraisForfait_compta.php .
        document.getElementById('div[' + myObj[x].idfrais + ']').appendChild(label);
        document.getElementById('div[' + myObj[x].idfrais + ']').appendChild(input);

        // Ajout des btn à la fin du formulaire :
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
 * Alimentation de la page v_ficheFraisForfait_compta.php :
 * Création des éléments html et alimentation de cette page.
 * 
 * @param {String} visiteurSelected   Visiteur sélectionné.
 * @param {String} mstr               Mois sélectionné.
 * @param {json} myObj                Contient les frais forfait obtenus à partir de la requête AJAX de la fonction js selectFicheFraisForfait.
 * @returns {void}
 */
function v_ficheFraisForfait(visiteurSelected, mstr, myObj) {

    // On vide le contenu du fieldset si jamais il est déjà rempli pour simuler un submit de formulaire.
    videFieldsetFraisF();

    // Test s'il faut créer les inputs ou pas. 
    // En l'état actuel de l'architecture ceci n'a pas grande utilité, les frais F étant réinitialisés à chaque changement de mois,
    // mais c'est une sécurité si jamais changement.
    if (!$('#conteneurFraisF').contents().length) {
        console.log('creation des inputs frais F'); // Pour debug.
        createInputsValiderFraisF(mstr, myObj); // Création des inputs.

        // Parcours de myObj :
        for (var x in myObj) {
            var input = document.getElementById(myObj[x].idfrais);
            input.setAttribute("value", "" + myObj[x].quantite + ""); // Alimentation de chaque input.
            //input.value = myObj[x].quantite; //contenu de l'input : quantite de frais
        }
    } else {
        console.log('alimentation des inputs frais F'); // Pour debug.
        // Parcours de la liste json pour alimenter v_listeFraisForfait_compta.php .
        for (var x in myObj) {
            var input = document.getElementById(myObj[x].idfrais);
            input.setAttribute("value", "" + myObj[x].quantite + ""); // Alimentation de chaque input.
            //input.value = myObj[x].quantite; //contenu de l'input : quantite de frais
        }
    }

    // Affichage des frais hors forfait.
    $('#lesFraisHF').load('vues/v_listeFraisHorsForfait_compta.php');
    // Appelle de la fonction qui va se charger de remplir les frais hors forfait.
    selectFicheFraisHorsForfait(visiteurSelected, mstr);
}

/**
 * Retourne l'état sélectionné ou null si aucun sélectionné (ou inexistant (si on n'est pas dans l'onglet "suivi paiement des frais" par ex)).
 * 
 * @returns {getEtatSelected.etatSelected} Etat actuellement sélectionné.
 */
function getEtatSelected() {
    if (document.getElementById('lstEtats') !== null) {
        var etatSelected = getOptionSeleted('lstEtats');
        return etatSelected;
    }
    return null;
}

/**
 * Crée le tableau par défaut des frais HF.
 * Onglet "suivre le paiement des fiches de frais".
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
 * Envoi d'une requête Ajax pour récupérer les informations des frais hors forfait pour un visiteur et un mois sélectionné,
 * Et alimentation de la partie frais hors forfait de l'onglet :
 * 'valider les fiches de frais' ou 'suivre le paiement des fiches de frais'.
 * 
 * @param {String} vstr       Visiteur sélectionné.
 * @param {Integer} mstr      Mois sélectionné.
 * @returns {void}
 */function selectFicheFraisHorsForfait(vstr, mstr) {
    // Declarations. 
    var etatSelected = getOptionSelected('lstEtats');
    var xhr = new XMLHttpRequest();

    if ($('#lstEtats').contents().length) {
        // On remet à zéro le tableau des frais HF.
        resetFraisHF_suiviFrais();
    } else {
        // On remet à zéro la partie frais hors forfait de l'onglet "valider les fiches de frais".
        resetFraisHF_validerFrais();
    }

    xhr.onreadystatechange = function () {
        console.log(this); // Pour infos et debug.
        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObj = JSON.parse(this.responseText); // Conversion de réponse en json pour manipuler celle-ci comme un objet json.
            console.log(myObj); // Pour infos et debug.

            // Fabrication du tableau des frais hors forfait + remplissage avec leurs valeurs.
            if (myObj.length !== 0) {
                if (etatSelected !== null) {
                    // Alimentation de la vue v_etatFrais_compta.php partie frais hors forfait.
                    v_etatFrais_fraisHorsForfait(vstr, mstr, myObj);
                } else {
                    // Alimentation de la vue v_listeFraisHorsForfait_compta.php .
                    v_ficheFraisHorsForfait(vstr, mstr, myObj);
                }
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q=" + JSON.stringify(vstr) + "&m=" + JSON.parse(mstr) + "&action=fraisHorsForfait", true);
    xhr.send();
}

/**
 * Alimente la partie frais HF de v_etatFrais_compta.php :
 * Onglet "suivre le paiement des fiches de frais".
 * 
 * @param {String} vstr   Visiteur sélectionné.
 * @param {String} mstr   Mois sélectionné.
 * @param {json} myObj    Contient tous les frais HF pour le visiteur et le mois sélectionnés.
 * @returns {void}
 */
function v_etatFrais_fraisHorsForfait(vstr, mstr, myObj) {


    // Alimente la partie frais hors forfait de la page v_etatFrais_compta.php .
    for (var x in myObj) {
        var date = myObj[x].date;  // Contient la date du frais HF.
        var libelle = myObj[x].libelle; // Contient le libelle du frais HF.
        var montant = myObj[x].montant; // Contient le montant du frais HF.
        var tr = document.createElement('tr'); // Ligne qui contiendra date ; libelle ; montant du frais HF.
        var td1 = document.createElement('td'); // Contiendra var date.
        var td2 = document.createElement('td'); // Contiendra var libelle.
        var td3 = document.createElement('td'); // Contiendra var montant.
        tr.id = "tr" + myObj[x].id;
        td1.innerHTML = date;
        td2.innerHTML = libelle;
        td3.innerHTML = montant;
        document.getElementById('tbodySuiviFraisHF').appendChild(tr); // On raccroche var tr au DOM.
        document.getElementById("tr" + myObj[x].id).appendChild(td1); // td1 enfant de tr.
        document.getElementById("tr" + myObj[x].id).appendChild(td2); // td2 enfant de tr.
        document.getElementById("tr" + myObj[x].id).appendChild(td3); // td3 enfant de tr.
    }
    // Appel de la methode pour récupérer le nombre de justificatifs.
    selectJustificatifs(vstr, mstr);
}

/**
 * Crée le tableau des frais HF à la volée,
 * Pour la page v_fraisHorsForfait_compta.php :
 * Onglet "valider les fiches de frais".
 * 
 * @param {String} vstr   Visiteur sélectionné.
 * @param {String} mstr   Mois sélectionné.
 * @param {json} myObj    Contient l'ensemble des frais HF pour le visiteur et le mois sélectionnés.
 * @returns {void}
 */
function v_ficheFraisHorsForfait(vstr, mstr, myObj) {


    // Parcours de l'objet myObj [création du tableau des frais HF] :
    for (var x in myObj) {
        // [Creation des éléments du tableau] :
        var tr = document.createElement('tr'); // Création de la ligne.
        tr.id = "tr" + myObj[x].id; // Id unique.

        var td1 = document.createElement('td'); // Création de la cellule de tableau.
        var input1 = document.createElement('input'); // Contiendra la date du frais HF.
        td1.id = "td1" + myObj[x].id; // Id unique.
        td1.className = "panel panel-secondary";
        input1.className = myObj[x].id + "row";
        input1.id = 'date';
        input1.type = "text";
        input1.value = myObj[x].date;

        var td2 = document.createElement('td'); // Création cellule de tableau.
        var input2 = document.createElement('input'); // Contiendra le libelle du frais HF.
        td2.id = "td2" + myObj[x].id; // Id unique.
        td2.className = "panel panel-secondary";
        input2.className = myObj[x].id + "row";
        input2.id = 'libelle';
        input2.type = "text";
        input2.size = 30;
        input2.value = myObj[x].libelle;

        var td3 = document.createElement('td'); // Création cellule de tableau.
        var input3 = document.createElement('input'); // Contiendra le montant du frais HF.
        td3.id = "td3" + myObj[x].id; // Id unique.
        td3.className = "panel panel-secondary";
        input3.className = myObj[x].id + "row";
        input3.id = 'montant';
        input3.type = "text";
        input3.value = myObj[x].montant;

        var td4 = document.createElement('td'); // Contiendra les btn corriger et réinitialiser.
        var btnCorrect = document.createElement('button'); // Bouton corriger du frais HF.
        var btnReset = document.createElement('button'); // Bouton reset du frais HF.
        var btnReport = document.createElement('button'); // Bouton report de frais HF.
        var btnRefus = document.createElement('button'); // Bouton refus de frais HF.
        td4.id = "btn" + myObj[x].id; // Id unique.
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

        // [Assemblage du tableau] :
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
    // Appelle de la fonction selectJustificatifs pour visualiser le nombre de justificatifs déjà recus pour ce visiteur.
    selectJustificatifs(vstr, mstr);
}

/**
 * Envoi d'une requête AJAX pour récupérer le nombre de justificatifs pour le visiteur et le mois sélectionné.
 * 
 * @param {String} vstr    Visiteur sélectionné.
 * @param {String} mstr    Mois sélectionné.
 * @returns {void}
 */
function selectJustificatifs(vstr, mstr) {
    // Déclarations.
    var xhr = new XMLHttpRequest(); // Permet de récupérer des données au format xml, json, html ou txt : ici nous récupérerons au format json.

    // Refresh des justificatifs.
    resetJustificatifs();

    xhr.onreadystatechange = function () {
        console.log(this); // Pour infos et debug.
        // Si la requête s'est bien passé :
        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj); // Pour infos et debug.

            if (myObj.length !== 0) {
                // Si on se trouve dans l'onglet "suivre le paiement des fiches de frais" :
                if (document.getElementById('lstEtats') !== null) {
                    // Alimentation de la partie justificatifs de la vue v_etatFrais_compta.php .
                    v_etatFrais_justificatifs(myObj);
                } else {
                    // Sinon : création de la partie justificatifs à la volée.
                    v_justificatifs(vstr, mstr, myObj);
                }
            }
        }
    };
    xhr.open("GET", "controleurs/c_validerFrais.php?q=" + JSON.stringify(vstr) + "&m=" + JSON.parse(mstr) + "&action=justificatifs", true); //(true = requête asynchrone).
    xhr.send();
}

/**
 * Alimente la partie justificatifs de la page v_etatFrais_compta.php :
 * Onglet "suivre le paiement des fiches de frais".
 * 
 * @param {json} myObj  Contient le nombre de justificatifs.
 * @returns {void}
 */
function v_etatFrais_justificatifs(myObj) {
    // Alimente la partie justificatifs de la vue v_etatFrais_compta.php .
    document.getElementById('descriptifFraisHF').innerHTML = "Descriptif des éléments hors forfait - " + myObj + " justificatif(s) reçu(s)";
}

/**
 * Crée la partie justificatifs à la volée :
 * Onglet "valider les fiches de frais".
 * 
 * @param {String} vstr   Visiteur sélectionné.
 * @param {String} mstr   Mois sélectionné.
 * @param {json} myObj    Contient le nombre de justificatifs pour le visiteur et le mois sélectionnés.
 * @returns {void}
 */
function v_justificatifs(vstr, mstr, myObj) {

    var fieldset = document.createElement('fieldset'); // Conteneur de la div.
    var div = document.createElement('div'); // Conteneur du label, de l'input et des btnCorriger et btnReinitialiser. 
    var label = document.createElement('label'); // Label de l'input.
    var input = document.createElement('input'); // Contiendra le nombre de justificatifs.
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
    input.value = myObj; // Contient le nombre de justificatifs.
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
 * Renvoie la valeur de l'élément < option > actuellement sélectionné s'il existe, null sinon.
 * 
 * @param {String} attrId                                  Attribut id de l'élément < select > parent .
 * @returns {.document@call;getElementById.options.value}  La valeur de l'option sélectionné.
 */
function getOptionSelected(attrId) {
    if (document.getElementById('' + attrId + '') !== null) {
        // Declarations.
        var index = document.getElementById('' + attrId + '').selectedIndex; // Index (int) visiteur sélectionné.
        var options = document.getElementById('' + attrId + '').options; // Récupère les éléments <option> de l'élément lstVisiteurs (<select>).
        var optionSelected = options[index].value; // Valeur d'attribut value du visiteur sélecctionné.

        return optionSelected;
    }
    return null;
}

/**
 * Rempli une liste clé : valeur des frais forfait ou hors forfait selon className.
 * 
 * @param {String} className  Attribut classe pour lequel il faut récupérer les frais (F ou HF).
 * @returns {arrayList}       Les frais de la classe envoyée en paramètre.
 */
function getLstFrais(className) {
    // Declarations.
    var tabFrais = {};
    var lesFrais = Object.values(window.document.getElementsByClassName('' + className + '')); // Récupère les input de classe (ex.: .lesFraisF).
    var y = "";
    var x = 0;

    // Rempli tabFrais -> {idFrais : qteFrais} :
    $('.' + className + '').each(function () {
        y = $(this).attr('id');
        tabFrais[y] = lesFrais[x].value;
        x++;
    });

    return tabFrais;
}

/**
 * Créer les élements HTML pour l'affichage d'erreur,
 * Et appelle la fonction chargée de placer le message au bon endroit selon où le user à "commis" l'erreur.
 * 
 * @param {String} vstr         Visiteur sélectionné.
 * @param {String} mstr         Mois sélectionné.
 * @param {String} className    Attribut class concerné.
 * @param {json} myObj          Contient le message d'erreur  selon le type d'erreur.
 * @returns {void}
 */
function creerErreur(vstr, mstr, className, myObj) {
    // [Création des éléments] :
    var div = document.createElement('div');
    var p = document.createElement('p'); // Contiendra le libelle d'erreur.
    div.id = "erreur"; // Id qui contiendra le < p > erreur.
    div.className = "alert alert-danger";
    div.setAttribute("role", "alert");
    p.innerHTML = myObj; // Contient le message d'erreur.
    div.appendChild(p);
    // Placement du message au bon endroit.
    placeMessageErreur(vstr, mstr, className, div);
}

/**
 * Place le message d'erreur au bon endroit selon où le user a "commis" l'erreur :
 * Se base sur l'attribut classeName envoyé en paramètre pour identifier l'endroit où l'erreur a été faite.
 * 
 * @param {String} vstr        Visiteur sélectionné.
 * @param {String} mstr        Mois sélectionné.
 * @param {String} className   Attribut class concerné.
 * @param {div} div            Element HTML div.
 * @returns {void} 
 */
function placeMessageErreur(vstr, mstr, className, div) {
    // Si erreur commise dans partie "frais forfait" :
    if (className === 'lesFraisF') {
        document.getElementById('divFraisF').insertBefore(div, document.getElementById('conteneurFraisF')); // Sera placé après h3 éléments forfaitisés.
        document.getElementById('conteneurFraisF').innerHTML = ""; // Rechargement des frais forfait à la manière d'un refresh de page.
        selectFicheFraisForfait(mstr); // Permet de garder visiteur et mois selected (ne serait pas le cas avec location.reload().

    } else if (className === 'justificatifs') {
        // Si erreur commise dans partie "justificatifs" :
        document.getElementById('justificatifs').insertBefore(div, document.getElementById('conteneurJustificatifs')); // Sera placé dans la div des justificatifs comme 1er enfant.
        document.getElementById('conteneurJustificatifs').innerHTML = ""; // Rechargement des justificatifs à la manière d'un refresh.
        selectJustificatifs(vstr, mstr); // Recharge seulement ce qui est nécessaire.
    } else {
        // Sinon : erreur forcément commise dans partie "frais hors forfait" :
        document.getElementById('conteneurFraisHF').insertBefore(div, document.getElementById('tabFraisHF')); // Sera placé avant le tableau des frais HF.
        document.getElementById('tbody').innerHTML = ""; // On vide le contenu du tableau pour faire un refresh.
        selectFicheFraisHorsForfait(vstr, mstr); // Rechargement des frais hors forfait.
    }
}

/**
 * Créer et affiche l'erreur pendant 5 secondes au bon endroit dans le DOM .
 * 
 * @param {String} vstr         Visiteur sélectionné.
 * @param {String} mstr         Mois sélectionné.
 * @param {String} className    Attribut classe concerné.
 * @param {json} myObj          Contient le message d'erreur.
 * @returns {void}
 */
function afficheErreur(vstr, mstr, className, myObj) {

    creerErreur(vstr, mstr, className, myObj);
    // Affiche l'erreur pendant 5 secondes.
    setTimeout(function () {
        document.getElementById('erreur').remove();
    }, 5000); // Supprime l'erreur de la page après 5sec.
    // Pas le choix de faire comme ça car sinon impossibilité de le supprimer car si suppr au moment d'affichage de frais f lors d'un 
    // changement de mois, ce sera correct mais alors lors du refresh par appel de la fonction fraisf ci-dessus, l'erreur serait supprimée également. 

}

/**
 * Envoi d'une requête "POST" avec AJAX pour effectuer des modifications selon la classe et l'action demandée.
 * 
 * @param {String} className    Nom de la classe.
 * @param {String} action       Action demandée.
 * @returns {void}
 */
function setModifs(className, action) {

    // Demande de confirmation à l'utilisateur avant exécution des modifications :
    if (confirm('Voulez-vous vraiment effectuer ces modifications?')) {
        // Declarations.
        var visiteurSelected = getOptionSelected('lstVisiteurs'); // Attribut value du visiteur sélectionné.
        var moisSelected = getOptionSelected('lstMois'); // Attribut value du mois sélectionné.
        var lesFrais = getLstFrais(className); // Récupère la liste des frais F ou HF (selon la classe envoyée en param.).
        var xhr = new XMLHttpRequest(); // Permet de récupérer des infos au format xml, json, html, text : ici nous récupérerons les infos au format json.

        // Au changement d'état de xhr :
        xhr.onreadystatechange = function () {
            console.log(this); // Pour infos et debug.
            // Si la requête s'est bien passée :
            if (xhr.readyState === 4 && xhr.status === 200) {
                var myObj = JSON.parse(this.responseText); // Récupère et parse la réponse de la requête au format json pour pouvoir l'utiliser comme un objet.
                console.log(myObj); // Pour infos et debug.
                if (myObj !== null && (typeof myObj !== "string" | myObj === 'Refus OK.' | myObj === 'Report OK.')) {
                    alert('La modification a bien été prise en compte.');
                    return myObj;
                } else if (typeof myObj === "string") {
                    // Affichage d'erreur.
                    afficheErreur(visiteurSelected, moisSelected, className, myObj);
                    return null;
                }
            }
        };

        // Envoie la requête au bon endroit selon la classe concernée puis l'action concernée.
        if (className === 'lesFraisF') {
            xhr.open("POST", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(moisSelected) + "&lesFrais=" + JSON.stringify(lesFrais) + "&action=" + action + "", true);
        } else if (className === 'justificatifs') {
            xhr.open("POST", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(moisSelected) + "&j=" + JSON.stringify(document.getElementById('leNb').value) + "&action=" + action + "", true);
        } else {
            if (action === "validerMajFraisHorsForfait") {
                xhr.open("POST", "controleurs/c_validerFrais.php?lesFrais=" + JSON.stringify(lesFrais) + "&ligne=" + JSON.parse(parseInt(className)) + "&action=" + action + "", true);
            } else if (action === "refuserFraisHorsForfait") {
                xhr.open("POST", "controleurs/c_validerFrais.php?ligne=" + JSON.parse(parseInt(className)) + "&action=" + action + "", false);
            } else {
                xhr.open("POST", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(moisSelected) + "&ligne=" + JSON.parse(parseInt(className)) + "&action=" + action + "", false);
            }
        }
        xhr.send();
    }
}

/**
 * Ajoute la mention [REFUSE] devant le libelle de frais HF + recharge les frais HF :
 * pour affichage de cette mention instantanément.
 * 
 * @param {String} className Attribut classe du frais HF (permet de récupérer tous 
 *                           les inputs relatifs à ce frais HF).
 * @returns {void}
 */
function refuserFraisHorsForfait(className) {

    // Declarations.
    var idVisiteur = getOptionSelected('lstVisiteurs');
    var mois = getOptionSelected('lstMois');

    // Appel de la fonction qui va procéder aux modifications du label.
    setModifs(className, "refuserFraisHorsForfait");
    // Réaffichage des frais hors forfait.
    selectFicheFraisHorsForfait(idVisiteur, mois);
}

/**
 * Reporte un frais hors forfait :
 * Appelle la fonction setModifs qui envoie la requête AJAX +
 * Refresh les frais hors forfait.
 * 
 * @param {String} className   Attribut classe du frais HF concerné.
 * @returns {void}
 */
function reporterFraisHorsForfait(className) {

    // Declarations.
    var idVisiteur = getOptionSelected('lstVisiteurs');
    var mois = getOptionSelected('lstMois');

    // Appel de la fonction qui va procéder au report du frais HF au mois suivant par une requête update.
    setModifs(className, "reporterFraisHorsForfait");
    // Refresh des frais hors forfait.
    selectFicheFraisHorsForfait(idVisiteur, mois);
}

/**
 * Met à jour une fiche de frais :
 * (Tests pour actions légèrement différentes entre une fiche à valider et les
 * autres actions de maintenance d'état de frais ("MP", "RB")).
 * 
 * @param {String} etat    Etat de la fiche envoyé par le bouton de validation. 
 * @returns {void}
 */
function majEtatFicheFrais(etat) {

    if (confirm('Voulez-vous vraiment mettre à jour l\'état de la fiche de frais ?')) {
        var visiteurSelected = getOptionSelected('lstVisiteurs');
        var moisSelected = getOptionSelected('lstMois');
        var xhr = new XMLHttpRequest(); // Permet de manipuler des resultats au format json, xml, html, text (ici nous utiliserons json).

        xhr.onreadystatechange = function () {
            console.log(this); // Pour infos et debug.

            if (xhr.readyState === 4 && xhr.status === 200) {
                var myObj = JSON.parse(this.responseText);
                console.log(myObj); // Pour infos et debug.
                if (myObj === "Mise à jour fichefrais.idetat OK.") {
                    selectMoisDispos(visiteurSelected); // Resélection des mois disponibles pour prendre en compte le changement d'état.
                } else {
                    // Une erreur est survenue.
                    console.log("Une erreur est survenue lors de la mise à jour de l'état de la fiche de frais..");
                }
            }
        };
        // Si onglet "suivre le paiement des fiches de frais" et état sélectionné :
        if (document.getElementById('lstEtats') !== null && document.getElementById('lstEtats').selectedIndex > 0) {
            // Préparation de la requête.
            xhr.open("POST", "controleurs/c_suiviFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.stringify(moisSelected) + "&etat=" + JSON.stringify(etat) + "&action=majEtatFicheFrais", true);
        } else {
            // Sinon : onglet "valider les fiches de frais".
            xhr.open("POST", "controleurs/c_validerFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.stringify(moisSelected) + "&etat=VA&action=validerFicheFrais", true);
        }
        xhr.send();
    }
}

/**
 * Affiche le message "Pas de fiche de frais pour ce visiteur ce mois-ci".
 * 
 * @returns {void}
 */
function afficheMessagePasDeFiches() {
    var message = document.createElement('h5'); // Contiendra le message.
    message.id = "vide";
    message.textContent = "Pas de fiche de frais pour ce visiteur ce mois-ci";
    document.getElementById('lesMois').appendChild(message);
    // Hidden du button validerFicheFrais.
    document.getElementById('validation').setAttribute('style', 'display: none');
}

/**
 * Charge la vue v_etatFrais_compta.php à la volée.
 * 
 * @returns {void}
 */
function loadVueEtatFraisCompta() {

    // Création de l'élément div qui contiendra la page à charger.
    var div = document.createElement('div');
    div.id = 'etatFrais';
    document.getElementById('conteneur-global').insertBefore(div, document.getElementById('validation')); // Placée avant les balises <script> en v_pied.php .
    $('#etatFrais').load('vues/v_etatFrais_compta.php'); // Chargement de la page.
}

/**
 * Affiche le bouton de validation selon l'état envoyé en paramètre.
 * 
 * @param {String} etat   Etat nécessaire pour configurer le bon bouton de validation.
 * @returns {void}
 */
function showBtnValidation(etat) {

    // Serie de tests pour configurer le button approprié à chaque état :
    if (etat === "CL") {
        configBtnValidation("Valider la Fiche de Frais", "VA");
    } else if (etat === "VA") {
        configBtnValidation("Mettre en paiement la Fiche de Frais", "MP");
    } else {
        configBtnValidation("Fiche de Frais Remboursée", "RB");
    }
}

/**
 * Configure le bouton de validation avec les paramètres.
 * 
 * @param {String} libelle  Libelle de l'élément button.
 * @param {String} etat     Etat nécessaire pour la bonne configuration du bouton.
 * @returns {void}
 */
function configBtnValidation(libelle, etat) {

    // Alimentation du bouton de validation + son affichage :
    document.getElementById('btn-validation').innerHTML = libelle;
    document.getElementById('btn-validation').setAttribute("value", etat);
    document.getElementById('validation').setAttribute('style', 'display: contents');
}

/**
 * Envoi d'une requête AJAX pour mettre la fiche en paiement : 
 * Passe la fiche à l'état "MP".
 * 
 * @returns {void}
 */
function mettreEnPaiementFicheFrais() {

    if (confirm('Voulez-vous vraiment mettre cette fiche de frais en paiement ?')) {
        var visiteurSelected = getOptionSelected('lstVisiteurs');
        var moisSelected = getOptionSelected('lstMois');
        var xhr = new XMLHttpRequest(); // Permet de récupérer des informations au format json, xml, html, text (ici nous utiliserons le format json).

        xhr.onreadystatechange = function () {
            console.log(this); // Pour infos et debug.

            if (xhr.readyState === 4 && xhr.status === 200) {
                var myObj = JSON.parse(this.responseText);
                console.log(myObj); // Pour infos et debug.
                // Si réponse positive.
                if (myObj === "Mise à jour fichefrais.idetat OK.") {
                    selectMoisDispos(); // On resélectionne les mois disponibles pour prendre en compte le changement d'état.
                } else {
                    // Si réponse négative :
                    console.log("une erreur est survenue lors de la mise à jour de l'état de la fiche de frais..");
                }
            }
        };
        xhr.open("POST", "controleurs/c_suiviFrais.php?q=" + JSON.stringify(visiteurSelected) + "&m=" + JSON.parse(moisSelected) + "&etat=" + JSON.stringify("MP") + "&action=majEtatFicheFrais", true);
        xhr.send();
    }
}

/**
 * Envoi d'une requête AJAX pour récupérer les infos de la fiche de frais (table fichefrais phpMyAdmin).
 * 
 * @param {String} vstr    Visiteur sélectionné.
 * @param {String} mstr    Mois sélectionné.
 * @returns {void}
 */
function selectInfosFicheFrais(vstr, mstr) {
    // Declaration.
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        console.log(this); // Pour infos et debug.

        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj); // Pour infos et debug.

            if (myObj !== null) {
                // Alimentation partie information de la fiche sélectionné dans v_etatFrais_compta.php .
                v_etatFrais_etat(vstr, mstr, myObj);
            }
        }
    };
    xhr.open("GET", "controleurs/c_suiviFrais.php?q=" + JSON.stringify(vstr) + "&m=" + JSON.stringify(mstr) + "&action=infosFrais", true);
    xhr.send();
}
