import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private projetsUrl = '';
  private validProjetsUrl = '';

  constructor(private http: HttpClient) { }

  getProjets() {
    return this.http.get<any>(this.projetsUrl);
  }

  getValidProjets() {
    return this.http.get<any>(this.validProjetsUrl);
  }
}
