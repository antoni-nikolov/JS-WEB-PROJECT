import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from 'src/app/catalog-service';
import { IProperty } from 'src/app/shared/interfaces/property';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  labels: string[] = ['Exclusive', 'Featured'];

  property!: IProperty
  _ownerId!: string
  _id!: string
  localId!: string

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

  ngOnInit(): void {
  }

  getProperty():void{
    this.catalogService.getById(this._ownerId, this._id).subscribe(data => this.property = data)
  }

  onEditSubmit(form: NgForm): void {
    
    if (form.invalid) { return; }

    if (this._ownerId === this.localId) {
      const data = form.value

      this.catalogService.edit(this._ownerId, this._id, data)
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

}
