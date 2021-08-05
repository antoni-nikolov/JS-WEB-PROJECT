import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  title = 1;
  title2 = '';
  inputValue = '';

  classes = ['test-1', 'test-2']

    users = [

        {
            name: 'Toni',
            age: 33
        },

        {
            name: 'Gosho',
            age: 32
        },

        {
            name: 'Ivo',
            age: 34
        },
    ]

    btnClickHandler(name: HTMLInputElement): void {
      this.users.push({
        name: name.value,
        age: this.title++ + 20
      })

      name.value = ''
        
    }

    changeTitleHandler(inputEl: HTMLInputElement ): void{
      this.title2 = inputEl.value
      inputEl.value = ''
      
    }

  ngOnInit(): void {
  }

  isActive = false;
  
  toggleActive(){
    this.isActive = !this.isActive
  }

}
