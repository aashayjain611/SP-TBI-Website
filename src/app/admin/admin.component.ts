import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { LoginToggleService } from '../login-toggle.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private static obj: any;
  private static output: string;
  constructor(private Table: TableService, private router: Router, private logger: LoginToggleService) { }
 

  ngOnInit() {
  }
 
}
