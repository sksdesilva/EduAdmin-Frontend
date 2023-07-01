import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// interface User{
//   id: number;
//   username: string;
//   country: string;
//   email: string;
//   password: string;
// }

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})


export class ViewStudentsComponent implements OnInit  {

  posts: any;
  Button: boolean = true;
  

  // user: User | undefined;

 

constructor(private http: HttpClient,private router: Router){}

ngOnInit(): void {
  this.http.get('http://localhost:8097/student').subscribe(
    (response: any) => {
      this.posts = response; // Assigning response to the user property
      console.log(this.posts);
    },
    (error) => {
      console.log(error);
    }
  );
}

onUpdate(postId: number){
  this.router.navigate(['updateuser',postId])
}

onDelete(postId: number){
  this.http.delete(`http://localhost:8097/student/${postId}`).subscribe(
    (response: any) => {
      console.log(response);
      window.location.reload();
      
    },
    (error) => {
      console.log(error);
      
    }
  );
}
}

