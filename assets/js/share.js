// ========================================
// Gestion partage réseaux + copie lien
// ========================================
document.addEventListener("DOMContentLoaded", () => {

    const copyBtn = document.getElementById('copy-link');
    const twitterBtn = document.getElementById('share-twitter');
    const linkedinBtn = document.getElementById('share-linkedin');

    const isEnglish = window.location.pathname.includes('/en/');
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(document.title);

    // =========================
    // Twitter
    // =========================
    if (twitterBtn) {

        twitterBtn.href =
            `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;
    }

    // =========================
    // LinkedIn
    // =========================
    if (linkedinBtn) {

        linkedinBtn.href =
            `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
    }

    // =========================
    // Copier le lien
    // =========================
    if (copyBtn) {

        copyBtn.addEventListener('click', async (e) => {

            e.preventDefault();

            try {

                await navigator.clipboard.writeText(window.location.href);

                const originalText = copyBtn.innerText;

                copyBtn.innerText =
                    isEnglish
                        ? 'Copied!'
                        : 'Copié !';

                copyBtn.style.borderColor = "#34d399";
                copyBtn.style.color = "#34d399";

                setTimeout(() => {

                    copyBtn.innerText = originalText;

                    copyBtn.style.borderColor = "";
                    copyBtn.style.color = "";

                }, 2000);

            } catch (err) {

                console.error('Erreur lors de la copie : ', err);
            }
        });
    }
});