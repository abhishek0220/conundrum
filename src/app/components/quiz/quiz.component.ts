import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private storeInfo: StoreInfoService,
    public fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    if(this.storeInfo.isSignedIn){
      this.goTonext();
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  mainForm() {
    this.loginForm = this.fb.group({
      uname: ['', [Validators.required]],
      secret: ['', [Validators.required]]
    })
  }
  login(){
    if(!this.loginForm.valid){
      this.openSnackBar("Invalid Input","Close")
      return false;
    }
    else{
      var uname = this.loginForm.get('uname').value;
      var secret = this.loginForm.get('secret').value;
      var tok = `${uname}:${secret}`;
      var authHeader = {
        'Authorization' : tok
      }
      this.http.get(this.storeInfo.serverURL + '/info', {headers : authHeader}).pipe().subscribe((data)=>{
        console.log(data)
        if(data['status'] != 200) this.openSnackBar(data['msg'],"Close")
        else{
          this.storeInfo.setToken(tok);
          this.goTonext();
        }
      },error =>{
        console.log(error)
      })
    }
  }
  goTonext(){
    console.log("Goining next")
    return this.router.navigateByUrl('question');
  }

}
