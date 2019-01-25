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
    case 'validerMajFraisForfait':
        $lesFrais = filter_input(INPUT_POST, 'lesFrais', FILTER_DEFAULT, FILTER_FORCE_ARRAY);
        if (lesQteFraisValides($lesFrais)) {
            $pdo->majFraisForfait($idVisiteur, $mois, $lesFrais);
        } else {
            ajouterErreur('Les valeurs des frais doivent être numériques');
            include 'vues/v_erreurs.php';
        }
        break;
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
    case 'validationFrais':
        require_once '../include/class.pdogsb.inc.php';
        header("Content-Type: application/json; charset=UTF-8");
        $leMois = json_decode($_GET['m'], false); //contient mois sélectionné dans liste
        $lesFraisHorsForfait = $pdo->getLesFraisHorsForfait($idVisiteur, $leMois);
        $lesFraisForfait = $pdo->getLesFraisForfait($idVisiteur, $leMois);
}
