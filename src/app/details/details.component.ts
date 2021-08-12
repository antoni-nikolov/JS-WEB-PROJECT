import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog-service';
import { IProperty } from '../shared/interfaces/property';
import { IUserDB } from '../shared/interfaces/userDB';
import { UserService } from '../user-service.service';
import { tap } from 'rxjs/operators';
import { MessageService } from '../message.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  data!: any
  property!: IProperty
  ownerData!: IUserDB
  messageWasSend!: string | null

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    const data = this.route.snapshot.params;
    this.data = data;
    this.getProperty()

  }

  getProperty(): void {
    this.catalogService.getById(this.data._ownerid, this.data._id)
      .pipe(
        tap(x => this.getOwner(x._ownerId))
      )
      .subscribe(data => this.property = data)

  }

  getOwner(_id: string) {
    this.userService.getUserFromDb(_id)
      .subscribe(data => this.ownerData = Object.values(data)[0])
  }

  sendMessage(form: NgForm): void {
    if (form.invalid) { return; }
    const { name, email, message } = form.value
    const ownerId = this.property._ownerId;

    this.messageService.currentOwner(ownerId, name, email, message)
    this.messageWasSend = 'The message has been sent!'

    form.resetForm()

  }

}
