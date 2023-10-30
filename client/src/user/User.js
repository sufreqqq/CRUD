import {makeAutoObservable} from "mobx";

export default class User {
    constructor() {
        this._isAuth = Boolean(localStorage.getItem('token'))
        this._user = {}
        makeAutoObservable(this)
    }
    
    setIsAuth(bool){
        this._isAuth = bool
    }
    
    setUser(bool){
        this._user = bool
    }
    
    get isAuth(){
        return this._isAuth
    }
    
    get User(){
        return this._user
    }
}