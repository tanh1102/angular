import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { Observable} from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Object;
  modalRef: BsModalRef;
  
  constructor(private data: DataService, private modalService: BsModalService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.users$ = data
    );
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

}
