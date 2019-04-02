<?php

/**
 * Classe d'accès aux données.
 *
 * PHP Version 7
 *
 * @category  PPE
 * @package   GSB
 * @author    Cheri Bibi - Réseau CERTA <contact@reseaucerta.org>
 * @author    José GIL - CNED <jgil@ac-nice.fr>
 * @author    Alice BORD <alice.bord1@gmail.com>
 * @copyright 2017 Réseau CERTA
 * @license   Réseau CERTA
 * @version   GIT: <0>
 * @link      http://www.php.net/manual/fr/book.pdo.php PHP Data Objects sur php.net
 */

/**
 * Classe d'accès aux données.
 *
 * Utilise les services de la classe PDO
 * pour l'application GSB
 * Les attributs sont tous statiques,
 * les 4 premiers pour la connexion
 * $monPdo de type PDO
 * $monPdoGsb qui contiendra l'unique instance de la classe
 *
 * PHP Version 7
 *
 * @category  PPE
 * @package   GSB
 * @author    Cheri Bibi - Réseau CERTA <contact@reseaucerta.org>
 * @author    José GIL <jgil@ac-nice.fr>
 * @author    Alice BORD <alice.bord1@gmail.com>
 * @copyright 2017 Réseau CERTA
 * @license   Réseau CERTA
 * @link      http://www.php.net/manual/fr/book.pdo.php PHP Data Objects sur php.net
 */
class PdoGsb
{

    /** @var String $serveur  Information de connexion  au serveur de base de données. */
    private static $serveur = 'mysql:host=localhost';

    /** @var String $bdd       Nom de la base de données. */
    private static $bdd = 'dbname=gsb_frais';

    /** @var String $user      Nom d'utilisateur pour connexion à la base de données. */
    private static $user = 'userGsb';

    /** @var String $mdp       Mot de passe de connexion. */
    private static $mdp = 'secret';

    /** @var PDO $monPdo       Instance de la classe PDO pour se connecter à la base de données. */
    private static $monPdo;

    /**
     * @var PdoGsb $monPdoGsb  Unique instance de la classe PdoGsb pour
     *                         pouvoir utiliser les méthodes de la classe et
     *                         intéragir avec la base de données.
     */
    private static $monPdoGsb = null;

    /**
     * Constructeur privé, crée l'instance de PDO qui sera sollicitée
     * pour toutes les méthodes de la classe.
     */
    private function __construct()
    {
        PdoGsb::$monPdo = new PDO(
            PdoGsb::$serveur . ';' . PdoGsb::$bdd,
            PdoGsb::$user,
            PdoGsb::$mdp
        );
        PdoGsb::$monPdo->query('SET CHARACTER SET utf8');
    }

    /**
     * Méthode destructeur appelée dès qu'il n'y a plus de référence sur un
     * objet donné, ou dans n'importe quel ordre pendant la séquence d'arrêt.
     */
    public function __destruct()
    {
        PdoGsb::$monPdo = null;
    }

    /**
     * Fonction statique qui crée l'unique instance de la classe
     * Appel : $instancePdoGsb = PdoGsb::getPdoGsb();
     *
     * @return L'unique objet de la classe PdoGsb.
     */
    public static function getPdoGsb()
    {
        if (PdoGsb::$monPdoGsb == null) {
            PdoGsb::$monPdoGsb = new PdoGsb();
        }
        return PdoGsb::$monPdoGsb;
    }

