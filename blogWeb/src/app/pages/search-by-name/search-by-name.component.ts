import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.css'
})
export class SearchByNameComponent {
  result : any =[];
  name : any = "";

  constructor(private postService:PostService,
    private snackBar : MatSnackBar
  ){}

  searchByName(){
    this.postService.searchByName(this.name).subscribe({next : (data:any) => {
      this.result = data;
    },error : (error)=>{
      this.snackBar.open("Error in fetching data", "Close");
    }})
  }
}
