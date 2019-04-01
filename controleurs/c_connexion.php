<?php

/**
 * Gestion de la connexion
 *
 * PHP Version 7
 *
 * @category  PPE
 * @package   GSB
 * @author    Réseau CERTA <contact@reseaucerta.org>
 * @author    José GIL <jgil@ac-nice.fr>
 * @author    Alice BORD <alice.bord1@gmail.com>
 * @copyright 2017 Réseau CERTA
 * @license   Réseau CERTA
 * @version   GIT: <0>
 * @link      http://www.reseaucerta.org Contexte « Laboratoire GSB »
 */

$action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING);
if (!$uc) {
    $uc = 'demandeconnexion';
}

switch ($action) {
    case 'demandeConnexion':
        include 'vues/v_connexion.php';
        break;
    case 'valideConnexion':
        //$pdo->chiffrementDonnees(); [A SERVI POUR CHIFFRER L'ENSEMBLE DES MDP : A NE PAS DECOMMENTER]
        // Récupération du login saisi.
        $login = filter_input(INPUT_POST, 'login', FILTER_SANITIZE_STRING);
        // Récupération du mot de passe saisi.
        $mdp = filter_input(INPUT_POST, 'mdp', FILTER_SANITIZE_STRING);
        // Récupération des informations de l'utilisateur.
        $utilisateur = $pdo->getInfosUtilisateur($login);
        // Si $utilisateur n'est pas un tableau :
        if (!is_array($utilisateur)) {
            // Message d'erreur et retour à la page de connexion.
            ajouterErreur('Login ou mot de passe incorrect');
            include 'vues/v_erreurs.php';
            include 'vues/v_connexion.php';
        } else {
            // S'il s'agit d'un tableau, on verifie que le mot de passe saisi correspond au mot de passe hashé.
            if (password_verify($mdp, $utilisateur['mdp'])) {
                $id = $utilisateur['id'];
                $nom = $utilisateur['nom'];
                $prenom = $utilisateur['prenom'];
                $typeusr = $utilisateur['typeUser'];
                // Connexion de l'utilisateur.
                connecter($id, $nom, $prenom, $typeusr);
                header('Location: index.php');
            }
        }
        break;
    default:
        include 'vues/v_connexion.php';
        break;
}
