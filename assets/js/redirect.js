// mon-portfolio/redirect.js

(function() {
    // 1. On récupère la langue du navigateur (ex: "fr-FR" ou "en-US")
    const userLang = navigator.language || navigator.userLanguage;
    
    // 2. On redirige selon la langue détectée
    if (userLang && userLang.startsWith('fr')) {
        window.location.replace("/fr/index.html");
    } else  if (userLang && userLang.startsWith('de')){
        // Par défaut, redirection vers le français
        window.location.replace("/de/index.html");
    } else {
        window.location.replace("/en/index.html");
    }
})();