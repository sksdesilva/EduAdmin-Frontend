import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient,private router:Router){}

  loginData = {  
  username:'',
  password:'',
};




  async onSubmit(loginData:NgForm){

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(this.loginData.password,saltRounds);

    if(this.loginData.username == '' || this.loginData.password == ''){
      alert("Please enter username and password");
      return
    }
    
 
    const url = 'http://localhost:8097/login';

    const params = new HttpParams()
      .set('username',this.loginData.username)
      .set('password',this.loginData.password);



    this.http.post(url,{},{ params }).subscribe(
      (responce)=>{
        console.log(responce);
        this.router.navigate(['/viewstudents']);
      },
      (error)=>{
        this.handleError(error);
      }
    );
  }

  handleError(error:any){
    console.log(error);
    if (error.status === 500) {
      alert("Your username or password was incorrect");
    }
  }



}
