
/********************************** */
/* Affichage du modal
/********************************** */
$(window).on('load',function(){
    var delayMs = 1000; // delay in milliseconds
    
    setTimeout(function(){
        $('#staticBackdrop').modal('show');
    }, delayMs);
});
/********************************** */
/* Declaration / initialisation des variables
/********************************** */
let tabCountries = [];
let currentContinent = "";
let title = document.getElementById('title');
let btn1 = document.getElementById('btn1'); 
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let cadre = document.querySelector(".cadre");
var nomPays;
let alea1;
let alea2;
let alea3;
let int0;
let int1;
let int2;

// fonction qui récupère la région demandée via l'API
function getCountries(continent) {    
    
    let req = new XMLHttpRequest(); //Création d'une instance de XMLHttpRequest
    
    req.open("GET", `https://restcountries.com/v3.1/${continent}`);       //Initialisation de l'objet avec GET, url du continent passé en paramètre
    req.responseType = 'json';      //Réponse au format 'JSON'
    req.send();                     //Envoi de la requête au serveur
    
    req.onload = () => {        //Définit une fonction qui est appelée à réception de la fonction
        if (req.readyState == XMLHttpRequest.DONE) {        //renvoie l'état dans lequel se trouve le client XMLHttpRequest (compris entre 0 et 4). DONE correspondant à 4
            if (req.status == 200 ) {       //retourne le statut de la réponse (200 correspondant à OK)
                tabCountries = req.response;   //'response' renvoie un objet Javascript selon la valeur de responseType
                
                document.querySelector('.cadre').innerHTML = ""; //On vide la div 'cadre' avant l'affichage du prochain drapeau
                btn1.classList.remove('disabled');
                btn2.classList.remove('disabled');
                btn3.classList.remove('disabled');
                btn1.removeAttribute('style');
                btn2.removeAttribute('style');
                btn3.removeAttribute('style');

                let tabAlea = [];
                label(tabAlea);
                
                for (let i = 0; i < tabCountries.length; i++) {
                    
                    if (i == alea1) { 
                        cadre.innerHTML = `<img src="${tabCountries[i].flags.svg}">`;   //Affiche le drapeau issu de l'API
                        nomPays = `${tabCountries[i].translations.fra.official}`;
                        // console.log(nomPays);
                    }
                    
                    // Met à jour le nom de la zone en français en fonction du bouton choisi
                    switch (continent) {

                        case "region/africa":
                            title.innerHTML = `<span class="zone">Zone Afrique: </span>A quel pays appartient ce drapeau ?`;
                            break;
                    
                        case "region/americas":
                            title.innerHTML = `<span class="zone">Zone Amérique: </span>A quel pays appartient ce drapeau ?`;
                            break;
                        
                        case "region/asia":
                            title.innerHTML = `<span class="zone">Zone Asie: </span>A quel pays appartient ce drapeau ?`;
                            break;

                        case "region/europe":
                            title.innerHTML = `<span class="zone">Zone Europe: </span>A quel pays appartient ce drapeau ?`;
                            break;

                        case "region/oceania":
                            title.innerHTML = `<span class="zone">Zone Océanie: </span>A quel pays appartient ce drapeau ?`;
                            break;  
                        
                        case "all":
                            title.innerHTML = `<span class="zone">Zone Monde: </span>A quel pays appartient ce drapeau ?`;
                            break;
                    }
                }
            }      
        }      
        return alea1;
    }
    
    // return arguments;
}

function label(tabAlea) {
    
    
    alea1 = Math.floor(Math.random() * tabCountries.length);    //renvoie un nombre aleatoire compris dans la longueur de 'tabCountries'
    console.log(alea1);
    tabAlea.push(alea1);  //envoie chaque nombre aleatoire dans un nouveau tableau
    
    do {
        alea2 = Math.floor(Math.random() * tabCountries.length);    //renvoie un nombre aleatoire compris dans la longueur de 'tabCountries'
    } while (alea1 == alea2);
    tabAlea.push(alea2);
    
    do {
        alea3 = Math.floor(Math.random() * tabCountries.length);    //renvoie un nombre aleatoire compris dans la longueur de 'tabCountries'
    } while ((alea1 == alea3) || (alea2 == alea3));
    tabAlea.push(alea3);

    console.log(tabAlea);
    
    shuffleArray(tabAlea);
    
    console.log(tabAlea);
    
    int0 = tabAlea[0];
    int1 = tabAlea[1];
    int2 = tabAlea[2];
    
    for (let i = 0; i < 3; i++) {

        btn1.innerHTML = `${tabCountries[int0].translations.fra.official}`;
        btn2.innerHTML = `${tabCountries[int1].translations.fra.official}`;
        btn3.innerHTML = `${tabCountries[int2].translations.fra.official}`;     
           
    }

    return tabAlea;
}

//fonction qui mélange les valeurs du tableau 'tabAlea' pour la gestion des labels du formulaire
function shuffleArray(inputArray){      
    inputArray.sort(()=> Math.random() - 0.5);
}

