import './modal.scss';
import { bindable } from 'aurelia-framework';

export class Modal {

    @bindable onClose;
    constructor() {

    }

    bind(bc) {
        if (this.onClose) {
            this.onClose = this.onClose.bind(bc);
        }
    }

    close() {
        this.onClose();
    }
}