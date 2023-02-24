import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeopleService } from '../people.service';
import { Person } from '../people';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  public searchForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private peopleService: PeopleService
  ) {
    this.searchForm = this.fb.group({
      first_name: '',
    });
  }

  gotoHomePage() {
    this.router.navigateByUrl('');
  }

  firstname: string = '';
  users!: Observable<Person[]>;

  doSearch(): void {
    this.firstname = this.searchForm.get('first_name')?.value;
    this.users = this.peopleService.searchUser(this.firstname);
  }
}
