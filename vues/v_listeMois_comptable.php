<?php
/**
 * Vue Liste des mois côté compta
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
<div id="validation" style="display: none">
    <button class="btn btn-success" id="btn-validation" type="button" onclick="majEtatFicheFrais(this.value)"></button>
</div>