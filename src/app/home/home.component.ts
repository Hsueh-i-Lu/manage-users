import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from '../people.service';
import { Person } from '../people';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private peopleService: PeopleService) {}

  users: Person[] = [];

  ngOnInit(): void {
    //run each time the page loads
    this.users = this.peopleService.getUsers();
  }

  gotoSearchPage() {
    this.router.navigateByUrl('/search');
  }
  gotoCreatePage() {
    this.router.navigateByUrl('/create');
  }
}