//fonction qui vérifie la valeur des boutons et applique un style
function verify() {

    // Gestion du bouton 1 du quiz

    if (btn1.innerHTML != nomPays) {
        btn1.style.background = '#dc3545';
        btn1.classList.add('disabled');
        btn2.classList.add('disabled');
        btn3.classList.add('disabled');

    } else {
        btn1.style.background = '#198754';
        btn1.style.color = '#343a40';
        btn1.classList.add('disabled');
        btn2.classList.add('disabled');
        btn3.classList.add('disabled');
    }

        // Gestion du bouton 2 du quiz

    if (btn2.innerHTML != nomPays) {
        btn2.style.background = '#dc3545';
        btn1.classList.add('disabled');
        btn2.classList.add('disabled');
        btn3.classList.add('disabled');
    } else {
        btn2.style.background = '#198754';
        btn2.style.color = '#343a40';
        btn1.classList.add('disabled');
        btn2.classList.add('disabled');
        btn3.classList.add('disabled');
    }

        // Gestion du bouton 3 du quiz

    if (btn3.innerHTML != nomPays) {
        btn3.style.background = '#dc3545';
        btn1.classList.add('disabled');
        btn2.classList.add('disabled');
        btn3.classList.add('disabled');
    } else {
        btn3.style.background = '#198754';
        btn3.style.color = '#343a40';
        btn1.classList.add('disabled');
        btn2.classList.add('disabled');
        btn3.classList.add('disabled');
    }

    clearInterval(intervalTime);
}

/***************************************** */
// Fonction qui lance le timer
/***************************************** */
let time = document.getElementById("myBar");

let intervalTime = null;    
let compteur = 15; //INIT DU TIMER
time.innerHTML = `00:${compteur}`;

function timer(){

    compteur = 15;
    intervalTime = setInterval(function decompte() {
        compteur--;
        
        if (compteur <= 9) {
            time.innerHTML = `<span class='white'>Temps restant:</span> 00:0${compteur}`;
        } else {
            time.innerHTML = `<span class='white'>Temps restant:</span> 00:${compteur}`;
        }
        
        if(compteur == 0) {
            clearInterval(intervalTime);
            btn1.classList.add('disabled');
            btn2.classList.add('disabled');
            btn3.classList.add('disabled');
            time.innerHTML = 'Votre temps est écoulé, vous avez perdu !'
            
        } 
    }, 1000);
}

/******************************************************************** */
/******************************************************************** */
document.getElementById('staticBackdrop').addEventListener('click', () => {
    clearInterval(intervalTime);
    timer();
});


// document.getElementById('next').addEventListener('click', getCountries(currentContinent));

document.getElementById('btn1').addEventListener('click', (event) => {
    event.preventDefault();
    verify();
})
document.getElementById('btn2').addEventListener('click', (event) => {
    event.preventDefault();
    verify();
})
document.getElementById('btn3').addEventListener('click', (event) => {
    event.preventDefault();
    verify();
})
/******************************************************************** */
/******************************************************************** */

getCountries("region/africa");   //Fonction qui exécute par défaut l'affichage de la zone 'Afrique'
currentContinent = "region/africa";

document.getElementById('africa').addEventListener('click', (event) => {      //Affichage de la zone Afrique lors du clic dans la Navbar
    event.stopPropagation();
    currentContinent = "region/africa";
    getCountries(currentContinent);
    clearInterval(intervalTime);
    timer();
});

document.getElementById('america').addEventListener('click', (event) => {    //Affichage de la zone Amérique lors du clic dans la Navbar
    event.stopPropagation();
    currentContinent = "region/americas";
    getCountries(currentContinent);
    clearInterval(intervalTime);
    timer();
});

document.getElementById('asia').addEventListener('click', (event) => {   //Affichage de la zone Asie lors du clic dans la Navbar
    event.stopPropagation();
    currentContinent = "region/asia";
    getCountries(currentContinent);
    clearInterval(intervalTime);
    timer();
});

document.getElementById('europa').addEventListener('click', (event) => { //Affichage de la zone Europe lors du clic dans la Navbar
    event.stopPropagation();
    currentContinent = "region/europe";
    getCountries(currentContinent);
    clearInterval(intervalTime);
    timer();
});

document.getElementById('oceania').addEventListener('click', (event) => {    //Affichage de la zone Océanie-Antarctique lors du clic dans la Navbar
    event.stopPropagation();
    currentContinent = "region/oceania";
    getCountries(currentContinent);
    clearInterval(intervalTime);
    timer();
});

document.getElementById('monde').addEventListener('click', (event) => {    //Affichage de la zone Océanie-Antarctique lors du clic dans la Navbar
    event.stopPropagation();
    currentContinent = "all";
    getCountries(currentContinent);
    clearInterval(intervalTime);
    timer();
});

document.getElementById('next').addEventListener('click', (event) => {   //Affiche la question suivante au clic du bouton
    event.stopPropagation();
    getCountries(currentContinent);
    clearInterval(intervalTime);
    timer();
});