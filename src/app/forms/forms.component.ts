import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { LoginToggleService } from '../login-toggle.service';
import { startupForm } from '../shared/models/user.model';
import { UserService } from '../shared/service/user.service';




@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  providers:[TableService, LoginToggleService,UserService]
})
export class FormsComponent implements OnInit {
  exceeded:boolean=false;
  model;
  accepted:number;
  rejected:number;
  currentEvalID:number;
  count:number=0;
  currentevalStartup=[];
  startups=[];
  startupsCopy=[];
  category1:string;
  status1:string;
  constructor(private logger:LoginToggleService, private router: Router, private Table: TableService,public userService:UserService) {
    this.userService.getFormForFounder().subscribe((data)=>{
      this.startups.push(data);
      this.startupsCopy.push(data);
});
   }
  //  selectCategory(cat:string){
  //   this.startups=[];
  //   for(let entry of this.startupsCopy)
  //   {
  //     if(cat===entry.category)
  //     {
  //       this.startups.push(entry);
  //     }
  //   }
  //   if(cat=='All')
  //   {
  //     this.startups=this.startupsCopy;
  //   }
  // }
  selectCategoryStatus(){
    this.startups=[];
    for(let entry of this.startupsCopy)
    {
        if(this.category1=='ALL' && this.status1=='ALL')  //if both category and status are all
        {
          this.startups.push(entry);
        }
        if(this.category1=='ALL' && this.status1!='ALL')   //if just category is all
        {
          if(this.status1=='ACCEPTED' && entry.status=='YES')
            {
              this.startups.push(entry);
            }
            else if(this.status1=='REJECTED' && entry.status=='NO')
            {
              this.startups.push(entry);
            }  
        }
        if(this.category1==entry.category && this.category1!='ALL') 
        {
            if(this.status1=='ACCEPTED' && entry.status=='YES') //if status is not all and category is not all
            {
              this.startups.push(entry);
            }
            else if(this.status1=='REJECTED' && entry.status=='NO') //if status is not all and category is not all
            {
              this.startups.push(entry);
            }   
            else if(this.status1=='ALL') //if status is  all and category is not all
            {
              this.startups.push(entry);
            }
        }
    }
  }
  
  goToForm(startupID:number)
  { 
    console.log(this.count);
    console.log(startupID);
    let x = document.querySelector("#form");
    if (x){
        x.scrollIntoView();
    }
    this.currentEvalID=startupID;
    this.Table.getFormDetails(this.currentEvalID).subscribe(

    );
    this.Table.getFormFounders(this.currentEvalID).subscribe(

    );
    
    for(let entry of this.startups)
    {
      if(entry.formid===startupID)
      {
          this.currentevalStartup=entry;
          break;
      }
    }
  }
  goToTop(table:string)
  {
    console.log("gototop");
    let x = document.querySelector("#"+table);
    if (x){
        x.scrollIntoView();
    }
  }
  ngOnInit() {
  }
  
}
