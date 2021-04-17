import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderBoard = [];
  typeStr = "";
  toDisp = 0;
  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
    private activatedroute: ActivatedRoute,
  ) {
    this.activatedroute.queryParamMap.subscribe(params => {
      var tmp = params.get('name') || 'null';
      this.typeStr = tmp;
    });
  }

  ngOnInit(): void {
    this.getRanklist()
  }
  getRanklist(){
    this.http.get(this.storeInfo.serverURL + '/leaderboard' + `?name=${this.typeStr}`).pipe().subscribe((data)=>{
      console.log(data)
      if(data['status'] == 200){
        this.leaderBoard = data['list'];
        this.toDisp = 1;
      }
      else this.toDisp = 2;
    },error =>{
      console.log(error)
    })
  }

}
