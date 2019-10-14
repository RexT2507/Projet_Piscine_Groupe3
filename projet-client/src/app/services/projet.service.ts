import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private projetsUrl = 'http://localhost:3000/api/projets';
  private validProjetsUrl = 'http://localhost:3000/api/valid';
  private refusProjetUrl = 'http://localhost:3000/api/refuse';

  constructor(private http: HttpClient) { }

  getProjets() {
    return this.http.get<any>(this.projetsUrl);
  }

  getValidProjets() {
    return this.http.get<any>(this.validProjetsUrl);
  }

  getRefusProjets() {
    return this.http.get<any>(this.refusProjetUrl);
  }
}
