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
        <form action="index.php?uc=validerFrais&action=selectionnerMois" 
              method="post" role="form">
            <div id="lesMois" class="form-group">
                <label for="lstMois" accesskey="n">Mois : </label>
                <select id="lstMois" name="Mois" class="form-control" onchange="selectFicheFraisForfait(this.value)">
                </select>
            </div>
        </form>
    </div>
</div>
<div id="lesFraisF"></div>
<div id="lesFraisHF"></div>
<div id="justificatifs"></div>
<div id="validerFicheFrais" style="display: none">
    <button class="btn btn-success" type="button" onclick="validerFicheFrais()">Valider la Fiche de Frais</button>
</div>