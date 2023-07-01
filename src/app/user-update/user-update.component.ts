import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

postId: number = 0;

posts: any;

Button: boolean = true;

formData = {
    username: '',
    email: '',
    country:'',
    password:'',
}

constructor(private route: ActivatedRoute,private http: HttpClient,private router: Router){}

ngOnInit(){
  this.route.params.subscribe(params => {
    this.postId =+ params['id'];

    this.http.get(`http://localhost:8097/student/${this.postId}`).subscribe(
      (response: any) => {
        this.posts = response;
        console.log(this.posts);
      },
      (error) => {
        console.log(error);
      }
    );
    
  });
}

async onSubmit(form: NgForm){
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(this.formData.password,saltRounds);

  this.formData.password = hashedPassword;
  this.formData.username=this.posts.username;
  this.formData.password=this.posts.password;
  this.formData.email=this.posts.email;
  this.formData.country=this.posts.country;


  const url = `http://localhost:8097/student/${this.postId}`;

  this.http.put(url,this.formData).subscribe(
    (response) => {
      console.log(response);
      this.router.navigate(['/viewstudents']);
      
    },
    (error) => {
      console.log(error);
    }
  );
 
}

}
