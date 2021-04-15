import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-ques',
  templateUrl: './ques.component.html',
  styleUrls: ['./ques.component.css']
})
export class QuesComponent implements OnInit {
  ques: any = {};
  ansForm: FormGroup;
  progress = true;
  constructor(
    private storeInfo: StoreInfoService,
    private http: HttpClient,
    public fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.storeInfo.isSignedIn == false){
      this.router.navigateByUrl('');
    }
    else{
      this.getQues();
      this.mainForm();
    }
  }
  mainForm() {
    this.ansForm = this.fb.group({
      qno: ['', [Validators.required]],
      ans: ['', [Validators.required]]
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  logout(){
    this.storeInfo.reset();
    this.router.navigateByUrl('');
  }
  getQues(){
    this.progress = true;
    var authHeader = {
      'Authorization' : this.storeInfo.authToken
    }
    
    this.http.get(this.storeInfo.serverURL + '/ques', {headers : authHeader}).pipe().subscribe((data)=>{
      console.log(data)
      this.ques = data;
      this.ansForm.get('qno').setValue(data['SN'])
      this.progress = false;
    },error =>{
      console.log(error)
      this.progress = false;
    })
  }
  submitAns(){
    if(!this.ansForm.valid){
      this.openSnackBar("Invalid Input","Close")
      return false;
    }
    else{
      var authHeader = {
        'Authorization' : this.storeInfo.authToken
      }
      this.progress = true;
      this.http.post(this.storeInfo.serverURL + '/submit', this.ansForm.value, {headers : authHeader}).pipe().subscribe((data)=>{
        console.log(data)
        if(data['status'] != 201){
          this.openSnackBar(data['msg'] || data['message'],"Close")
        }
        else{
          this.ansForm.get('ans').setValue("");
          this.getQues();
        }
        this.progress = false;
      },error =>{
        console.log(error)
        this.progress = false;
      })
    }
  }

}
