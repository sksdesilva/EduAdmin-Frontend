import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(private http: HttpClient){
    this.http.get('http://localhost:8097/student').subscribe(data=>{
      console.log(data);
    });
  }

}
