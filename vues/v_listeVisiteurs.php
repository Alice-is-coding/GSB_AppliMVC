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
    <h4>Choisir un visiteur : </h4>
    <div class="col-md-4">
        <form method="post"
              action="index.php?uc=gererFrais"
              role="form">
            <fieldset>
                <datalist>
                    <?php
                    foreach ($lesVisiteurs as $unVisiteur) {
                      $unPrenom = htmlspecialchars($unVisiteur['prenom']);
                      $unNom = htmlspecialchars($unVisiteur['nom']);
                    ?>
                    <OPTION><?php echo $unNom.' '.$unPrenom ?></OPTION>
                    <?php
                    }
                    ?>
                </datalist>
            </fieldset>
        </form>
    </div>
</div>

