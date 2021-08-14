import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogService } from 'src/app/catalog-service';
import { UserService } from 'src/app/user-service.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy{

  subscription = new Subscription();

  favoriteSeason!: string;
  labels: string[] = ['Exclusive', 'Featured'];
  categories: string[] = ['House', 'Apartment', 'Villas', 'Restaurant', 'Hotels', 'Plots'];

  error!: string


  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreateSubmit(form: NgForm){
    
    if (form.invalid) { return; }
    const data = form.value
    const localId = this.userService.getUserData().localId;

    this.subscription.add(
    this.catalogService.create(data, localId)
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

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
