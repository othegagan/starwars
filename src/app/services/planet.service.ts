import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  constructor(private http: HttpClient) {}

  async getPlanets(page: number, searchQuery: string): Promise<any> {
    const url = `${environment.API_URL}/?page=${page}&search=${searchQuery}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getResidentDetails(residentUrl: string): Promise<any> {
    try {
      const response = await axios.get(residentUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPlanetsBySearch(searchText: string): Promise<any> {
    const searchUrl = `${environment.API_URL}?search=${searchText}`;
    try {
      const response = await axios.get(searchUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
