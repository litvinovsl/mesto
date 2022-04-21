import Popup from "./Popup";

export default class PopupWithImage extends Popup{
    _popupImage = this._popup.querySelector('.popup__image');
    _popupName = this._popup.querySelector('.popup__img-name');

    open(imageName, imageLink){
        this._popupImage.src = imageLink;
        this._popupImage.alt = imageName;
        this._popupName.textContent = imageName;
        super.open();
    }  
}