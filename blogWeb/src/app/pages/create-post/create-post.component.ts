import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private snackbar : MatSnackBar
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
}
