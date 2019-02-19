<?php
/**
 * Vue État de Frais côté compta
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
?>
<hr>
<div class="panel panel-secondary">
    <div class="panel-heading" id="dateFicheFrais">Fiche de frais du mois 
        <!-- inclure $numMois . '-' . $numAnnee : --></div>
    <div class="panel-body">
        <strong id="etat"><u>Etat :</u></strong><!-- inclure $libEtat -->
        <!-- inclure $dateModif --> <br> 
        <strong id="montantValide"><u>Montant validé :</u></strong> <!-- inclure $montantValide -->
    </div>
</div>
<div class="panel panel-secondary">
    <div class="panel-heading">Eléments forfaitisés</div>
    <table id="tabSuiviFraisF" class="table table-bordered table-responsive">
        <tbody>
            <tr id="trLibSuiviFraisF">
                <!-- foreach ($lesFraisForfait as $unFraisForfait) { 
                     $libelle = $unFraisForfait['libelle']; 
                     créer <th> echo htmlspecialchars($libelle) </th>
                    } -->
            </tr>

            <tr id="trQteFraisF">
                <!-- foreach ($lesFraisForfait as $unFraisForfait) {
                     $quantite = $unFraisForfait['quantite'];
                     créer <th class="qteForfait"> echo $quantite </td>
                     } -->
            </tr>
        </tbody>
    </table>
</div>
<div class="panel panel-secondary">
    <div id="descriptifFraisHF" class="panel-heading">Descriptif des éléments hors forfait - 
        <!-- inclure $nbJustificatifs --> justificatifs reçus</div>
    <table id="tabSuiviFraisHF" class="table table-bordered table-responsive">
        <tbody id="tbodySuiviFraisHF">
            <tr>
                <th class="date">Date</th>
                <th class="libelle">Libellé</th>
                <th class='montant'>Montant</th>                
            </tr>
            <!-- foreach ($lesFraisHorsForfait as $unFraisHorsForfait) {
                 $date = $unFraisHorsForfait['date'];
                 $libelle = htmlspecialchars($unFraisHorsForfait['libelle']);
                 $montant = $unFraisHorsForfait['montant']; 
                  créer <tr>
                         créer <td> echo $date </td>
                         créer <td> echo $libelle </td>
                         créer <td> echo $montant </td>
                        </tr>
                 } -->
        </tbody>
    </table>
</div>