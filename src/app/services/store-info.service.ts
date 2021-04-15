import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreInfoService {
  authToken : string;
  isSignedIn: boolean;
  serverURL = "https://conundrum-backend.azurewebsites.net";
  constructor() {
    this.refresh()
  }
  getToken(){
    return localStorage.getItem('token');
  }
  refresh(){
    this.isSignedIn = this.getToken()?true:false;
    if(this.isSignedIn == true)
      this.authToken = this.getToken();
  }
  setToken(tok : string){
    localStorage.setItem('token', tok);
    this.refresh();
  }
  reset(){
    console.log("signout")
    localStorage.removeItem('token');
    this.refresh();
  }
}
