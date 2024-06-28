import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {

  postId = this.activatedRoute.snapshot.params['id'];
  postData : any;

  constructor(private postService : PostService,
    private activatedRoute : ActivatedRoute,
    private matSnackBar : MatSnackBar
  ){}

  ngOnInit(){
    this.getPostById();
    
  }

  getPostById(){
    this.postService.getPostById(this.postId).subscribe({next : (res)=>{
      this.postData = res;
      console.log(res);
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
