document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.post-card'));
    const blogGrid = document.getElementById('blog-grid');
    const pageNumbersDiv = document.getElementById('page-numbers');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const itemsPerPage = 9;
    let currentPage = 1;
    let filteredCards = [...cards];

    /**
     * Moteur de rendu principal
     */
    function render() {
        const totalPages = Math.max(1, Math.ceil(filteredCards.length / itemsPerPage));
        
        if (currentPage > totalPages) currentPage = totalPages;

        // 1. Affichage des cartes
        cards.forEach(card => card.style.display = 'none');
        
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        filteredCards.slice(start, end).forEach(card => card.style.display = 'flex');

        // 2. Mise à jour de la pagination
        updatePaginationUI(totalPages);
    }

    /**
     * Génération dynamique de la pagination
     */
    function updatePaginationUI(totalPages) {
        pageNumbersDiv.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            
            btn.addEventListener('click', () => {
                currentPage = i;
                render();
                blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            
            pageNumbersDiv.appendChild(btn);
        }

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage >= totalPages;
    }

    /**
     * Logique de filtrage
     */
    function filterContent(value, type) {
        if (type === 'category') {
            filteredCards = value === 'all' 
                ? [...cards] 
                : cards.filter(card => card.dataset.category === value);
        } else if (type === 'tag') {
            filteredCards = cards.filter(card => {
                const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.dataset.tag);
                return tags.includes(value);
            });
        }
        
        currentPage = 1; 
        render();
    }

    // --- Gestionnaires d'événements ---

    prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; render(); } });
    nextBtn.addEventListener('click', () => { currentPage++; render(); });

    // Gestion des boutons de catégorie avec mise à jour du focus/active
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Retirer la classe 'active' de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe 'active' au bouton cliqué
            e.currentTarget.classList.add('active');
            
            filterContent(e.currentTarget.dataset.filter, 'category');
        });
    });

    // Délégation d'événements pour les tags
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {
            // Optionnel : retirer le focus des catégories quand on clique sur un tag
            filterBtns.forEach(b => b.classList.remove('active'));
            filterContent(e.target.dataset.tag, 'tag');
        }
    });

    render(); // Initialisation
});