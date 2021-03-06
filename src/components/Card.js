export default class Card {
    constructor(data, cardSelector, handleCardClick, userId, handleCardLike, handleCardDelete) {
        this._userId = userId;
        this._cardId = data._id;
        this._isYourCard = userId;
        this._dataId = data.owner._id;
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._data = data;
        this._handleCardLike = handleCardLike;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._likes = data.likes;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._elementCounterLike = this._element.querySelector('.element__like-counter');
        this._elementLike = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__delete');
        this._setEventListeners();
        this._elementImage.src = this._image;
        this._elementImage.alt = this._title;
        this._element.querySelector('.element__name').textContent = this._title;
        if (!(this._isYourCard === this._dataId)) {
            this._elementDelete.remove();
          };
        this._toggleLikeState();

        return this._element;
    }

    _checkLikesCard(){
        const myLike = this._likes.some((item) => {
            if (item._id === this._userId){
                return true
            } else {
                return false
            }
        });
        return myLike
    }

    updateLikes(data){
        this._elementCounterLike.textContent = data.length;
    }

    setLike(){
        this._elementLike.classList.add('element__like_active');
        this.isLiked = true;
    }

    unsetLike(){
        this._elementLike.classList.remove('element__like_active');
        this.isLiked = false;       
    }

    _toggleLikeState() {
        if (this._checkLikesCard()) {
          this.setLike();
        } else {
          this.unsetLike();
        }
    }

    removeItem(){
        this._element.remove();
    }
   
    _setEventListeners() {
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });

        this._elementLike.addEventListener('click', (evt) => {
            this._handleCardLike(evt);
        });

        this._elementDelete.addEventListener('click', (evt) => {
            this._handleCardDelete(evt);
        });
    }

    getCardId(){
        return this._cardId
    }
}