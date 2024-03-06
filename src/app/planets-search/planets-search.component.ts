import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-planets-search',
  templateUrl: './planets-search.component.html',
  styleUrls: ['./planets-search.component.css'],
})
export class PlanetsSearchComponent {
  @ViewChild('planetNameInput')
  planetNameInputRef!: ElementRef;

  // To allow data (planetNameInputRef) to flow from the child class(planet-search) to the parent class(main app)
  @Output() onPlanetSearch: EventEmitter<any> = new EventEmitter();

  //HostListener for the key combination "Ctrl + K"
  @HostListener('window:keydown.control.k', ['$event'])

  setFocusOnInput(event: KeyboardEvent) {
    event.preventDefault();

    this.planetNameInputRef.nativeElement.focus();
  }

  planetName: string = '';

  ngOnInit(): void {}

  onSubmit() {
    this.onPlanetSearch.emit(this.planetName);
    // this.planetSeacrhForm.reset();
  }
}
