import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PeopleService } from '../people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public createForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private peopleService: PeopleService
  ) {
    this.createForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email_address: ['', Validators.required, Validators.email],
    });
  }

  ngOnInit(): void {}

  gotoHomePage() {
    this.router.navigateByUrl('');
  }

  first_name: string = '';
  last_name: string = '';
  email: string = '';
  doCreate(): void {
    if (this.createForm.invalid) {
      return;
    }

    this.first_name = this.createForm.get('first_name')?.value;
    this.last_name = this.createForm.get('last_name')?.value;
    this.email = this.createForm.get('email_address')?.value;
    let id = this.peopleService.addUser(
      this.first_name,
      this.last_name,
      this.email
    );
    Swal.fire('New user (ID: ' + id + ') added successfully.');
    this.gotoHomePage();
  }
}
