// filter.js

// Sélection des éléments du DOM
const checkboxes = document.querySelectorAll('.tag-filter');
const articles = document.querySelectorAll('.article');

// Fonction de filtrage
function filterArticles() {
    // Récupérer les tags sélectionnés
    const selectedTags = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedTags.push(checkbox.getAttribute('data-tag'));
        }
    });

    // Masquer ou afficher les articles en fonction des tags sélectionnés
    const visibleArticles = [];
    articles.forEach((article) => {
        const articleTags = article.getAttribute('data-tags').split(', ');
        const isVisible = selectedTags.every(tag => articleTags.includes(tag));

        if (isVisible || selectedTags.length === 0) {
            article.style.display = 'grid'; // Afficher l'article
            visibleArticles.push(article); // Ajouter l'article visible
        } else {
            article.style.display = 'none'; // Masquer l'article
        }
    });

    // Appel de la fonction de pagination avec les articles filtrés
    updatePagination(visibleArticles);
}

// Ajout d'écouteurs d'événements aux cases à cocher
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', filterArticles);
});

// Initialiser l'affichage (par défaut, afficher tous les articles)
filterArticles();
