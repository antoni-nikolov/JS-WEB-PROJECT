import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogService } from 'src/app/catalog-service';
import { IProperty } from 'src/app/shared/interfaces/property';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnDestroy {

  subscription = new Subscription();

  labels: string[] = ['Exclusive', 'Featured'];
  categories: string[] = ['House', 'Apartment', 'Villas', 'Restaurant', 'Hotels', 'Plots'];

  property!: IProperty;
  _ownerId!: string;
  _id!: string;
  localId!: string;
  error!: string;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private userService: UserService,
    private router: Router
  ) { 

    this._ownerId = this.route.snapshot.params._ownerid;
    this._id = this.route.snapshot.params._id;
    this.localId = this.userService.getUserData().localId;
    this.getProperty()
    
  }


  getProperty():void{
    this.subscription.add(
    this.catalogService.getById(this._ownerId, this._id).subscribe(data => this.property = data));
  }

  onEditSubmit(form: NgForm): void {
    
    if (form.invalid) { return; }

    if (this._ownerId === this.localId) {

      const data = form.value
      this.subscription.add(
      this.catalogService.edit(this._ownerId, this._id, data)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard/my-properties']);
        },
        error:(err) => {
          if (err.status == 401) {
            this.error = 'Your session has expired!';
            this.userService.logout()
          }
        }
      }));
    }
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
