import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../services/planet.service';
import { formatLargeNumber } from 'src/lib';
@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css'],
})
export class PlanetsListComponent implements OnInit {
  totalPlanets: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  searchQuery: string = '';

  isFetching: boolean = false;
  planets: any[] = [];

  isFecthing: boolean = false;
  residentDetails: { [key: string]: any } = {};

  nextUrl: string | null = null;
  previousUrl: string | null = null;

  constructor(private planetService: PlanetService) {}

  ngOnInit(): void {
    this.getPlanets();
    // this.planets = [
    //   {
    //     name: 'Tatooine',
    //     rotation_period: '23',
    //     orbital_period: '304',
    //     diameter: '10465',
    //     climate: 'arid',
    //     gravity: '1 standard',
    //     terrain: 'desert',
    //     surface_water: '1',
    //     population: '200000',
    //     residents: [
    //       'https://swapi.dev/api/people/1/',
    //       'https://swapi.dev/api/people/2/',
    //       'https://swapi.dev/api/people/4/',
    //       'https://swapi.dev/api/people/6/',
    //       'https://swapi.dev/api/people/7/',
    //       'https://swapi.dev/api/people/8/',
    //       'https://swapi.dev/api/people/9/',
    //       'https://swapi.dev/api/people/11/',
    //       'https://swapi.dev/api/people/43/',
    //       'https://swapi.dev/api/people/62/',
    //     ],
    //     films: [
    //       'https://swapi.dev/api/films/1/',
    //       'https://swapi.dev/api/films/3/',
    //       'https://swapi.dev/api/films/4/',
    //       'https://swapi.dev/api/films/5/',
    //       'https://swapi.dev/api/films/6/',
    //     ],
    //     created: '2014-12-09T13:50:49.641000Z',
    //     edited: '2014-12-20T20:58:18.411000Z',
    //     url: 'https://swapi.dev/api/planets/1/',
    //   },
    //   {
    //     name: 'Alderaan',
    //     rotation_period: '24',
    //     orbital_period: '364',
    //     diameter: '12500',
    //     climate: 'temperate',
    //     gravity: '1 standard',
    //     terrain: 'grasslands, mountains',
    //     surface_water: '40',
    //     population: '2000000000',
    //     residents: [
    //       'https://swapi.dev/api/people/5/',
    //       'https://swapi.dev/api/people/68/',
    //       'https://swapi.dev/api/people/81/',
    //     ],
    //     films: [
    //       'https://swapi.dev/api/films/1/',
    //       'https://swapi.dev/api/films/6/',
    //     ],
    //     created: '2014-12-10T11:35:48.479000Z',
    //     edited: '2014-12-20T20:58:18.420000Z',
    //     url: 'https://swapi.dev/api/planets/2/',
    //   },
    //   {
    //     name: 'Yavin IV',
    //     rotation_period: '24',
    //     orbital_period: '4818',
    //     diameter: '10200',
    //     climate: 'temperate, tropical',
    //     gravity: '1 standard',
    //     terrain: 'jungle, rainforests',
    //     surface_water: '8',
    //     population: '1000',
    //     residents: [],
    //     films: ['https://swapi.dev/api/films/1/'],
    //     created: '2014-12-10T11:37:19.144000Z',
    //     edited: '2014-12-20T20:58:18.421000Z',
    //     url: 'https://swapi.dev/api/planets/3/',
    //   },
    //   {
    //     name: 'Hoth',
    //     rotation_period: '23',
    //     orbital_period: '549',
    //     diameter: '7200',
    //     climate: 'frozen',
    //     gravity: '1.1 standard',
    //     terrain: 'tundra, ice caves, mountain ranges',
    //     surface_water: '100',
    //     population: 'unknown',
    //     residents: [],
    //     films: ['https://swapi.dev/api/films/2/'],
    //     created: '2014-12-10T11:39:13.934000Z',
    //     edited: '2014-12-20T20:58:18.423000Z',
    //     url: 'https://swapi.dev/api/planets/4/',
    //   },
    //   {
    //     name: 'Dagobah',
    //     rotation_period: '23',
    //     orbital_period: '341',
    //     diameter: '8900',
    //     climate: 'murky',
    //     gravity: 'N/A',
    //     terrain: 'swamp, jungles',
    //     surface_water: '8',
    //     population: 'unknown',
    //     residents: [],
    //     films: [
    //       'https://swapi.dev/api/films/2/',
    //       'https://swapi.dev/api/films/3/',
    //       'https://swapi.dev/api/films/6/',
    //     ],
    //     created: '2014-12-10T11:42:22.590000Z',
    //     edited: '2014-12-20T20:58:18.425000Z',
    //     url: 'https://swapi.dev/api/planets/5/',
    //   },
    //   {
    //     name: 'Bespin',
    //     rotation_period: '12',
    //     orbital_period: '5110',
    //     diameter: '118000',
    //     climate: 'temperate',
    //     gravity: '1.5 (surface), 1 standard (Cloud City)',
    //     terrain: 'gas giant',
    //     surface_water: '0',
    //     population: '6000000',
    //     residents: ['https://swapi.dev/api/people/26/'],
    //     films: ['https://swapi.dev/api/films/2/'],
    //     created: '2014-12-10T11:43:55.240000Z',
    //     edited: '2014-12-20T20:58:18.427000Z',
    //     url: 'https://swapi.dev/api/planets/6/',
    //   },
    //   {
    //     name: 'Endor',
    //     rotation_period: '18',
    //     orbital_period: '402',
    //     diameter: '4900',
    //     climate: 'temperate',
    //     gravity: '0.85 standard',
    //     terrain: 'forests, mountains, lakes',
    //     surface_water: '8',
    //     population: '30000000',
    //     residents: ['https://swapi.dev/api/people/30/'],
    //     films: ['https://swapi.dev/api/films/3/'],
    //     created: '2014-12-10T11:50:29.349000Z',
    //     edited: '2014-12-20T20:58:18.429000Z',
    //     url: 'https://swapi.dev/api/planets/7/',
    //   },
    //   {
    //     name: 'Naboo',
    //     rotation_period: '26',
    //     orbital_period: '312',
    //     diameter: '12120',
    //     climate: 'temperate',
    //     gravity: '1 standard',
    //     terrain: 'grassy hills, swamps, forests, mountains',
    //     surface_water: '12',
    //     population: '4500000000',
    //     residents: [
    //       'https://swapi.dev/api/people/3/',
    //       'https://swapi.dev/api/people/21/',
    //       'https://swapi.dev/api/people/35/',
    //       'https://swapi.dev/api/people/36/',
    //       'https://swapi.dev/api/people/37/',
    //       'https://swapi.dev/api/people/38/',
    //       'https://swapi.dev/api/people/39/',
    //       'https://swapi.dev/api/people/42/',
    //       'https://swapi.dev/api/people/60/',
    //       'https://swapi.dev/api/people/61/',
    //       'https://swapi.dev/api/people/66/',
    //     ],
    //     films: [
    //       'https://swapi.dev/api/films/3/',
    //       'https://swapi.dev/api/films/4/',
    //       'https://swapi.dev/api/films/5/',
    //       'https://swapi.dev/api/films/6/',
    //     ],
    //     created: '2014-12-10T11:52:31.066000Z',
    //     edited: '2014-12-20T20:58:18.430000Z',
    //     url: 'https://swapi.dev/api/planets/8/',
    //   },
    //   {
    //     name: 'Coruscant',
    //     rotation_period: '24',
    //     orbital_period: '368',
    //     diameter: '12240',
    //     climate: 'temperate',
    //     gravity: '1 standard',
    //     terrain: 'cityscape, mountains',
    //     surface_water: 'unknown',
    //     population: '1000000000000',
    //     residents: [
    //       'https://swapi.dev/api/people/34/',
    //       'https://swapi.dev/api/people/55/',
    //       'https://swapi.dev/api/people/74/',
    //     ],
    //     films: [
    //       'https://swapi.dev/api/films/3/',
    //       'https://swapi.dev/api/films/4/',
    //       'https://swapi.dev/api/films/5/',
    //       'https://swapi.dev/api/films/6/',
    //     ],
    //     created: '2014-12-10T11:54:13.921000Z',
    //     edited: '2014-12-20T20:58:18.432000Z',
    //     url: 'https://swapi.dev/api/planets/9/',
    //   },
    //   {
    //     name: 'Kamino',
    //     rotation_period: '27',
    //     orbital_period: '463',
    //     diameter: '19720',
    //     climate: 'temperate',
    //     gravity: '1 standard',
    //     terrain: 'ocean',
    //     surface_water: '100',
    //     population: '1000000000',
    //     residents: [
    //       'https://swapi.dev/api/people/22/',
    //       'https://swapi.dev/api/people/72/',
    //       'https://swapi.dev/api/people/73/',
    //     ],
    //     films: ['https://swapi.dev/api/films/5/'],
    //     created: '2014-12-10T12:45:06.577000Z',
    //     edited: '2014-12-20T20:58:18.434000Z',
    //     url: 'https://swapi.dev/api/planets/10/',
    //   },
    // ];
  }

