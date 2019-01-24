import { Component } from '@angular/core';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor() {
  }

  ngOnInit() {
    console.log(ConfigService.settings)
  }

}
