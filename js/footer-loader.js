class FooterLoader {
    constructor() {
        this.basePath = this.getBasePath();
    }

    getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        
        if (path.includes('/services/')) return '../';
        if (path.includes('/blog/')) return '../';
        if (path.includes('/blog/posts/')) return '../../';
        return './';
    }

    async loadFooter() {
        try {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (!footerPlaceholder) {
                console.warn('Footer placeholder not found');
                return;
            }

            const response = await fetch(`${this.basePath}components/footer.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const footerHTML = await response.text();
            footerPlaceholder.innerHTML = footerHTML;
            
            this.updatePaths();
        } catch (error) {
            console.error('Error loading footer:', error);
            // Fallback: hide the placeholder
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        }
    }

    updatePaths() {
        const footer = document.querySelector('#footer-placeholder footer');
        if (!footer) return;

        // Update image sources
        const images = footer.querySelectorAll('img[data-src-root]');
        images.forEach(img => {
            const rootSrc = img.getAttribute('data-src-root');
            img.src = this.basePath + rootSrc;
            img.setAttribute('data-fallback', this.basePath + 'assets/images/logo/logo.png');
        });

        // Update links
        const links = footer.querySelectorAll('a[data-href-root]');
        links.forEach(link => {
            const rootHref = link.getAttribute('data-href-root');
            link.href = this.basePath + rootHref;
        });
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const footerLoader = new FooterLoader();
    footerLoader.loadFooter();
});
