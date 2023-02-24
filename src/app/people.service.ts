import { Injectable, OnInit } from '@angular/core';
import { Person, people } from './people';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeopleService implements OnInit {
  users: Person[] = people;
  //azure function app
  searchUrl: string =
    'https://sherry2023.azurewebsites.net/api/HttpTrigger1?code=aUMb00izzd06LynncHhCVkiZK0TKaAMgqwMsW4zCtt_bAzFu5a-evQ==';
  createUrl: string =
    'https://sherry2023.azurewebsites.net/api/HttpTrigger2?code=h4sQ6iEur2q4VLRKop59n4u26H6Mely0XMbe_DFvF9_pAzFuBvPgzg==';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadIP();
  }

  user_ip: string = '';
  loadIP() {
    this.httpClient.get('https://jsonip.com/').subscribe((data: any) => {
      console.log(data);
      this.user_ip = data as string;
    });
  }

  getUsers() {
    return this.users;
  }

  addUser(first_name: string, last_name: string, email: string) {
    this.httpClient
      .post<Person[]>(this.createUrl, {
        NewUser: {
          //id created inside azure function app
          first_name: first_name,
          last_name: last_name,
          email: email,
          ip_address: this.user_ip,
        },
        AllUserData: this.users,
      })
      .subscribe((data) => {
        this.users = data as Person[];
      });

    let last: any = this.users[this.users.length - 1];
    return last.id;
  }

  searchUser(first_name: string) {
    return this.httpClient.post<Person[]>(
      this.searchUrl + '&&first_name=' + first_name,
      { AllUserData: this.users }
    );
  }
}
