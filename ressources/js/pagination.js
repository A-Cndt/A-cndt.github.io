// pagination.js

let currentPage = 1; // Page initiale
const articlesPerPage = 10; // Nombre d'articles par page
let visibleArticles = []; // Liste globale des articles visibles

// Fonction pour afficher les articles de la page actuelle
function showPage(page) {
    console.log("showPage called - Current page:", page, "Total visible articles:", visibleArticles.length);

    // Calculer l'index de départ et de fin des articles
    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;

    // Afficher ou masquer les articles en fonction de la page courante
    visibleArticles.forEach((article, index) => {
        if (index >= start && index < end) {
            article.style.display = 'grid'; // Afficher l'article
        } else {
            article.style.display = 'none'; // Masquer l'article
        }
    });

    // Mettre à jour le numéro de la page et le nombre total de pages
    const totalPages = Math.ceil(visibleArticles.length / articlesPerPage);
    document.getElementById('pageNumber').textContent = `Page ${page} sur ${totalPages}`;

    // Activer ou désactiver les boutons Précédent et Suivant
    document.getElementById('prevPage').disabled = page === 1;
    document.getElementById('nextPage').disabled = end >= visibleArticles.length;
}

// Fonction pour changer de page
function changePage(direction) {
    console.log("changePage called - direction:", direction, "Current page:", currentPage);

    // Assurer que visibleArticles n'est pas vide
    if (!visibleArticles || visibleArticles.length === 0) {
        console.error("Erreur : Pas d'articles visibles pour la pagination");
        return;
    }

    currentPage += direction;

    // Vérifier les limites de la page
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > Math.ceil(visibleArticles.length / articlesPerPage)) {
        currentPage = Math.ceil(visibleArticles.length / articlesPerPage);
    }

    showPage(currentPage);
}

// Mettre à jour la pagination après filtrage
function updatePagination(newVisibleArticles) {
    console.log("updatePagination called - Visible articles:", newVisibleArticles.length);

    // Si la liste est vide, on affiche un message d'erreur
    if (!newVisibleArticles || newVisibleArticles.length === 0) {
        console.error("Aucun article visible après filtrage.");
        return;
    }

    // Mettre à jour la variable globale `visibleArticles`
    visibleArticles = newVisibleArticles;

    // Réinitialiser la page à la première page après un changement de filtrage
    currentPage = 1;

    // Afficher la première page
    showPage(currentPage);

    // Activer ou désactiver les boutons de pagination
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage * articlesPerPage >= visibleArticles.length;
}

// Fonction d'initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation avec tous les articles visibles au début
    const allArticles = Array.from(document.querySelectorAll('.article')).filter(article => article.style.display !== 'none');
    console.log("Initial visible articles:", allArticles.length);
    updatePagination(allArticles);
});
