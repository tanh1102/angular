import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos$: Object;

  constructor(private data: DataService, private route: ActivatedRoute) {
      this.route.params.subscribe( params => this.photos$ = params.id);
   }

  ngOnInit() {
    this.data.getAlbum(this.photos$).subscribe(
      data => this.photos$ = data
    );
  }

}
