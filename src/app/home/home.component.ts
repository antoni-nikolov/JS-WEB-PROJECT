import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  items = [
    //{
    //  title: 'Modern House',
    //  adress: '31th St, New York, NY 10033, USA',
    //  price: 240,
    //  propertySize: 2380,
    //  bedrooms: 2,
    //  bathrooms: 2,
    //  garages: 2,
    //  imageUrl: 'https://i.pinimg.com/originals/45/6f/30/456f302bf3a276d1c9d6917d6d56d0dd.jpg',
    //  label: 'featured'
    //},
    //{
    //  title: 'Modern Apartment',
    //  adress: '51th St, New York, NY 10033, USA',
    //  price: 300,
    //  propertySize: 1380,
    //  bedrooms: 2,
    //  bathrooms: 1,
    //  garages: 1,
    //  imageUrl: 'http://cdn.bestdesignideas.com/wp-content/uploads/2015/11/Modern-Apartment-In-European-Style-In-Taiwan-From-Fertility-Design-Studio-1.jpg',
    //  label: 'hot-offer'
    //},
  ]

  

  constructor() { }

  ngOnInit(): void {
  }

}
