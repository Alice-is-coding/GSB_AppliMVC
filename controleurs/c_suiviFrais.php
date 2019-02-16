<?php
/**
 * Gestion de la validation des frais
 *
 * PHP Version 7
 *
 * @category  PPE
 * @package   GSB
 * @author    Alice BORD <alice.bord1@gmail.com>
 * @license   Réseau CERTA
 * @link      http://www.reseaucerta.org Contexte « Laboratoire GSB »
 */

$action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING);
switch ($action) {
    case 'selectionnerEtatFrais':
        $lesVisiteurs = $pdo->getLesVisiteurs();
        $lesEtats = $pdo->getEtatsPourSuiviPaiement();
        include 'vues/v_listeVisiteurs.php';
        include 'vues/v_listeEtats.php';
        include 'vues/v_listeMois_comptable.php';
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
        //vient de la fonction js selectInfosFicheFrais
        require_once '../includes/class.pdogsb.inc.php';
        header('Content-Type: application/json; charset=UTF-8'); //entête HTTP : informe de l'utilisation du format json 
        $pdo = PdoGsb::getPdoGsb();
        $idvisiteur = json_decode($_GET['q'], false);
        $mois = json_decode($_GET['m'], false);
        $infosFrais = $pdo->getLesInfosFicheFrais($idvisiteur, $mois);
        echo json_encode($infosFrais);
        break;
}