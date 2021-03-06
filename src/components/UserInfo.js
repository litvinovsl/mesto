export default class UserInfo {
    constructor({nameSelector, aboutSelector, avatarSelector}){
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent
        }
    }

    setUserInfo({name, about}){
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
    }

    setUserAvatar({ avatarLink }) {
        this._avatarElement.src = avatarLink;
      }
    
    setUserId(id){
        this._userId = id;
    }

    getUserId(){
        return this._userId;
    }
}