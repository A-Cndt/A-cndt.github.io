function toggleRésumé(id) {
    var elements = document.getElementsByClassName("resumé");
    var buttons = document.getElementsByClassName("toggle-button");

    // Sélectionner l'élément résumé et le bouton correspondant
    var resuméText = elements[id];
    var button = buttons[id]; // Utilisation directe de l'id pour le bouton

    // Vérifie si l'élément est actuellement affiché ou non
    if (resuméText.style.display === "none" || resuméText.style.display === "") {
        resuméText.style.display = "block";  // Affiche l'élément
        button.textContent = "Voir moins ▲";  // Change le texte du bouton
    } else {
        resuméText.style.display = "none";  // Cache l'élément
        button.textContent = "Voir plus ▼";  // Change le texte du bouton
    }
}
