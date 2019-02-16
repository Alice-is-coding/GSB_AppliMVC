<?php
/**
 * Vue Liste des mois
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
?>
<div class="row">
    <div class="col-md-4">
        <div id="lesEtats" class="form-group">
            <label for="lstEtat" accesskey="n">Etat : </label>
            <select id="lstEtats" name="Etat" class="form-control">
                <option value="0"></option>
                <?php
                foreach ($lesEtats as $unEtat) {
                    $unId = htmlspecialchars($unEtat['id']);
                    $unLibEtat = htmlspecialchars($unEtat['libelle']);
                    ?>
                <option value="<?php echo $unId ?>"><?php echo $unLibEtat ?></option>
                    <?php
                }
                ?>
            </select>
        </div>
        <button class="btn btn-success" type="button" onclick="selectMoisDispos()">Valider</button>
        <button class="btn btn-danger" type="reset" onclick="reinitialiser()">Réinitialiser</button>
    </div>
</div>
