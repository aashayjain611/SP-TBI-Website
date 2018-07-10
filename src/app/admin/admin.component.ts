import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { LoginToggleService } from '../login-toggle.service';
import { PlatformLocation } from '@angular/common';
import { UserService } from '../shared/service/user.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[UserService,SessionStorageService]
})
export class AdminComponent implements OnInit {
  public now: Date = new Date();
  private static obj: any;
  private static output: string;
  time: Date;
  round1:string;
  round2:string;
  constructor(private Location:PlatformLocation,private Table: TableService, private router: Router, private logger: LoginToggleService,private userService: UserService,public sstorage:SessionStorageService) {
    Location.onPopState(() => {
    if(window.location.pathname=='/dashboard')
      this.Location.forward();
    });
    //for storing start round values
    // if(!this.sstorage.retrieve('round1') || !this.sstorage.retrieve('round2') )
    // {
    //   this.userService.getRound().subscribe((data)=>{
    //     this.round1=data['statusEndRound1'];
    //     this.sstorage.store('round1',this.round1);
    //     this.round2=data['statusEndRound1'];
    //     this.sstorage.store('round2',this.round2);
    //     });
    // }
    if(this.sstorage.retrieve('round1')=='END')
    {
      const Round1Button = <HTMLElement>document.querySelector('.round1');
      Round1Button.setAttribute('disabled','disabled');
      Round1Button.style.backgroundColor='black';
    }
    if(this.sstorage.retrieve('round2')=='END')
    {
      const Round2Button = <HTMLElement>document.querySelector('.round2');
      Round2Button.setAttribute('disabled','disabled');
      Round2Button.style.backgroundColor='black';
    }
   }
 Round1()
 {
  const ModalRound1 = <HTMLElement>document.querySelector('.modalround1');  //alert for successful panelist addition
  ModalRound1.style.display='block'; 
 }
 Round2()
 {
  const ModalRound2 = <HTMLElement>document.querySelector('.modalround2');  //alert for successful panelist addition
  ModalRound2.style.display='block'; 
 }
 close(){
  const ModalRound1 = <HTMLElement>document.querySelector('.modalround1');  //alert for successful panelist addition
  ModalRound1.style.display='none';
  const ModalRound2 = <HTMLElement>document.querySelector('.modalround2');  //alert for successful panelist addition
  ModalRound2.style.display='none'; 
 }
 roundstart1()
 {
   this.close();
  const Round1Button = <HTMLElement>document.querySelector('.round1');
  Round1Button.setAttribute('disabled','disabled');
  Round1Button.style.backgroundColor='black';
  this.userService.sendRound1().subscribe((data)=>{
    console.log("successful");
    this.round1='yes';
    this.sstorage.store('round1',this.round1);
  });
 }
 roundstart2()
 {
   this.close();
  const Round2Button = <HTMLElement>document.querySelector('.round2');
  Round2Button.setAttribute('disabled','disabled');
  Round2Button.style.backgroundColor='black';
  this.userService.sendRound2().subscribe((data)=>{
    console.log("successful");
    this.round2='yes';
    this.sstorage.store('round2',this.round2);
  });
 }

  ngOnInit() {
    this.userService.getClock().subscribe(time => this.time = time);
  }
 
}
