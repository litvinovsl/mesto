export default class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkReply(res) {
        if (res.ok) {
            console.log('res.ok');
            return res.json();
        } else {
            console.log('!!!!!!!!!!!!!!!!!res.ok');

            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }

    getInitialCards() {
        const newUrl = this._baseUrl + '/cards';
        return fetch(newUrl, {
            headers: this._headers,
        }).then(this._checkReply);
    }

    // getUserInfo() {
    //     const newUrl = this._baseUrl + '/users/me';
    //     return fetch(newUrl, {
    //         headers: this._headers,
    //     }).then(this._checkReply);
    // }

    updateUserInfo({ name, about }) {
        console.log('updateUserInfo');
        const newUrl = this._baseUrl + '/users/me';
        return fetch(newUrl, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        }).then(this._checkReply);
    }

    addCards() {
        const newUrl = this._baseUrl + '/cards'
        return fetch(newUrl, {
            headers: this._headers
        })
            .then(this._checkReply);
    }

    // addNewCard(body) {
    //     const newUrl = this._baseUrl + '/cards';
    //     return fetch(newUrl, {
    //         method: 'POST',
    //         headers: this._headers,
    //         body: JSON.stringify(body),
    //     }).then(this._checkReply);
    // }

    updateProfileAvatar({ avatar }) {
        const newUrl = this._baseUrl + `/users/me/avatar`;
        return fetch(newUrl, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        }).then(this._checkReply);
    }



    // другие методы работы с API
}

