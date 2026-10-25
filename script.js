
import { cours } from "./data.js"

const div = document.querySelector("#courses");

function creatCards(data = cours) {
    for (let i = 0; i < data.length; i++) {
        div.innerHTML += `
        <div class=" rounded-2xl flex gap-2  flex-col w-full bg-cyan-800 shadow-2xs  p-4  border-2 border-amber-100">
            <h1 class="flex justify-center  bg-blue-50 text-black text-xl font-extrabold">Cour ${i + 1}</h1>
            <div class=" bg-cyan-700 w-full flex justify-between py-2 ">
              <span class="px-4">Matiere: </span>
              <span class="mr-20">${data[i].matiere}</span>
            </div>
            <div class=" bg-cyan-700 w-full flex justify-betw ${data[i].niveau}een py-2 gap-9">
              <span class="px-4">Niveau: </span>
              <span class="mr-20">  ${data[i].niveau}</span>
            </div>
            <div class=" bg-cyan-700 w-full flex justify-between py-2 ">
              <span class="px-4">Date: </span>
              <span class="mr-20">${data[i].creneau}</span>
            </div>
             <div class=" rotate-2 overflow-auto bg-cyan-500 w-full flex justify-between py-2 ">
              <span class=" px-4">Prix: </span>
              <span class="mr-20"> ${data[i].prix} DHs</span>
            </div>
            <div class="w-fut  flex justify-center">
              <button class="w-[200px] h-[40px] bg-green-400 rounded-[0.5rem] cursor-pointer hover:bg-green-800">Inscription</button>
            </div>
          </div>
       `
    }
}

let optionsNiv = document.querySelector("#filtre-niveau")
let niveaux = []

for(let i = 0; i < cours.length; i++){
  let niveau = `${cours[i].niveau}`
  if (!niveaux.includes(niveau)) {
    niveaux.push(niveau);
    let optNiv = document.createElement("option");
    optNiv.textContent = niveau;
    optNiv.value = niveau;
    optionsNiv.append(optNiv)
  }
}

let optionMat = document.querySelector("#filtre-matiere")
let matieres = []

for(let i = 0; i < cours.length; i++){
  let matiere = `${cours[i].matiere}`
  if(!matieres.includes(matiere)){
    matieres.push(matiere)
    let optMat = document.createElement("option")
    optMat.textContent = matiere;
    optMat.value = matiere
    optionMat.append(optMat)
  }
}

optionsNiv.addEventListener("change", () => {

   filterData(optionsNiv.value, optionMat.value)

})

optionMat.addEventListener("change", () => {

   filterData(optionsNiv.value, optionMat.value)

})


creatCards()

function filterData(event1, event2) {
   div.innerHTML = "";
   let xx = []
  for(let i = 0; i < cours.length; i++){
    if(cours[i].niveau === event1 || event1 === ""){
      if(cours[i].matiere === event2 || event2 === ""){
        xx.push(cours[i]);
        console.log(i)
      }
    }
  }
   return creatCards(xx)
}
