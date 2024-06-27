import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { error } from 'console';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {


  postForm !: FormGroup;
  tags:string[] = [];

  constructor(private fb : FormBuilder,
    private router : Router,
    private snackbar : MatSnackBar,
    private postService : PostService
  ){}

  ngOnInit(){ 
    this.postForm = this.fb.group({
      name : [null,Validators.required],
      content : [null,[Validators.required,Validators.maxLength(500)]],
      img : [null,Validators.required],
      postedBy : [null,Validators.required]
    })
  }

  add(event:any){
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }
  remove(tag:any){
    const index = this.tags.indexOf(tag);
    if(index >= 0){
      this.tags.splice(index,1);
    }
  }

  createPost(){
    const data = this.postForm.value;
    data.tags = this.tags;
    this.postService.createNewPost(data).subscribe({ next : (res : any)=>{
      this.snackbar.open('Post Created Successfully!', 'Ok');
      this.router.navigate(['/']);
    },error : (error : any)=>{
      this.snackbar.open('Something went wrong!', 'Ok');
    }})
  }
}
