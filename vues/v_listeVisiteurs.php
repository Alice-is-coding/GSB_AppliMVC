<?php
/**
 * Gestion des visiteurs
 *
 * PHP Version 7
 *
 * @category  PPE
 * @package   GSB
 * @author    Alice B.
 */
?>
<div class="row">
    <h4>Choisir le visiteur : </h4>
    <div class="col-md-4">
        <form method="post"
              action="index.php?uc=validerFrais&action=selectionnerMois"
              role="form">
            <fieldset>
                <select name="Visiteurs">
                    <option></option>
                    <?php
                    foreach ($lesVisiteurs as $unVisiteur) {
                        $unPrenom = htmlspecialchars($unVisiteur['prenom']);
                        $unNom = htmlspecialchars($unVisiteur['nom']);
                        $unId = htmlspecialchars($unVisiteur['idVisiteur']);
                        ?>
                    <option><?php echo $unNom.' '.$unPrenom ?></option>
                        <?php
                    }
                    ?>
                </select>
                <h4>Mois:</h4>
                <select>
                    <?php $today = getdate(); ?>
                    <option><?php echo dateAnglaisVersFrancais($today) ?></option>
                </select>
            </fieldset>
        </form>
    </div>
</div>