  getPlanets(): void {
    this.isFetching = true;
    this.planetService.getPlanets(this.currentPage, this.searchQuery).then(
      (res: any) => {
        this.planets = res.results;
        this.totalPlanets = res.count;
        this.planets = res.results;
        this.nextUrl = res.next;
        this.previousUrl = res.previous;
        // console.log(res.results);
        this.fetchResidentsDetails();
        this.isFetching = false;
      },
      (error: any) => {
        console.log(error);
        this.isFetching = false;
      }
    );
  }

  getCount(): number {
    this.getPlanets();
    return this.totalPlanets;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getPlanets();
  }

  getPlanetId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  getResidentId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  fetchResidentsDetails(): void {
    for (const planet of this.planets) {
      for (const residentUrl of planet.residents) {
        if (!this.residentDetails[residentUrl]) {
          // Fetch resident details only if not already fetched
          this.planetService
            .getResidentDetails(residentUrl)
            .then((resident) => {
              this.residentDetails[residentUrl] = resident;
            })
            .catch((error) => {
              console.error('Error fetching resident details:', error);
            });
        }
      }
    }
  }

  onNext(): void {
    if (this.nextUrl) {
      // Extract currentPage from the nextUrl
      this.currentPage = this.extractPageNumber(this.nextUrl);

      this.getPlanets();
    }
  }

