import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupName = this._popup.querySelector('.popup__img-name');
    }

    open(imageName, imageLink){
        this._popupImage.src = imageLink;
        this._popupImage.alt = imageName;
        this._popupName.textContent = imageName;
        super.open();
    }  
}