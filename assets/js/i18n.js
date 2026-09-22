/**
 * MyMetalHub i18n Core Manager
 * Gerencia preferência de idioma, redirecionamento preservando rota e tradução dinâmica de elementos UI.
 */
(function () {
    const SUPPORTED_LANGS = ['pt-BR', 'en', 'es'];
    const DEFAULT_LANG = 'pt-BR';
    const STORAGE_KEY = 'mymetalhub_lang';

    // Determina o idioma atual a partir da URL ou localStorage
    function detectLanguage() {
        const path = window.location.pathname;
        if (path.includes('/en/') || path.endsWith('/en')) return 'en';
        if (path.includes('/es/') || path.endsWith('/es')) return 'es';
        if (path.includes('/pt/') || path.endsWith('/pt')) return 'pt-BR';

        const savedLang = localStorage.getItem(STORAGE_KEY);
        if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
            return savedLang;
        }

        const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (navLang.startsWith('en')) return 'en';
        if (navLang.startsWith('es')) return 'es';
        return DEFAULT_LANG;
    }

    let currentLang = detectLanguage();

    function setLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) return;
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.setAttribute('lang', lang);
    }

    /**
     * Alterna o idioma preservando a página atual, âncora (#) e parâmetros de busca (?)
     * Suporta protocolo local (file://) e servidores HTTP (http://, https://).
     * @param {string} targetLang - 'pt-BR', 'en' ou 'es'
     */
    function switchLanguage(targetLang) {
        if (!SUPPORTED_LANGS.includes(targetLang)) return;
        
        localStorage.setItem(STORAGE_KEY, targetLang);
        
        const targetPrefix = targetLang === 'en' ? 'en' : (targetLang === 'es' ? 'es' : 'pt');
        const href = window.location.href;

        let newHref;

        // Se a URL já contém uma subpasta /pt/, /en/ ou /es/
        if (/\/(pt|en|es)\//.test(href)) {
            newHref = href.replace(/\/(pt|en|es)\//, `/${targetPrefix}/`);
        } else {
            // Se estiver na raiz, redireciona para a subpasta de idioma correspondente
            const hashIndex = href.indexOf('#');
            const searchIndex = href.indexOf('?');
            let cleanHref = href;
            let queryAndHash = '';

            const cutoff = Math.min(
                searchIndex !== -1 ? searchIndex : href.length,
                hashIndex !== -1 ? hashIndex : href.length
            );

            cleanHref = href.substring(0, cutoff);
            queryAndHash = href.substring(cutoff);

            const lastSlash = cleanHref.lastIndexOf('/');
            const basePath = cleanHref.substring(0, lastSlash);
            const filePart = cleanHref.substring(lastSlash + 1) || 'index.html';

            newHref = `${basePath}/${targetPrefix}/${filePart}${queryAndHash}`;
        }

        window.location.href = newHref;
    }

    // Inicialização ao carregar o DOM
    document.addEventListener('DOMContentLoaded', () => {
        setLanguage(currentLang);
        bindLanguageSelectors();
    });

    function bindLanguageSelectors() {
        const selectors = document.querySelectorAll('.mymetalhub-lang-selector');
        selectors.forEach(select => {
            const val = currentLang === 'en' ? 'en' : (currentLang === 'es' ? 'es' : 'pt-BR');
            select.value = val;

            select.addEventListener('change', (e) => {
                const selected = e.target.value;
                switchLanguage(selected);
            });
        });
    }

    // Exporta API global leve
    window.MyMetalHubI18n = {
        getLanguage: () => currentLang,
        setLanguage: setLanguage,
        switchLanguage: switchLanguage
    };
})();
