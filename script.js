const contenantChoixUtililisateur = document.getElementById('choix_utilisatuer');
const contenantChoixOrdinateur = document.getElementById('choix_ordinateur');
const contenantResultat = document.getElementById('resultat');
const contentantTourDeClique = document.getElementById('tourClique');
const contenantResulatFinal = document.getElementById('resultat_final');
const choixPossibles = document.querySelectorAll('button');

let boutonClique = []; // variable pour stocker le nombre de fois qu'un bouton est cliqué
let choixUtilisateur = ''; // Variable pour stocker le choix de l'utilisateur
let choixOrdinateur = '';  // Variable pour stocker le choix de l'ordinateur
let resultat = ''; // Variable pour stocker le résultat du jeu
let paragraphe1 = ''; // pour stocker le nombre de tours qui sera considéré comme enfant de div avec l'id tourClique
let paragraphe2 = ''; // variable pour stocker le résultat final du match
let resultatTours = []; // variable pour stocker les résultats de chaque tour

// Donne un événement de clic pour chaque bouton
choixPossibles.forEach(choixPossible => choixPossible.addEventListener('click', (e) => {
    // Vérifier si le jeu est terminé
    if (boutonClique.length >= 5) {
        alert('Vous avez déjà joué 5 tours !');
        return; // Ne rien faire si la limite de 5 tours est atteinte
    }

    // Avec cette fonction fléchée, on récupère l'id de chaque bouton cliqué
    choixUtilisateur = e.target.id;
    // Ajout de l'id correspondant au bouton cliqué puis mise à l'intérieur du span avec l'id choix_utilisatuer
    contenantChoixUtililisateur.innerHTML = choixUtilisateur;
    montre_choix_ordinateur();
    verification();
    nombreDeClique();
}));

// Fonction pour le choix de l'ordinateur
function montre_choix_ordinateur() {
    let random = Math.floor(Math.random() * 3) + 1; // Générer un nombre aléatoire de 1 à 3
    
    // Affectation de pierre, papier, et ciseaux aux valeurs du random
    if (random === 1) {
        choixOrdinateur = 'Pierre';
    } else if (random === 2) {
        choixOrdinateur = 'Papier';
    } else {
        choixOrdinateur = 'Ciseaux';
    }
    // Ajout du choix de l'ordinateur à l'intérieur de l'élément avec l'id choix_ordinateur
    contenantChoixOrdinateur.innerHTML = choixOrdinateur;
}

// Fonction pour vérifier le résultat
function verification() {
    if (choixUtilisateur == 'Pierre' && choixOrdinateur == 'Papier' ||
        choixUtilisateur == 'Papier' && choixOrdinateur == 'Ciseaux' ||
        choixUtilisateur == 'Ciseaux' && choixOrdinateur == 'Pierre') {
        resultat = 'Perdu! 😢 ❌ 👎';
        resultatTours.push('Perdu');
    } else if ((choixUtilisateur == 'Pierre' && choixOrdinateur == 'Ciseaux') ||
               (choixUtilisateur == 'Papier' && choixOrdinateur == 'Pierre') ||
               (choixUtilisateur == 'Ciseaux' && choixOrdinateur == 'Papier')) {
        resultat = 'Gagné! 🏆 🎉 👍';
        resultatTours.push('Gagné');
    } else {
        resultat = 'Égalité 🏆 🎉 👍';
        resultatTours.push('Égalité');
    }
    contenantResultat.innerHTML = resultat;
}

// Fonction pour le nombre de clics sur les boutons
function nombreDeClique() {
    boutonClique.push(1); // Ajouter un clic au tableau boutonClique

    // Si la limite de 5 tours est atteinte, on appelle afficherResultatsFinal et on arrête la fonction
    if (boutonClique.length >= 5) {
        afficherResultatsFinal();
        return; // Ne pas ajouter de tours supplémentaires
    }

    paragraphe1 = document.createElement('p');
    contentantTourDeClique.appendChild(paragraphe1);
    
    // Affichage des résultats pour chaque tour joué
    for (let i = 0; i < boutonClique.length; i++) {
        paragraphe1.innerHTML = `Pour le tour ${i + 1} vous avez ${resultat}`;
    }
}

// Fonction pour l'affichage du résultat final
function afficherResultatsFinal() {
    let victoires = resultatTours.filter(resultat => resultat === 'Gagné').length;
    let defaites = resultatTours.filter(resultat => resultat === 'Perdu').length;
    let egalites = resultatTours.filter(resultat => resultat === 'Égalité').length;

    let resultatFinal = '';
    if (victoires > defaites) {
        resultatFinal = 'Félicitations, vous avez remporté cette manche ! 🏆';
    } else if (defaites > victoires) {
        resultatFinal = 'Dommage, vous avez perdu cette manche. 😢';
    } else {
        resultatFinal = 'C’est une égalité parfaite. 😐';
    }

    paragraphe2 = document.createElement('p');
    contenantResulatFinal.appendChild(paragraphe2);
    paragraphe2.innerHTML = `Le résultat final après les 5 tours est : 
    <br> Victoires : ${victoires} 
    <br> Défaites : ${defaites} 
    <br> Égalités : ${egalites}.
    <br> ${resultatFinal}`;
}
