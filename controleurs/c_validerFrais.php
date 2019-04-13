<?php
/**
 * Gestion de la validation des frais par les comptables
 *
 * PHP Version 7
 *
 * @category  PPE
 * @package   GSB
 * @author    Réseau CERTA <contact@reseaucerta.org>
 * @author    Alice BORD <alice.bord1@gmail.com>
 * @copyright 2017 Réseau CERTA
 * @license   Réseau CERTA
 * @link      http://www.reseaucerta.org Contexte « Laboratoire GSB »
 *
 */

$action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING);
switch ($action) {
    case 'selectionnerVisiteur':
        $lesVisiteurs = $pdo->getLesVisiteurs();
        include 'vues/v_listeVisiteurs.php';
        include 'vues/v_listeMois_comptable.php';
        break;
    case 'selectionnerMois':
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $q = json_decode($_GET['q'], false); //contient le visiteur sélectionné dans la liste
        $mois = "";
        $lesMois = $pdo->getMoisPourCompta($q, 'CL'); //récupère les mois d'un visiteur
                                                    //dont l'état est à "CL"
        echo json_encode($lesMois); //encodage de la réponse
        break;
    case 'fraisForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $leMois = json_decode($_GET['m'], false); //contient mois sélectionné dans liste
        $idVisiteur = json_decode($_GET['q'], false); //contient le visiteur sélectionné dans liste
        $lesFraisForfait = $pdo->getLesFraisForfait($idVisiteur, $leMois);
        echo json_encode($lesFraisForfait); //encodage de la réponse
        break;
    case 'fraisHorsForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $leMois = json_decode($_GET['m'], false); //contient mois sélectionné dans liste
        $idVisiteur = json_decode($_GET['q'], false); //contient le visiteur sélectionné dans liste
        $lesFraisHorsForfait = $pdo->getLesFraisHorsForfait($idVisiteur, $leMois);
        echo json_encode($lesFraisHorsForfait); //encodage de la réponse
        break;
    case 'justificatifs':
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $idVisiteur = json_decode($_GET['q'], false);
        $leMois = json_decode($_GET['m'], false);
        $nbJustificatifs = $pdo->getNbjustificatifs($idVisiteur, $leMois);
        echo json_encode($nbJustificatifs); //encodage de la réponse
        break;
    case 'validerMajFraisForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $idVisiteur = json_decode($_GET['q'], false);
        $idMois = json_decode($_GET['m'], false);
        $lesFrais = json_decode($_GET['lesFrais'], true); //param true permet d'agir
                                                         //de la même façon que la constante
                                                         //JSON_OBJECT_AS_ARRAY (convertion en Array)
        if (lesQteFraisValides($lesFrais)) {
            $pdo->majFraisForfait($idVisiteur, $idMois, $lesFrais);
            echo json_encode($lesFrais); //encodage de la réponse
        } else {
            ajouterErreur('Les valeurs des frais doivent être numériques');
            foreach ($_REQUEST['erreurs'] as $erreur) {
                $erreurjson = $erreur;
            }
            echo json_encode($erreurjson); //encodage de l'erreur retournée
        }
        break;
    case 'validerMajFraisHorsForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $lesFrais = json_decode($_GET['lesFrais'], true); //param true permet de convertir en array utilisable par php
        $ligne = json_decode($_GET['ligne'], false);
        //test si date et montant valides et si libelle != vide
        if (estDateValide($lesFrais['date']) && is_numeric($lesFrais['montant']) && $lesFrais['libelle'] != '') {
            $pdo->majFraisHorsForfait($lesFrais, $ligne);
            echo json_encode($lesFrais);
        } else {
            //un champ est invalide : appel de la fonction valideInfosFrais pour générer le message d'erreur adéquate
            valideInfosFrais($lesFrais['date'], $lesFrais['libelle'], $lesFrais['montant']);
            foreach ($_REQUEST['erreurs'] as $erreur) {
                $erreurjson = $erreur;
            }
            echo json_encode($erreurjson); //encodage de la réponse
        }
        break;
    case 'validerMajJustificatifs':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $idVisiteur = json_decode($_GET['q'], false);
        $idMois = json_decode($_GET['m'], false);
        $nbJustificatifs = json_decode($_GET['j'], false);
        if (estEntierPositif($nbJustificatifs)) {
            $pdo->majNbJustificatifs($idVisiteur, $idMois, $nbJustificatifs);
            echo json_encode((integer) $nbJustificatifs);
        } else {
            ajouterErreur('La valeur doit être numérique');
            foreach ($_REQUEST['erreurs'] as $erreur) {
                $erreurjson = $erreur;
            }
            echo json_encode($erreurjson); //encodage de la réponse
        }
        break;
    case 'refuserFraisHorsForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $ligne = json_decode($_GET['ligne'], false);
        $pdo->refuserFraisHorsForfait($ligne);
        echo json_encode('Refus OK.'); //encodage de la réponse
        break;
    case 'reporterFraisHorsForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $idVisiteur = json_decode($_GET['q'], false);
        $mois = json_decode($_GET['m'], false);
        $ligne = json_decode($_GET['ligne'], false);
        //récupère le mois suivant
        //$moisSuivant = getMoisSuivant(getMois(date('d/m/Y')));
        $moisSuivant = getMoisSuivant($mois);
        //on crée une nouvelle fiche de frais pour le visiteur si jamais elle n'existe pas
        if ($pdo->estPremierFraisMois($idVisiteur, $moisSuivant)) {
            $pdo->creerNouvelleLigneFraisPourReport($idVisiteur, $moisSuivant);
        }
        //on reporte le frais HF au mois suivant
        $pdo->reporterFraisHorsForfait($ligne, $idVisiteur);
        echo json_encode('Report OK.'); //encodage de la réponse
        break;
    case 'validerFicheFrais':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $idVisiteur = json_decode($_GET['q'], false);
        $mois = json_decode($_GET['m'], false);
        //récupération des frais forfait pour un visiteur à un mois précis
        $lesFraisForfait = $pdo->getLesFraisForfait($idVisiteur, $mois);
        //récupération des frais hors forfait non refusés ni reportés pour un visiteur à un mois précis
        $lesFraisHorsForfait = $pdo->getLesFraisHorsForfaitPourValidation($idVisiteur, $mois);
        //le syst. passe la fiche à l'état 'Validée' + màj la date de modif de fiche
        $pdo->majEtatFicheFrais($idVisiteur, (string)$mois, "VA");
        $pdo->majMontantFicheFrais($idVisiteur, $mois, $lesFraisForfait, $lesFraisHorsForfait);
        echo json_encode('Mise à jour fichefrais.idetat OK.'); //encodage de la réponse
        break;
}
