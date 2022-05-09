export default class Section {
    constructor({renderer}, containerSelector){
        this._renderer = renderer.bind(this);
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element){
        this._container.prepend(element)
    }

    addItems(elements){
        this._container.append(elements);
    }
}