import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';
import { error } from 'console';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {

  postId = this.activatedRoute.snapshot.params['id'];
  postData : any;
  comments : any;

  commentForm !: FormGroup;

  constructor(private postService : PostService,
    private activatedRoute : ActivatedRoute,
    private matSnackBar : MatSnackBar,
    private fb : FormBuilder,
    private commentService : CommentService
  ){}

  ngOnInit(){
    this.getPostById();
    // this.getCommentsByPost();
    
    this.commentForm = this.fb.group({
      postedBy : [null,Validators.required],
      content : [null,Validators.required]
    })
  }

  publishComment(){
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId, postedBy, content).subscribe({next : (res)=>{
    this.matSnackBar.open('Comment published successfully', 'OK');
      this.getCommentsByPost();
    },error : (error)=>{
      this.matSnackBar.open('Error publishing comment', 'OK');
    }})
  }

  getCommentsByPost(){
    this.commentService.getAllCommentsByPost(this.postId).subscribe({next : (res)=>{
      this.comments = res;
    },error : (error)=>{
      this.matSnackBar.open('Error fetching comments', 'OK');
    }})
  }

  getPostById(){
    this.postService.getPostById(this.postId).subscribe({next : (res)=>{
      this.postData = res;
      console.log(res);
      this.getCommentsByPost();
    },error : (error=>{
      this.matSnackBar.open('Error in getting post', 'OK')
    })})
  }

  likePost(){
    this.postService.likePost(this.postId).subscribe({next : (res)=>{
      this.matSnackBar.open("Post Liked Successfully","Ok");
      this.getPostById();
    },error : (error)=>{
      this.matSnackBar.open('Error in liking post', 'OK');
    }})
  }
}
