import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-ques',
  templateUrl: './ques.component.html',
  styleUrls: ['./ques.component.css']
})
export class QuesComponent implements OnInit {

  constructor(
    private storeInfo: StoreInfoService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.storeInfo.isSignedIn == false){
      this.router.navigateByUrl('');
    }
    else{
      this.getQues();
    }
  }
  logout(){
    this.storeInfo.reset();
    this.router.navigateByUrl('');
  }
  getQues(){
    var authHeader = {
      'Authorization' : this.storeInfo.authToken
    }
    this.http.get(this.storeInfo.serverURL + '/ques', {headers : authHeader}).pipe().subscribe((data)=>{
      console.log(data)
    },error =>{
      console.log(error)
    })
  }

}
