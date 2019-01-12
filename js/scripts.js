/* 
 * Gestion des visiteurs
 * 
 * @category PPE
 * @package GSB
 * @author Alice B. 
 * 
 */

function selectionMoisDispos(){
        $.get(
            'controleurs/c_validerFrais.php', 
        {
            Visiteurs : $('#lstVisiteurs').val()
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