  onPrevious(): void {
    if (this.previousUrl) {
      // Extract currentPage from the previousUrl
      this.currentPage = this.extractPageNumber(this.previousUrl);
      this.getPlanets();
    }
  }

  private extractPageNumber(url: string): number {
    // Extracting the page number from the URL
    const pageNumberMatch = url.match(/page=(\d+)/);
    if (pageNumberMatch && pageNumberMatch[1]) {
      return parseInt(pageNumberMatch[1]);
    }
    return 1; // Default to page 1 if not found
  }

  // Method to construct the image URL
  getImageUrl(url: string): string {
    const planetId = this.getPlanetId(url);
    return `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
  }

  // Method to handle image loading errors
  handleImageError(event: any): void {
    event.target.src =
      'https://img.freepik.com/premium-vector/illustration-website-error-page-404-found-cosmos-space-with-planet-lost-space_258153-325.jpg';
  }

  onSearch(): void {
    if (this.searchQuery.trim() !== '') {
      // Fetch planets again from SWAPI based on the search query
      this.planetService
        .getPlanetsBySearch(this.searchQuery)
        .then((data: any) => {
          this.planets = data.results;
        });
    } else {
      // If search query is empty, reset to display all planets
      this.getPlanets();
    }
  }

  formatNumber(number: number): string {
    if (isNaN(number)) {
      return '';
    }
    return formatLargeNumber(number);
  }
}
