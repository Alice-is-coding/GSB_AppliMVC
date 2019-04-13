<?php
/**
 * Liste des visiteurs
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
    <div class="col-md-5">
        <div class="form-group">
            <label for="lstVisiteurs" accesskey="n">Choisir un visiteur:</label>
            <select name="Visiteurs" class="form-control" id="lstVisiteurs" onchange="selectMoisDispos()">
                     
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
    </div>
</div>
