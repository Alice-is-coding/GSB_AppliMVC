/* 
 * Gestion des visiteurs
 * 
 * @category PPE
 * @package GSB
 * @author Alice B. 
 * 
 */

window.addEventListener("load", function() {
    window.document.querySelector('#lstVisiteurs').onchange=selectMoisDispos(this.value); 
}, false);

function selectMoisDispos(str) {
  if (str.length === 0) {
      document.getElementById('lstMois').innerHTML = "Bonjour";
      return; 
  } else {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
          console.log(this);
          if (this.readyState === 4 && this.status === 200) {
              if (this.responseText === ""){
                  document.getElementById('lstMois').innerHTML = "Bonjour";
              } else {
              document.getElementById('lstMois').innerHTML = 
                      this.responseText;
              }
          }
      };
      xmlhttp.open("GET", "controleurs/c_validerFrais.php?q=" + str, true);
      xmlhttp.send();
  }
};
