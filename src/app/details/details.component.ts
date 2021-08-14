import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog-service';
import { IProperty } from '../shared/interfaces/property';
import { IUserDB } from '../shared/interfaces/userDB';
import { UserService } from '../user-service.service';
import { tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnDestroy {

  subscription = new Subscription();

  data!: any
  property!: IProperty
  ownerData!: IUserDB

  messageWasSend!: string | null
  notSendMessage!: string | null


  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private userService: UserService,
    private messageService: MessageService
  ) { 

    const data = this.route.snapshot.params;
    this.data = data;
    this.getProperty()

  }


  getProperty(): void {
    this.subscription.add(
    this.catalogService.getById(this.data._ownerid, this.data._id)
      .pipe(
        tap(x => this.getOwner(x._ownerId))
      )
      .subscribe(data => this.property = data)
    );
  }

  getOwner(_id: string): void {
    this.subscription.add(
    this.userService.getUserFromDb(_id)
      .subscribe(data => this.ownerData = Object.values(data)[0]));
  }

  messageHandler(form: NgForm): void {

    if (form.invalid) { return; }
    const { name, email, message } = form.value
    const ownerId = this.property._ownerId;

    this.subscription.add(
    this.messageService.sendMessage(ownerId, name, email, message)
    .subscribe({
      next: () => {
        this.messageWasSend = 'The message has been sent!'
      },
      error: (err) => {
        if (err.status == 401) {
          this.notSendMessage = 'You must be a logged user!';
        }
      }
    }));
    form.resetForm()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } 

}
