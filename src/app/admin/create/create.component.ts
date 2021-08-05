import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/catalog-service';
import { UserService } from 'src/app/user-service.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

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

    this.catalogService.create(data, localId)
      .subscribe({
      next: () => {
        this.router.navigate(['/dashboard/my-properties']);
      },
      error:(err) => {
        console.error(err);
      }
    })
    
  }
}