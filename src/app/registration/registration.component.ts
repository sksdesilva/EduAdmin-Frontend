import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  pwd: string='';
 
 

  formData = {
    username: '',
    email: '',
    country:'',
    password:''
  };

  constructor(private http: HttpClient,private router: Router){}



validateEmail(email : any){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

   

  async onSubmit(form: NgForm){

    if(this.formData.username == '' || this.formData.email == '' || this.formData.country =='' ||  this.formData.password == '' ){
      alert("every feild shoul be feild before submit");
      return
    }

    if(!this.validateEmail(this.formData.email)){
        alert("your email in incorrect");
        return
    }





    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.formData.password,saltRounds);

    this.formData.password = hashedPassword;

    const url = 'http://localhost:8097/student';

   

    this.http.post(url,this.formData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/welcome']);
        
      },
      (error) => {
        console.log(error);
      }
    );
   
  }

  

}
