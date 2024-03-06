import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'starwars-assignment';

  planetName: string = '';

  planetSearchHandler(planetName: string) {
    this.planetName = planetName;
    console.log(this.planetName)
  }
}
