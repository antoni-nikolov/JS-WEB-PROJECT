import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog-service';
import { IProperty } from '../shared/interfaces/property';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  data!: any
  property!: IProperty 
  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {

    const data = this.route.snapshot.params;
    this.data = data;
    this.getProperty()
    
  }

  getProperty():void{
    this.catalogService.getById(this.data._ownerid, this.data._id).subscribe(data => this.property = data)

  }

}