    /**
     * Chiffrement de l'ensemble des mots de passe utilisateurs de la base de données.
     */
    public function chiffrementDonnees()
    {
        // Récupération de l'ensemble des mots de passe des utilisateurs.
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT utilisateur.id, utilisateur.nom, utilisateur.prenom, '
            . 'utilisateur.login, utilisateur.mdp, '
            . 'utilisateur.adresse, utilisateur.cp, '
            . 'utilisateur.ville '
            . 'FROM utilisateur'
        );
        $requetePrepare->execute();
        // Stockage du résultat dans la variable lesUtilisateurs.
        $lesUtilisateurs = $requetePrepare->fetchAll();
        // Parcours des informations des utilisateurs.
        for ($i = 0; $i < count($lesUtilisateurs); $i++) {
            // Récupération du mot de passe.
            $infoUser = $lesUtilisateurs[$i]['mdp'];
            // Chiffrement du mot de passe avec l'algorithme de chiffrement BCRYPT.
            $infoUserChiffre = password_hash($infoUser, PASSWORD_BCRYPT);
            // Mise à jour de la table avec le mot de passe chiffré.
            $requetePrepare = PdoGsb::$monPdo->prepare(
                'UPDATE utilisateur '
                . 'SET utilisateur.mdp = :infoUser '
                . 'WHERE utilisateur.id = :unId'
            );
            $requetePrepare->bindParam(':infoUser', $infoUserChiffre, PDO::PARAM_STR);
            $requetePrepare->bindParam(':unId', $lesUtilisateurs[$i]['id'], PDO::PARAM_STR);
            $requetePrepare->execute();
        }
    }

    /**
     * Retourne les informations d'un utilisateur.
     *
     * @param String Login de l'utilisateur.
     *
     * @return L'id, le nom et le prénom sous la forme d'un tableau associatif.
     */
    public function getInfosUtilisateur($login)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT utilisateur.id AS id, utilisateur.mdp AS mdp, '
            . 'utilisateur.nom AS nom, '
            . 'utilisateur.prenom AS prenom, '
            . 'utilisateur.idTypeusr AS typeUser '
            . 'FROM utilisateur '
            . 'WHERE utilisateur.login = :unLogin'
        );
        $requetePrepare->bindParam(':unLogin', $login, PDO::PARAM_STR);
        $requetePrepare->execute();
        return $requetePrepare->fetch();
    }

    /**
     * Retourne tous les utilisateurs de type "Visiteur".
     *
     * @return Id, nom, prenom des visiteurs médicaux.
     */
    public function getLesVisiteurs()
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT id as idVisiteur, nom as nom, prenom as prenom '
            . 'FROM utilisateur '
            . 'WHERE utilisateur.idTypeusr = 1'
        );
        $requetePrepare->execute();
        return $requetePrepare->fetchAll();
    }

    /**
     * Retourne l'id d'un visiteur sélectionné selon son nom et son prenom.
     *
     * @param String $nom      Nom du visiteur.
     * @param String $prenom   Prenom du visiteur.
     * @return String          L'id du visiteur.
     */
    public function getIdVisiteur($nom, $prenom)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT id FROM utilisateur '
            . 'WHERE utilisateur.nom = :unNom '
            . 'AND utilisateur.prenom = :unPrenom '
        );
        $requetePrepare->bindParam(':unNom', $nom, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unPrenom', $prenom, PDO::PARAM_STR);
        $requetePrepare->execute();
        return $requetePrepare->fetch();
    }

    /**
     * Retourne sous forme d'un tableau associatif toutes les lignes de frais
     * hors forfait concernées par les deux arguments.
     * La boucle foreach ne peut être utilisée ici car on procède
     * à une modification de la structure itérée - transformation du champ date.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     *
     * @return Tous les champs des lignes de frais hors forfait sous la forme
     * d'un tableau associatif.
     */
    public function getLesFraisHorsForfait($idVisiteur, $mois)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT * FROM lignefraishorsforfait '
            . 'WHERE lignefraishorsforfait.idvisiteur = :unIdVisiteur '
            . 'AND lignefraishorsforfait.mois = :unMois'
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
        $lesLignes = $requetePrepare->fetchAll();
        for ($i = 0; $i < count($lesLignes); $i++) {
            $date = $lesLignes[$i]['date'];
            $lesLignes[$i]['date'] = dateAnglaisVersFrancais($date);
        }
        return $lesLignes;
    }

    /**
     * Récupère le montant des frais hors forfait non refusés
     * pour un visiteur et un mois précis.
     * @param String $idVisiteur  Id du visiteur.
     * @param Stirng $mois        Mois concerné.
     * @return Array $lesLignes Tableau des montants des frais HF.
     */
    public function getLesFraisHorsForfaitPourValidation($idVisiteur, $mois)
    {
        $requetePrepapre = PdoGsb::$monPdo->prepare(
            'SELECT lignefraishorsforfait.montant '
            . 'FROM lignefraishorsforfait '
            . 'WHERE lignefraishorsforfait.libelle NOT LIKE "%[REFUSE]%" '
            . 'AND lignefraishorsforfait.idvisiteur = :unVisiteur '
            . 'AND lignefraishorsforfait.mois = :unMois'
        );
        $requetePrepapre->bindParam(':unVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepapre->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepapre->execute();
        $lesLignes = $requetePrepapre->fetchAll();
        return $lesLignes;
    }

    /**
     * Retourne le nombre de justificatif d'un visiteur pour un mois donné.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     *
     * @return Le nombre entier de justificatifs.
     */
    public function getNbjustificatifs($idVisiteur, $mois)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT fichefrais.nbjustificatifs as nb FROM fichefrais '
            . 'WHERE fichefrais.idvisiteur = :unIdVisiteur '
            . 'AND fichefrais.mois = :unMois'
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
        $laLigne = $requetePrepare->fetch();
        return $laLigne['nb'];
    }

    /**
     * Retourne sous forme d'un tableau associatif toutes les lignes de frais
     * au forfait concernées par les deux arguments.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     *
     * @return L'id, le libelle et la quantité sous la forme d'un tableau
     *        associatif.
     */
    public function getLesFraisForfait($idVisiteur, $mois)
    {
        $requetePrepare = PdoGSB::$monPdo->prepare(
            'SELECT fraisforfait.id as idfrais, '
            . 'fraisforfait.libelle as libelle, '
            . 'lignefraisforfait.quantite as quantite '
            . 'FROM lignefraisforfait '
            . 'INNER JOIN fraisforfait '
            . 'ON fraisforfait.id = lignefraisforfait.idfraisforfait '
            . 'WHERE lignefraisforfait.idvisiteur = :unIdVisiteur '
            . 'AND lignefraisforfait.mois = :unMois '
            . 'ORDER BY lignefraisforfait.idfraisforfait'
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
        return $requetePrepare->fetchAll();
    }

    /**
     * Retourne tous les id de la table FraisForfait.
     *
     * @return Un tableau associatif.
     */
    public function getLesIdFrais()
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT fraisforfait.id as idfrais '
            . 'FROM fraisforfait ORDER BY fraisforfait.id'
        );
        $requetePrepare->execute();
        return $requetePrepare->fetchAll();
    }

    /**
     * Retourne tous les id de la table fraisForfait avec leur montant respectif.
     *
     * @return Array un tableau associatif.
     */
    public function getMontantDesIdFrais()
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT fraisforfait.id as idfrais, '
            . 'fraisforfait.montant as montant '
            . 'FROM fraisforfait ORDER BY fraisforfait.id'
        );
        $requetePrepare->execute();
        return $requetePrepare->fetchAll();
    }

    /**
     * Met à jour la table ligneFraisForfait.
     * Met à jour la table ligneFraisForfait pour un visiteur et
     * un mois donné en enregistrant les nouveaux montants.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     * @param Array  $lesFrais   Tableau associatif de clé idFrais et
     *                           de valeur la quantité pour ce frais.
     *
     * @return null
     */
    public function majFraisForfait($idVisiteur, $mois, $lesFrais)
    {
        $lesCles = array_keys($lesFrais);
        foreach ($lesCles as $unIdFrais) {
            $qte = $lesFrais[$unIdFrais];
            $requetePrepare = PdoGSB::$monPdo->prepare(
                'UPDATE lignefraisforfait '
                . 'SET lignefraisforfait.quantite = :uneQte '
                . 'WHERE lignefraisforfait.idvisiteur = :unIdVisiteur '
                . 'AND lignefraisforfait.mois = :unMois '
                . 'AND lignefraisforfait.idfraisforfait = :idFrais'
            );
            $requetePrepare->bindParam(':uneQte', $qte, PDO::PARAM_INT);
            $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
            $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
            $requetePrepare->bindParam(':idFrais', $unIdFrais, PDO::PARAM_STR);
            $requetePrepare->execute();
        }
    }

    /**
     * Met à jour un frais HF bien précis :
     * tronque le libelle si jamais il dépasse maxLength du champ libelle.
     *
     * @param array $lesFrais Liste des frais HF ({date: data ; libelle: data ; montant: data}).
     * @param integer $id IdLigne.
     */
    public function majFraisHorsForfait($lesFrais, $id)
    {
        // Conversion date français vers anglais pour être acceptée par phpmyadmin.
        $maDate = dateFrancaisVersAnglais($lesFrais['date']);

        // Test : si libelle > 100 caractères alors on le tronque par la fin au nb
        // caractères max du champ libelle.
        if (strlen($lesFrais['libelle']) > 100) {
            $lesFrais['libelle'] = substr($lesFrais['libelle'], 0, 100);
        }

        $requetePrepare = PdoGsb::$monPdo->prepare(
            'UPDATE lignefraishorsforfait '
            . 'SET lignefraishorsforfait.libelle = :unLibelle, '
            . 'lignefraishorsforfait.date = :uneDate, '
            . 'lignefraishorsforfait.montant = :unMontant '
            . 'WHERE lignefraishorsforfait.id = :unId'
        );
        $requetePrepare->bindParam(':unLibelle', $lesFrais['libelle'], PDO::PARAM_STR);
        $requetePrepare->bindParam(':uneDate', $maDate, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMontant', $lesFrais['montant'], PDO::PARAM_STR);
        $requetePrepare->bindParam(':unId', $id, PDO::PARAM_INT);
        $requetePrepare->execute();
    }

    /**
     * Récupère une ligne de frais hors forfait.
     * 
     * @param Integer $ligne Contient la ligne concernée.
     * @return Array         Un tableau avec l'ensemble des infos pour cette ligne.
     */
    public function ligneFraisHorsForfait($ligne) {
        $requetePrepare = PdoGsb::$monPdo->prepare(
                'SELECT * '
                . 'FROM lignefraishorsforfait '
                . 'WHERE lignefraishorsforfait.id = :unId'
                );
        $requetePrepare->bindParam(':unId', $ligne, PDO::PARAM_INT);
        $requetePrepare->execute();
        return $requetePrepare->fetchAll();
    }
    
    /**
     * Effectue la requête de modification pour préciser [REFUSE] devant un frais refusé.
     *
     * @param integer $id L'id du visiteur.
     */
    public function refuserFraisHorsForfait($id)
    {
        $laLigneFraisHF = $this->ligneFraisHorsForfait($id);
        foreach ($laLigneFraisHF as $ligne) {
            $leLibelle = '[REFUSE]' . $ligne['libelle'];
        }
        if(strlen($leLibelle) > 100) {
            $leLibelle = substr($leLibelle, 0, 100);
        }
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'UPDATE lignefraishorsforfait '
            . 'SET lignefraishorsforfait.libelle = :unLibelleRefuse '
            . 'WHERE lignefraishorsforfait.id = :unId '
            . 'AND lignefraishorsforfait.libelle NOT LIKE "%[REFUSE]%"'
        );
        $requetePrepare->bindParam(':unLibelleRefuse', $leLibelle, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unId', $id, PDO::PARAM_INT);
        $requetePrepare->execute();
    }

    /**
     * Reporte le frais HF, dont l'id est passé en paramètre, au mois suivant.
     *
     * @param Integer $id
     * @param String $idVisiteur
     */
    public function reporterFraisHorsForfait($id, $idVisiteur)
    {
        // Requête update pour modifier le mois de la ligne concernée afin que le frais HF soit reporté.
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'UPDATE lignefraishorsforfait '
            . 'SET lignefraishorsforfait.mois = (SELECT MAX(fichefrais.mois) '
            . 'FROM fichefrais '
            . 'WHERE fichefrais.idvisiteur = :unVisiteur) '
            . 'WHERE lignefraishorsforfait.id = :unId '
        );
        $requetePrepare->bindParam(':unVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unId', $id, PDO::PARAM_INT);
        $requetePrepare->execute();
    }

    /**
     * Créer une nouvelle fiche de frais pour reporter un frais hors forfait
     * même requête que fonction creeNouvelleLigneFrais SAUF qu'il n'y a pas de
     * passage de l'état CR à CL puisque la fiche actuelle doit encore être en
     * Etat CR.
     *
     * @param String $idVisiteur  Id du visiteur
     * @param String $mois        Mois concerné
     */
    public function creerNouvelleLigneFraisPourReport($idVisiteur, $mois)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'INSERT INTO fichefrais (idvisiteur,mois,nbjustificatifs,'
            . 'montantvalide,datemodif,idetat) '
            . "VALUES (:unIdVisiteur,:unMois,0,0,now(),'CR')"
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
        $lesIdFrais = $this->getLesIdFrais();
        foreach ($lesIdFrais as $unIdFrais) {
            $requetePrepare = PdoGsb::$monPdo->prepare(
                'INSERT INTO lignefraisforfait (idvisiteur,mois,'
                . 'idfraisforfait,quantite) '
                . 'VALUES(:unIdVisiteur, :unMois, :idFrais, 0)'
            );
            $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
            $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
            $requetePrepare->bindParam(
                ':idFrais',
                $unIdFrais['idfrais'],
                PDO::PARAM_STR
            );
            $requetePrepare->execute();
        }
    }

    /**
     * Met à jour le nombre de justificatifs de la table ficheFrais
     * pour le mois et le visiteur concerné.
     *
     * @param String  $idVisiteur      ID du visiteur.
     * @param String  $mois            Mois sous la forme aaaamm.
     * @param Integer $nbJustificatifs Nombre de justificatifs.
     *
     * @return null
     */
    public function majNbJustificatifs($idVisiteur, $mois, $nbJustificatifs)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'UPDATE fichefrais '
            . 'SET nbjustificatifs = :unNbJustificatifs '
            . 'WHERE fichefrais.idvisiteur = :unIdVisiteur '
            . 'AND fichefrais.mois = :unMois'
        );
        $requetePrepare->bindParam(
            ':unNbJustificatifs',
            $nbJustificatifs,
            PDO::PARAM_INT
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
    }

    /**
     * Teste si un visiteur possède une fiche de frais pour le mois passé en argument.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     *
     * @return vrai ou faux
     */
    public function estPremierFraisMois($idVisiteur, $mois)
    {
        $boolReturn = false;
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT fichefrais.mois FROM fichefrais '
            . 'WHERE fichefrais.mois = :unMois '
            . 'AND fichefrais.idvisiteur = :unIdVisiteur'
        );
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->execute();
        if (!$requetePrepare->fetch()) {
            $boolReturn = true;
        }
        return $boolReturn;
    }

    /**
     * Retourne le dernier mois en cours d'un visiteur.
     *
     * @param String $idVisiteur ID du visiteur.
     *
     * @return Le mois sous la forme aaaamm.
     */
    public function dernierMoisSaisi($idVisiteur)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT MAX(mois) as dernierMois '
            . 'FROM fichefrais '
            . 'WHERE fichefrais.idvisiteur = :unIdVisiteur'
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->execute();
        $laLigne = $requetePrepare->fetch();
        $dernierMois = $laLigne['dernierMois'];
        return $dernierMois;
    }

    /**
     * Crée une nouvelle fiche de frais et les lignes de frais au forfait
     * pour un visiteur et un mois donnés.
     *
     * Récupère le dernier mois en cours de traitement, met à 'CL' son champs
     * idEtat, crée une nouvelle fiche de frais avec un idEtat à 'CR' et crée
     * les lignes de frais forfait de quantités nulles.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     *
     * @return null
     */
    public function creeNouvellesLignesFrais($idVisiteur, $mois)
    {
        $dernierMois = $this->dernierMoisSaisi($idVisiteur);
        $laDerniereFiche = $this->getLesInfosFicheFrais($idVisiteur, $dernierMois);
        if ($laDerniereFiche['idEtat'] == 'CR') {
            $this->majEtatFicheFrais($idVisiteur, $dernierMois, 'CL');
        }
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'INSERT INTO fichefrais (idvisiteur,mois,nbjustificatifs,'
            . 'montantvalide,datemodif,idetat) '
            . "VALUES (:unIdVisiteur,:unMois,0,0,now(),'CR')"
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
        $lesIdFrais = $this->getLesIdFrais();
        foreach ($lesIdFrais as $unIdFrais) {
            $requetePrepare = PdoGsb::$monPdo->prepare(
                'INSERT INTO lignefraisforfait (idvisiteur,mois,'
                . 'idfraisforfait,quantite) '
                . 'VALUES(:unIdVisiteur, :unMois, :idFrais, 0)'
            );
            $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
            $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
            $requetePrepare->bindParam(
                ':idFrais',
                $unIdFrais['idfrais'],
                PDO::PARAM_STR
            );
            $requetePrepare->execute();
        }
    }

    /**
     * Crée un nouveau frais hors forfait pour un visiteur un mois donné
     * à partir des informations fournies en paramètre.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     * @param String $libelle    Libellé du frais.
     * @param String $date       Date du frais au format français jj//mm/aaaa.
     * @param Float  $montant    Montant du frais.
     *
     * @return null
     */
    public function creeNouveauFraisHorsForfait(
        $idVisiteur,
        $mois,
        $libelle,
        $date,
        $montant
    ) {
        $dateFr = dateFrancaisVersAnglais($date);
        $requetePrepare = PdoGSB::$monPdo->prepare(
            'INSERT INTO lignefraishorsforfait '
            . 'VALUES (null, :unIdVisiteur,:unMois, :unLibelle, :uneDateFr,'
            . ':unMontant) '
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unLibelle', $libelle, PDO::PARAM_STR);
        $requetePrepare->bindParam(':uneDateFr', $dateFr, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMontant', $montant, PDO::PARAM_STR);
        $requetePrepare->execute();
    }

    /**
     * Supprime le frais hors forfait dont l'id est passé en argument.
     *
     * @param String $idFrais ID du frais.
     *
     * @return null
     */
    public function supprimerFraisHorsForfait($idFrais)
    {
        $requetePrepare = PdoGSB::$monPdo->prepare(
            'DELETE FROM lignefraishorsforfait '
            . 'WHERE lignefraishorsforfait.id = :unIdFrais'
        );
        $requetePrepare->bindParam(':unIdFrais', $idFrais, PDO::PARAM_STR);
        $requetePrepare->execute();
    }

    /**
     * Retourne les mois pour lesquel un visiteur a une fiche de frais.
     *
     * @param String $idVisiteur ID du visiteur.
     *
     * @return Un tableau associatif de clé un mois -aaaamm- et de valeurs
     *         l'année et le mois correspondant.
     */
    public function getLesMoisDisponibles($idVisiteur)
    {
        $requetePrepare = PdoGSB::$monPdo->prepare(
            'SELECT fichefrais.mois AS mois FROM fichefrais '
            . 'WHERE fichefrais.idvisiteur = :unIdVisiteur '
            . 'ORDER BY fichefrais.mois desc'
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->execute();
        $lesMois = array();
        while ($laLigne = $requetePrepare->fetch()) {
            $mois = $laLigne['mois'];
            $numAnnee = substr($mois, 0, 4);
            $numMois = substr($mois, 4, 2);
            $lesMois[] = array(
                'mois' => $mois,
                'numAnnee' => $numAnnee,
                'numMois' => $numMois
            );
        }
        return $lesMois;
    }

    /**
     * Retourne les informations d'une fiche de frais d'un visiteur pour un
     * mois donné.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     *
     * @return Un tableau avec des champs de jointure entre une fiche de frais
     *         et la ligne d'état.
     */
    public function getLesInfosFicheFrais($idVisiteur, $mois)
    {
        $requetePrepare = PdoGSB::$monPdo->prepare(
            'SELECT fichefrais.idetat as idEtat, '
            . 'fichefrais.datemodif as dateModif,'
            . 'fichefrais.nbjustificatifs as nbJustificatifs, '
            . 'fichefrais.montantvalide as montantValide, '
            . 'etat.libelle as libEtat '
            . 'FROM fichefrais '
            . 'INNER JOIN etat ON fichefrais.idetat = etat.id '
            . 'WHERE fichefrais.idvisiteur = :unIdVisiteur '
            . 'AND fichefrais.mois = :unMois'
        );
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
        $laLigne = $requetePrepare->fetch();
        return $laLigne;
    }

    /**
     * Modifie l'état et la date de modification d'une fiche de frais.
     * Modifie le champ idEtat et met la date de modif à aujourd'hui.
     *
     * @param String $idVisiteur ID du visiteur.
     * @param String $mois       Mois sous la forme aaaamm.
     * @param String $etat       Nouvel état de la fiche de frais.
     *
     * @return null
     */
    public function majEtatFicheFrais($idVisiteur, $mois, $etat)
    {
        $requetePrepare = PdoGSB::$monPdo->prepare(
            'UPDATE fichefrais '
            . 'SET fichefrais.idetat = :unEtat, fichefrais.datemodif = now() '
            . 'WHERE fichefrais.idvisiteur = :unIdVisiteur '
            . 'AND fichefrais.mois = :unMois'
        );
        $requetePrepare->bindParam(':unEtat', $etat, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unIdVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
    }

    /**
     * Calcul le total des frais hors forfait d'un tableau de frais HF envoyé en argument.
     *
     * @param Array $lesFraisHF   Tableau associatif des frais hors forfait.
     * @return Float              Montant total € des frais hors forfait.
     */
    public function calculMontantTotalFraisHF($lesFraisHF)
    {
        // Declaration/
        $montantTotalFraisHF = 0; // Contiendra le total € des frais forfait.
        // Calcul du montant total des frais hors forfait.
        for ($i = 0; $i < count($lesFraisHF); $i++) {
            $montantTotalFraisHF += $lesFraisHF[$i]['montant'];
        }

        return $montantTotalFraisHF;
    }

    /**
     * Calcul le total des frais forfait d'un tableau de frais F envoyé en param.
     *
     * @param Array $lesFraisF    Tableau associatif des frais forfait.
     * @return Float              Montant total € des frais forfait.
     */
    public function calculMontantTotalFraisF($lesFraisF)
    {
        // Declaration.
        $montantTotalFraisF = 0; // Contiendra le total € des frais hors forfait.
        $montantIdFrais = $this->getMontantDesIdFrais(); // Valorisé avec les montants réglementés des frais F.
        $lesClesforfaitF = array_keys($lesFraisF); // Récupération de toutes les cles des frais F.
        $lesClesIdFrais = array_keys($montantIdFrais); // Récupération de toutes les cles
                                                       // des montants de frais réglementés.
        // Calcul du montant total des frais forfait :
        // Quantité de frais * montant réglementaire .
        foreach ($lesClesIdFrais as $unMontantReglementaire) {
            foreach ($lesClesforfaitF as $unIdFraisF) {
                if ($lesFraisF[$unIdFraisF]['idfrais'] == $montantIdFrais[$unMontantReglementaire]['idfrais']) {
                    $qte = $lesFraisF[$unIdFraisF]['quantite'];
                    $montantReglementaire = $montantIdFrais[$unMontantReglementaire]['montant'];
                    $montantTotalFraisF += $qte * $montantReglementaire;
                }
            }
        }
        return $montantTotalFraisF;
    }

    /**
     * Calcul le montant validé d'une fiche de frais (forfait et hors forfait)
     * pour un visiteur et un mois précis.
     *
     * @param String $idVisiteur    Id du visiteur.
     * @param String $mois          Le mois.
     * @param Array $lesFraisF      Tableau associatif des frais forfait.
     * @param Array $lesFraisHF     Tableau associatif des frais hors forfait.
     */
    public function majMontantFicheFrais($idVisiteur, $mois, $lesFraisF, $lesFraisHF)
    {
        // Récupération des calculs de totaux frais F et frais HF.
        $montantTotalFraisF = $this->calculMontantTotalFraisF($lesFraisF);
        $montantTotalFraisHF = $this->calculMontantTotalFraisHF($lesFraisHF);
        $montantTotal = $montantTotalFraisF + $montantTotalFraisHF;

        // Requête update table fichefrais pour affecter le montant validé
        // des frais pour un visiteur et un mois précis.
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'UPDATE fichefrais '
            . 'SET fichefrais.montantvalide = :unMontant '
            . 'WHERE fichefrais.idvisiteur = :unVisiteur '
            . 'AND fichefrais.mois = :unMois'
        );
        $requetePrepare->bindParam(':unMontant', $montantTotal, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unVisiteur', $idVisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unMois', $mois, PDO::PARAM_STR);
        $requetePrepare->execute();
    }

    /**
     * Récupère les états pour le suivi du paiement par les comptables.
     *
     * @return Array des etats.
     */
    public function getEtatsPourSuiviPaiement()
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT * '
            . 'FROM etat '
            . 'WHERE etat.id NOT IN ('
            . 'SELECT etat.id '
            . 'FROM etat '
            . 'WHERE etat.id = "CR" '
            . 'OR etat.id = "CL") '
            . 'ORDER BY etat.id DESC'
        );
        $requetePrepare->execute();
        return $requetePrepare->fetchAll();
    }

    /**
     * Retourne un tableau associatif des fiches de frais en fonction d'un etat choisi.
     *
     * @param String $etat                   Etat demandé pour récupérer les fiches
     *                                       selon ce critère.
     * @return Array des fiches de frais     Informations sur les fiches de frais.
     */
    public function getFichesFraisPourCompta($etat)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT fichefrais.idvisiteur, utilisateur.nom, utilisateur.prenom, '
            . 'fichefrais.mois, fichefrais.nbJustificatifs, '
            . 'fichefrais.montantvalide, fichefrais.datemodif '
            . 'FROM fichefrais JOIN utilisateur ON fichefrais.idVisiteur = '
            . 'utilisateur.id '
            . 'WHERE fichefrais.idetat = :unEtat'
        );
        $requetePrepare->bindParam(':unEtat', $etat, PDO::PARAM_STR);
        $requetePrepare->execute();
        return $requetePrepare->fetchAll();
    }

    /**
     * Récupère les mois disponibles pour un visiteur et un état passés en argument.
     *
     * @param String $idvisiteur   Visiteur concerné.
     * @param String $etat         Etat souhaité de la fiche.
     * @return Array               Tableau associatif des mois disponibles pour ce visiteur et cet état.
     */
    public function getMoisPourCompta($idvisiteur, $etat)
    {
        $requetePrepare = PdoGsb::$monPdo->prepare(
            'SELECT fichefrais.mois '
            . 'FROM fichefrais '
            . 'WHERE idvisiteur = :unVisiteur '
            . 'AND fichefrais.idetat = :unEtat'
        );
        $requetePrepare->bindParam(':unVisiteur', $idvisiteur, PDO::PARAM_STR);
        $requetePrepare->bindParam(':unEtat', $etat, PDO::PARAM_STR);
        $requetePrepare->execute();
        $lesMois = array();
        while ($laLigne = $requetePrepare->fetch()) {
            $mois = $laLigne['mois'];
            $numAnnee = substr($mois, 0, 4);
            $numMois = substr($mois, 4, 2);
            $lesMois[] = array(
                'mois' => $mois,
                'numAnnee' => $numAnnee,
                'numMois' => $numMois
            );
        }
        return $lesMois;
    }
}
