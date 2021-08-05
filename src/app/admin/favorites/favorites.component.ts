import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  username: string = 'Anthony Nikolov';
  userEmail: string = 'a.nikolov88@yahoo.com';

  constructor() { }

  ngOnInit(): void {
  }

}
