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

$action = 'selectionnerMois';
$idVisiteur = $_SESSION['idUtilisateur'];
switch ($action) {
    case 'selectionnerMois':
        $unVisiteur = $_GET['Visiteurs'];
        $lesMois = $pdo->getLesMoisDisponibles($idVisiteur);
        $lesCles = array_keys($lesMois);
        $moisASelectionner = $lesCles[0];
        include 'vues/v_listeMois_comptable.php';
        break;
}
