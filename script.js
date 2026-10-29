
import { cours } from "./data.js";

const div = document.querySelector("#courses");


// 1. Afficher les cartes des cours
function creatCards(data = cours) {
  div.innerHTML = "";
  
  for(let i = 0; i < data.length; i++) {
    div.innerHTML += `
    <div class="rounded-2xl flex gap-2 flex-col w-full bg-cyan-800 shadow-2xs p-4 border-2 border-amber-100">
    
    <h2 class="flex justify-center bg-blue-50 text-black text-xl font-extrabold">
    Cour ${i + 1}
    </h2>
    
    <div class="bg-cyan-700 w-full flex justify-between py-2">
    <span class="px-4">Matière:</span>
    <span class="mr-4">${data[i].matiere}</span>
          </div>

          <div class="bg-cyan-700 w-full flex justify-between py-2">
          <span class="px-4">Niveau:</span>
          <span class="mr-4">${data[i].niveau}</span>
          </div>
          
          <div class="bg-cyan-700 w-full flex justify-between py-2">
          <span class="px-4">Date:</span>
            <span class="mr-4">${data[i].creneau}</span>
            </div>
            
            <div class="bg-cyan-500 w-full flex justify-between py-2">
            <span class="px-4">Prix:</span>
            <span class="mr-4">${data[i].prix} MAD / mois</span>
            </div>
            
            <div class="flex justify-center mt-2">
            <button type="button" data-id="${data[i].id}" class="inscription w-[200px] h-[40px] bg-green-400 rounded-lg cursor-pointer hover:bg-green-600">Ajouter à ma sélection
            </button>
            </div>
            </div>
            `;
          }
        }
        
    
const optionsNiv = document.querySelector("#filtre-niveau");
const niveaux = [];

for(let i = 0; i < cours.length; i++) {
  const niveau = cours[i].niveau;
  
  if(!niveaux.includes(niveau)) {
    niveaux.push(niveau);
    
    const option = document.createElement("option");
    option.value = niveau;
    option.textContent = niveau;
    
    optionsNiv.append(option);
  }
}

const optionMat = document.querySelector("#filtre-matiere");
const matieres = [];

for(let i = 0; i < cours.length; i++) {
  const matiere = cours[i].matiere;
  
  if(!matieres.includes(matiere)) {
    matieres.push(matiere);
    
    const option = document.createElement("option");
    option.value = matiere;
    option.textContent = matiere;
    
    optionMat.append(option);
  }
}

optionsNiv.addEventListener("change", () => {
  filterData(optionsNiv.value, optionMat.value);
});

optionMat.addEventListener("change", () => {
  filterData(optionsNiv.value, optionMat.value);
});

function filterData(niveauChoisi, matiereChoisie) {
  const resultats = cours.filter((c) => {
    const niveauCorrect = niveauChoisi === "" || c.niveau === niveauChoisi;
    const matiereCorrect = matiereChoisie === "" || c.matiere === matiereChoisie;
    return niveauCorrect && matiereCorrect;
  });
  creatCards(resultats);
}

const nombrePanier = document.querySelector("#nombre-panier");
const listePanier = document.querySelector("#liste-panier");
const totalPanier = document.querySelector("#total-panier");
let arrIns = [];

function afficherPanier() {
  nombrePanier.textContent = arrIns.length;
  
  if(arrIns.length === 0) {
    listePanier.innerHTML = `
    <p class="text-sm text-slate-500">Aucun cours sélectionné.</p>
    `;
    totalPanier.textContent = "0 MAD / mois";
    return;
  }
  
  listePanier.innerHTML = "";
  
  let total = 0;

  for(let i = 0; i < arrIns.length; i++) {
    const c = arrIns[i];

    total += Number(c.prix);

    listePanier.innerHTML += `
      <div class="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 mb-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p class="font-bold">${c.matiere}</p>
          <p class="text-sm text-slate-600">Niveau : ${c.niveau}</p>
          <p class="text-sm text-slate-600">${c.creneau}</p>
          <p class="mt-1 font-bold">${c.prix} MAD / mois</p>
        </div>

        <button type="button" data-remove-id="${c.id}"
          class="rounded-lg bg-red-100 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-200"
        >
        Supprimer
        </button>
      </div>
    `;
  }

  totalPanier.textContent = `${total} MAD / mois`;
}


div.addEventListener("click", (event) => {
  const bouton = event.target.closest(".inscription");
  if(!bouton) return;
  const idBouton = bouton.dataset.id;
  const coursChoisi = cours.find((c) => String(c.id) === idBouton);
  if(!coursChoisi) return;
  const dejaChoisi = arrIns.some((c) =>c.matiere === coursChoisi.matiere &&c.niveau === coursChoisi.niveau);
  
  bouton.className = "w-[200px] h-[40px] bg-green-200 rounded-lg cursor-pointer hover:bg-green-300 text-black"
  bouton.textContent = "carte selectionner"

  arrIns.push(coursChoisi);
  afficherPanier();
});
listePanier.addEventListener("click", (event) => {
  const bouton = event.target.closest("[data-remove-id]");
  if(!bouton) return;
  const idSupprimer = bouton.dataset.removeId;
  arrIns = arrIns.filter((c) => String(c.id) !== idSupprimer);
  afficherPanier();
});
creatCards();
afficherPanier();