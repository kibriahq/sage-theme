class Newsletter extends HTMLElement {
    constructor() {
        super();

        this.form = this.querySelector('form');
        this.emailInput = this.querySelector('input[type="email"]');

        this.successMessage = this.querySelector('#newsletter-success');
        this.errorMessage = this.querySelector('#newsletter-error');
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();


        if (!this.emailInput.value.trim()) {
            this.errorMessage.classList.remove('hidden');
            this.successMessage.classList.add('hidden');
            return;
        }

        const formData = new FormData(this.form);

        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'text/html'
                }
            });

            if (response.ok) {
                this.successMessage.classList.remove('hidden');
                this.errorMessage.classList.add('hidden');
                this.form.reset();
            } else {
                this.errorMessage.classList.remove('hidden');
                this.successMessage.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            this.errorMessage.classList.remove('hidden');
            this.successMessage.classList.add('hidden');
        }
    }

    connectedCallback() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
}

customElements.define('newsletter-form', Newsletter);