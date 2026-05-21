document.addEventListener("DOMContentLoaded", () => {
    // 1. Détecte la langue en fonction de l'URL
    const path = window.location.pathname;
    
    let lang = 'fr'; // Langue par défaut
    if (path.includes('/en/')) {
        lang = 'en';
    } else if (path.includes('/de/')) {
        lang = 'de';
    }

    // 2. On injecte les composants
    injectComponent(`/components/header-${lang}.html`, 'global-header');
    injectComponent(`/components/footer-${lang}.html`, 'global-footer');
});

async function injectComponent(filePath, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Erreur ${response.status} : ${filePath}`);
        const htmlContent = await response.text();
        container.innerHTML = htmlContent;
    } catch (error) {
        console.error("Erreur d'injection :", error);
    }
}