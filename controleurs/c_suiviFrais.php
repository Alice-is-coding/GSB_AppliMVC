<?php
/**
 * Gestion du suivi des frais par les comptables
 *
 * @category  PPE
 * @package   GSB
 * @author    Réseau CERTA <contact@reseaucerta.org>
 * @author    Alice BORD <alice.bord1@gmail.com>
 * @copyright 2017 Réseau CERTA
 * @license   Réseau CERTA
 * @link      http://www.reseaucerta.org Contexte « Laboratoire GSB »
 */

$action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING);
switch ($action) {
    case 'selectionnerEtatFrais':
        //$lesVisiteurs = $pdo->getLesVisiteurs();
        $lesEtats = $pdo->getEtatsPourSuiviPaiement();
        include 'vues/v_listeEtats.php';
        include 'vues/v_listeVisiteurs.php';      
        include 'vues/v_listeMois_comptable.php';
        break;
    case 'selectionnerVisiteurs':
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header('Content-Type: application/json; charset=UTF-8');
        $etat = json_decode($_GET['etat'], false);
        $visiteurs = $pdo->getLesVisiteurs($etat);
        echo json_encode($visiteurs);
        break;
    case 'selectionnerMois':
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header('Content-Type: application/json; charset=UTF-8'); //entête HTTP : informe de l'utilisation du format json 
        $etat = json_decode($_GET['etat'], false);
        $idvisiteur = json_decode($_GET['q'], false);
        $mois = $pdo->getMoisPourCompta($idvisiteur, $etat);
        echo json_encode($mois);
        break;
    case 'majEtatFicheFrais':
        require_once '../includes/class.pdogsb.inc.php';
        $pdo = PdoGsb::getPdoGsb();
        header("Content-Type: application/json; charset=UTF-8"); //entête HTTP : informe de l'utilisation du format json 
        $idvisiteur = json_decode($_GET['q'], false);
        $mois = json_decode($_GET['m'], false);
        $etat = json_decode($_GET['etat'], false);
        $pdo->majEtatFicheFrais($idvisiteur, $mois, $etat);
        echo json_encode("Mise à jour fichefrais.idetat OK.");
        break;
    case 'infosFrais':
        require_once '../includes/class.pdogsb.inc.php';
        header('Content-Type: application/json; charset=UTF-8'); //entête HTTP : informe de l'utilisation du format json 
        $pdo = PdoGsb::getPdoGsb();
        $idvisiteur = json_decode($_GET['q'], false);
        $mois = json_decode($_GET['m'], false);
        $infosFrais = $pdo->getLesInfosFicheFrais($idvisiteur, $mois);
        echo json_encode($infosFrais);
        break;
}
