<?php
/**
 * Vue Liste des états
 *
 * PHP Version 7
 *
 * @category  PPE
 * @package   GSB
 * @author    Réseau CERTA <contact@reseaucerta.org>
 * @author    Alice BORD <alice.bord1@gmail.com>
 * @copyright 2017 Réseau CERTA
 * @license   Réseau CERTA
 * @link      http://www.reseaucerta.org Contexte « Laboratoire GSB »
 */
namespace gsb;

?>
<div class="row">
    <div class="col-md-4">
        <div id="lesEtats" class="form-group">
            <label for="lstEtat" accesskey="n">Etat : </label>
            <select id="lstEtats" name="Etat" class="form-control" onchange="selectVisiteursDispos(this.value)">
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
    </div>
</div>
