/**
 * Gère l'affichage des détails des expériences professionnelles (Accordéon)
 * @param {number} index - L'index de la mission cliquée
 */
function toggleRésumé(index) {
    // On récupère tous les blocs de détails pliables et tous les boutons
    const contents = document.querySelectorAll('.collapsible-content');
    const buttons = document.querySelectorAll('.toggle-button');

    // Sécurité au cas où l'index fourni n'existe pas
    if (!contents[index] || !buttons[index]) return;

    const currentContent = contents[index];
    const currentButton = buttons[index];

    // Vérification de l'état actuel
    if (currentContent.style.maxHeight && currentContent.style.maxHeight !== "0px") {
        // Si le bloc est ouvert, on le referme
        currentContent.style.maxHeight = "0px";
        currentContent.style.opacity = "0";
        currentContent.style.marginHeight = "0px"; // Évite les sauts de marges indésirables
        currentButton.textContent = "Voir plus ▼";
    } else {
        // Si le bloc est fermé, on calcule sa vraie hauteur interne (scrollHeight)
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
        currentContent.style.opacity = "1";
        currentButton.textContent = "Voir moins ▲";
    }
}

function toggleFormation(index) {
    // On récupère tous les blocs de détails pliables et tous les boutons des formations
    const contents = document.querySelectorAll('.formation .resumé');
    const buttons = document.querySelectorAll('.formation .toggle-button');
    const formations = document.querySelectorAll('.formation');

    // Sécurité au cas où l'index fourni n'existe pas
    if (!contents[index] || !buttons[index]) return;

    const currentContent = contents[index];
    const currentButton = buttons[index];
    const currentFormation = formations[index];

    // Vérification de l'état actuel
    if (currentContent.style.maxHeight && currentContent.style.maxHeight !== "0px") {
        // Si le bloc est ouvert, on le referme
        currentContent.style.maxHeight = "0px";
        currentContent.style.opacity = "0";
        currentFormation.classList.remove('active');
        currentButton.textContent = "Voir plus ▼";
    } else {
        // Si le bloc est fermé, on calcule sa vraie hauteur interne dynamique (scrollHeight)
        // On ajoute un petit buffer (+ 50) pour s'assurer que les iframes ou listes ne soient pas coupées
        currentContent.style.maxHeight = (currentContent.scrollHeight + 50) + "px";
        currentContent.style.opacity = "1";
        currentFormation.classList.add('active');
        currentButton.textContent = "Voir moins ▲";
    }
}