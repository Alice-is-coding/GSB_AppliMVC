<?php
/**
 * Gestion de l'affichage des frais
 *
 * PHP Version 7
 *
 * @category  PPE
 * @package   GSB
 * @author    Réseau CERTA <contact@reseaucerta.org>
 * @author    José GIL <jgil@ac-nice.fr>
 * @copyright 2017 Réseau CERTA
 * @license   Réseau CERTA
 * @version   GIT: <0>
 * @link      http://www.reseaucerta.org Contexte « Laboratoire GSB »
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
        $lesMois = $pdo->getLesMoisDisponibles($q);
        echo json_encode($lesMois);
        break;
    case 'fraisForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $leMois = json_decode($_GET['m'], false); //contient mois sélectionné dans liste
        $idVisiteur = json_decode($_GET['q'], false); //contient le visiteur sélectionné dans liste
        $lesFraisForfait = $pdo->getLesFraisForfait($idVisiteur, $leMois);
        echo json_encode($lesFraisForfait);
        break;
    case 'fraisHorsForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $leMois = json_decode($_GET['m'], false); //contient mois sélectionné dans liste
        $idVisiteur = json_decode($_GET['q'], false); //contient le visiteur sélectionné dans liste
        $lesFraisHorsForfait = $pdo->getLesFraisHorsForfait($idVisiteur, $leMois);
        echo json_encode($lesFraisHorsForfait);
        break;
    case 'justificatifs':
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $idVisiteur = json_decode($_GET['q'], false);
        $leMois = json_decode($_GET['m'], false);
        $nbJustificatifs = $pdo->getNbjustificatifs($idVisiteur, $leMois);
        echo json_encode($nbJustificatifs);
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
            echo json_encode($lesFrais);
        } else {
            ajouterErreur('Les valeurs des frais doivent être numériques');
            foreach ($_REQUEST['erreurs'] as $erreur) {
                $erreurjson = $erreur;
            }
            echo json_encode($erreurjson);
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
            echo json_encode($erreurjson);
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
            echo json_encode($erreurjson);
        }
        break;
    case 'refuserFraisHorsForfait':
        require_once '../includes/fct.inc.php';
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8");
        $ligne = json_decode($_GET['ligne'], false);
        $pdo->refuserFraisHorsForfait($ligne);
        echo json_encode('Refus OK.');
        break;
}
