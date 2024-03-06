import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PlanetService } from '../services/planet.service';
import { formatLargeNumber } from 'src/lib';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css'],
})
export class PlanetsListComponent implements OnInit, OnChanges {
  totalPlanets: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  isFetching: boolean = false;
  planets: any[] = [];
  residentDetails: { [key: string]: any } = {};
  nextUrl: string | null = null;
  previousUrl: string | null = null;

  constructor(private planetService: PlanetService) {}

  @Input() planetName!: string;

  ngOnInit(): void {
    this.fetchPlanets();
  }

  ngOnChanges(): void {
    if (this.planetName.trim() !== '') {
      this.fetchPlanetsBySearch();
    } else {
      this.fetchPlanets();
    }
  }

  fetchPlanets(): void {
    this.isFetching = true;
    this.planetService
      .getPlanets(this.currentPage, this.planetName)
      .then((res: any) => {
        this.processPlanetsData(res);
        this.isFetching = false;
      })
      .catch((error: any) => {
        console.error('Error fetching planets:', error);
        this.isFetching = false;
      });
  }

  fetchPlanetsBySearch(): void {
    this.isFetching = true;
    this.planetService
      .getPlanetsBySearch(this.planetName)
      .then((data: any) => {
        this.processPlanetsData(data);
        this.isFetching = false;
      })
      .catch((error: any) => {
        console.error('Error fetching planets by search:', error);
        this.isFetching = false;
      });
  }

  processPlanetsData(data: any): void {
    this.planets = data.results;
    this.totalPlanets = data.count;
    this.nextUrl = data.next;
    this.previousUrl = data.previous;
    this.fetchResidentsDetails();
  }

  fetchResidentsDetails(): void {
    const residentUrls = this.planets.reduce((urls: string[], planet: any) => {
      return urls.concat(
        planet.residents.filter((url: string) => !this.residentDetails[url])
      );
    }, []);

    const requests = residentUrls.map((url: string) => {
      return this.planetService
        .getResidentDetails(url)
        .then((resident: any) => {
          this.residentDetails[url] = resident;
        })
        .catch((error: any) => {
          console.error('Error fetching resident details:', error);
        });
    });

    Promise.all(requests)
      .then(() => {})
      .catch((error) =>
        console.error('Error fetching residents details:', error)
      );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchPlanets();
  }

  onNext(): void {
    if (this.nextUrl) {
      this.currentPage = this.extractPageNumber(this.nextUrl);
      this.fetchPlanets();
    }
  }

  onPrevious(): void {
    if (this.previousUrl) {
      this.currentPage = this.extractPageNumber(this.previousUrl);
      this.fetchPlanets();
    }
  }

  private extractPageNumber(url: string): number {
    const pageNumberMatch = url.match(/page=(\d+)/);
    return pageNumberMatch ? parseInt(pageNumberMatch[1]) : 1;
  }

  getImageUrl(url: string): string {
    const planetId = this.getPlanetId(url);
    return `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
  }

  handleImageError(event: any): void {
    event.target.src =
      'https://img.freepik.com/premium-vector/illustration-website-error-page-404-found-cosmos-space-with-planet-lost-space_258153-325.jpg';
  }

  formatNumber(number: number): string {
    return isNaN(number) ? '' : formatLargeNumber(number);
  }

  private getPlanetId(url: string): string {
    return this.getIdFromUrl(url);
  }

  getResidentId(url: string): string {
    return this.getIdFromUrl(url);
  }

  private getIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}
