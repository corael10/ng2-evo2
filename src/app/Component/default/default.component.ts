import { Component, OnInit } from '@angular/core';

@Component({
  moduleId : module.id,
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
