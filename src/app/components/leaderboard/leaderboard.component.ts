import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderBoard = [];
  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
  ) { }

  ngOnInit(): void {
    this.getRanklist()
  }
  getRanklist(){
    this.http.get(this.storeInfo.serverURL + '/leaderboard').pipe().subscribe((data)=>{
      console.log(data)
      if(data['status'] == 200) this.leaderBoard = data['list']
    },error =>{
      console.log(error)
    })
  }

}
