
var firstNumber = null
var secondNumber = null
var success = 0
var total = 0

// Générer les cases à cocher des chiffres.
const table = document.getElementById("tblChiffres")
const trHead = table.querySelector("thead tr")
const trBody = table.querySelector("tbody tr")

for(let i = 1; i <= 12; i++) {
   let tdHead = document.createElement("td")
   tdHead.textContent = i
   trHead.appendChild(tdHead)

   let tdBody = document.createElement("td")
   let checkbox = document.createElement("input")
   checkbox.setAttribute("type", "checkbox")
   checkbox.setAttribute("data-chiffre", i)
   checkbox.checked = true;
   tdBody.append(checkbox)
   trBody.append(tdBody)
}

startGame()

// Appelé quand on soumet le formulaire.
document.getElementById("frmQuestion").addEventListener("submit", e => {
   
   // Empêcher le rechargement de la page.
   e.preventDefault();

   const txtQuestion = document.getElementById("txtQuestion")

   // Enregistrer la réponse.
   const divResultats = document.getElementById("resultats")
   let divResultat = document.createElement("div")
   divResultat.innerHTML = "<span>" + firstNumber + " x " + secondNumber + " = " + txtQuestion.value + "</span>"

   // Vérifier si la réponse est correcte.
   if(firstNumber * secondNumber !== parseInt(txtQuestion.value)){
      divResultat.classList.add("error")
      divResultat.innerHTML += " <span class='spacer'></span><span class='material-icons arrow-icon'>new_releases</span> " + "<span>" + (firstNumber * secondNumber) + "</span>"
   } else {
      success++
   } 

   total++;
   
   divResultats.append(divResultat)

   // Effacer le champ de saisie.
   txtQuestion.value = "";

   // Afficher le score total
   const divScore = document.getElementById("divScore")
   divScore.textContent = "Score: " + success + "/" + total;

   genererNouvelleQuestion()

})

document.getElementById("btnStart").addEventListener("click", e => {
   startGame()
})

function genererNouvelleQuestion() {
   const checkboxes = document.querySelectorAll("#tblChiffres input[type=checkbox]")
   let chiffres = []
   checkboxes.forEach((checkbox) => {
      if(checkbox.checked){
         chiffres.push(parseInt(checkbox.getAttribute("data-chiffre")))
      }
   })
   
   firstNumber = chiffres[Math.floor(Math.random() * chiffres.length)]
   secondNumber = Math.floor(Math.random() * 12) + 1

   document.getElementById("divQuestion").textContent = firstNumber + " x " + secondNumber + " = ?"

}

function startGame(){
   genererNouvelleQuestion()
   document.getElementById("txtQuestion").focus()
   const divResultats = document.getElementById("resultats")
   divResultats.innerHTML = "";
   success = 0
   total = 0
}