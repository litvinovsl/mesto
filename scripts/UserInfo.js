export default class UserInfo {
    constructor({nameSelector, aboutSelector}){
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }

    getUserInfo(){
        return {
            name: this._nameElement.textContent,
            aboutUser: this._aboutElement.textContent
        }
    }

    setUserInfo({userName, userAbout}){
        this._nameElement.textContent = userName;
        this._aboutElement.textContent = userAbout;
    }
}