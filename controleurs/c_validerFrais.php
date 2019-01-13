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
    case 'selectionnerVisiteurMois':
        $lesVisiteurs = $pdo->getLesVisiteurs();
        if (isset($_POST['Visiteurs'])) {
            $idVisiteur = $_POST['Visiteurs'];
            $lesMois = $pdo->getLesMoisDisponibles($idVisiteur);
            if (!(empty($lesMois))) {
                $lesCles = array_keys($lesMois);
                $moisASelectionner = $lesCles[0];
            } else {
                echo 'Pas de fiche de frais pour ce visiteur ce mois-ci';
            }
        }
        include 'vues/v_listeVisiteurs.php';
        include 'vues/v_listeMois_comptable.php';
        break;
    /*case 'voirEtatFrais':
        $leMois = filter_input(INPUT_POST, 'lstMois', FILTER_SANITIZE_STRING);
        $lesMois = $pdo->getLesMoisDisponibles($idVisiteur);
        $moisASelectionner = $leMois;
        include 'vues/v_listeMois_comptable.php';
        $lesFraisHorsForfait = $pdo->getLesFraisHorsForfait($idVisiteur, $leMois);
        $lesFraisForfait = $pdo->getLesFraisForfait($idVisiteur, $leMois);
        $lesInfosFicheFrais = $pdo->getLesInfosFicheFrais($idVisiteur, $leMois);
        $numAnnee = substr($leMois, 0, 4);
        $numMois = substr($leMois, 4, 2);
        $libEtat = $lesInfosFicheFrais['libEtat'];
        $montantValide = $lesInfosFicheFrais['montantValide'];
        $nbJustificatifs = $lesInfosFicheFrais['nbJustificatifs'];
        $dateModif = dateAnglaisVersFrancais($lesInfosFicheFrais['dateModif']);
        include 'vues/v_etatFrais.php';*/
        
}
// $lesFraisHorsForfait = $pdo->getLesFraisHorsForfait($idVisiteur, $mois);
// $lesFraisForfait = $pdo->getLesFraisForfait($idVisiteur, $mois);
// require 'vues/v_listeFraisForfait_compta.php';
// require 'vues/v_listeFraisHorsForfait_compta.php';
