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
if (isset($_REQUEST['q'])) {
    $action = 'selectionnerMois';
}
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
        $q = filter_input($_REQUEST, 'q'); //contient le visiteur sélectionné dans la liste
        $mois = "";
        
        //test si requête != vide
        if ($q !== "") {
            $lesMois = $pdo->getLesMoisDisponibles($q);
        }
            include 'vues/v_listeMois_comptable.php';
            //include 'vues/v_listeFraisForfait_compta.php';
            //include 'vues/v_listeFraisHorsForfait_compta.php';
        break;
    case 'validationFrais':
        $leMois = filter_input(INPUT_POST, 'Mois', FILTER_SANITIZE_STRING);
        $moisASelectionner = $leMois;
        include 'vues/v_listeVisiteurs.php';
        include 'vues/v_listeMois_comptable.php';
        $lesFraisHorsForfait = $pdo->getLesFraisHorsForfait($idVisiteur, $leMois);
        $lesFraisForfait = $pdo->getLesFraisForfait($idVisiteur, $leMois);
}
