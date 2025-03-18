function loadHTMLIntoElement(url, elementId) {
    const element = document.getElementById(elementId);
    fetch(url)
        .then(response => response.text())
        .then(data => {
            element.innerHTML = data;
        })
        .catch(error => {
            console.error("Erreur lors du chargement du fichier HTML :", error);
        });
}
