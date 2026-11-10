class VariantPicker extends HTMLElement {
    constructor() {
        super();
    }

    get sectionId() {
        return this.dataset.sectionId;
    }

    connectedCallback() {
        this.variantSelectors = this.querySelectorAll('input[type="radio"]');
        this.handleChange = this.handleChange.bind(this);

        this.variantSelectors.forEach((selector) => {
            selector.addEventListener('change', this.handleChange);
        });
    }

    disconnectedCallback() {
        this.variantSelectors.forEach((selector) => {
            selector.removeEventListener('change', this.handleChange);
        });
    }

    handleChange(event) {
        const input = event.currentTarget;
        const url = `${window.location.pathname}?variant=${input.value}&section_id=${this.sectionId}`;

        fetch(url)
            .then((response) => response.text())
            .then((html) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                document.querySelector(".product").innerHTML = 
                tempDiv.querySelector(".product").innerHTML;

                const newUrl = new URL(url, window.location.origin);
                newUrl.searchParams.delete('section_id');
                window.history.pushState({}, '', newUrl);
            });
    }
}

customElements.define('variant-picker', VariantPicker);