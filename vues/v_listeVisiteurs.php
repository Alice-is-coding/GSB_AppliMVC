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
    <div id="resultat">
    </div>
    <div class="col-md-5">
         <form action="index.php?uc=validerFrais&action=selectionnerMois" 
               method="post" role="form">
            <div class="form-group">
                <label for="lstVisiteurs" accesskey="n">Choisir un visiteur:</label>
                <select name="Visiteurs" id="lstVisiteurs" onchange="selectMoisDispos(this.value)">
                        "> 
                    <option value="0"></option>
                    <?php
                    foreach ($lesVisiteurs as $unVisiteur) {
                        $unPrenom = htmlspecialchars($unVisiteur['prenom']);
                        $unNom = htmlspecialchars($unVisiteur['nom']);
                        $unId = htmlspecialchars($unVisiteur['idVisiteur']);
                        ?>
                        <option value="<?php echo $unId ?>"><?php echo $unNom.' '.$unPrenom ?></option>
                        <?php
                    }
                    ?>
                </select>
            </div>
        </form>
    </div>
</div>

