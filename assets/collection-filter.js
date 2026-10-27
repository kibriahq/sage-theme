class CollectionFilter extends HTMLElement {
    constructor() {
        super();
    }

    get sectionId() {
        return this.dataset.sectionId;
    }

    connectedCallback() {
        this.filterInput = this.querySelectorAll('input');
        this.minRange = this.querySelector('input[type="range"][data-min-value]');
        this.maxRange = this.querySelector('input[type="range"][data-max-value]');
        const sortSelect = this.querySelector('#sort-by');

        this.filterInput.forEach((input) => {
            input.addEventListener('click', this.handleClick.bind(this));
        });


        sortSelect?.addEventListener('change', (event) => {
            const url = new URL(location.href);

            // reset the sort_by parameter to the new value
            url.searchParams.delete('sort_by');

            url.searchParams.set('sort_by', event.target.value);

            // reset the page parameter to 1 when sorting changes
            url.searchParams.delete('page');

            location.href = url.toString();
        });
    }

    handleClick(event) {
        const input = event.target;
        let url;

        if (input.dataset.param || input.dataset.value) {
            // url = new URL(input.checked ? input.dataset.addUrl : input.dataset.removeUrl, window.location.origin);
            url = new URL(location.href);

            console.log(location.href);
            if (input.checked) {
                url.searchParams.append(input.dataset.param, input.dataset.value);
            } else {
                // url.searchParams.delete(input.dataset.param);
                let cats = url.searchParams.getAll(input.dataset.param);

                url.searchParams.delete(input.dataset.param);

                cats.filter((cat) => {
                    if(cat !== input.dataset.value) {
                        url.searchParams.append(input.dataset.param, cat);
                    }
                });
            }
        } else {
            url = new URL(location.href);

            url.searchParams.delete(this.minRange.dataset.param);
            url.searchParams.delete(this.maxRange.dataset.param);
            url.searchParams.set(this.minRange.dataset.param, this.minRange.value);
            url.searchParams.set(this.maxRange.dataset.param, this.maxRange.value);
        }

        url.searchParams.set("section_id", this.sectionId);

        fetch(url.toString())
            .then(response => response.text())
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                this.querySelector('.collection-inner').innerHTML =
                    tempDiv.querySelector('.collection-inner').innerHTML;

                this.querySelector('.active-filters').innerHTML =
                    tempDiv.querySelector('.active-filters').innerHTML;

                this.querySelector('.result-count').innerHTML =
                    tempDiv.querySelector('.result-count').innerHTML;

                url.searchParams.delete("section_id");
                window.history.pushState({}, '', url.toString());
            })
    }
}

customElements.define('collection-filter', CollectionFilter);