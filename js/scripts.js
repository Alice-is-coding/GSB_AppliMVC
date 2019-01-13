/* 
 * Gestion des visiteurs
 * 
 * @category PPE
 * @package GSB
 * @author Alice B. 
 * 
 */

function selectionMoisDispos($idVisiteur){
        $.post(
            'controleurs/c_validerFrais.php', 
        {
            Visiteurs : $idVisiteur
        }, 
        function(data){
            if (data !== ''){
                console.log(data);
            }else {
                console.log('erreur..');
            }
        }
    );
}

function getOptionSelected(idVisiteur){
    $('Visiteurs').val(idVisiteur);
}
