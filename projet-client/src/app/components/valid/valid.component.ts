import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valid',
  templateUrl: './valid.component.html',
  styleUrls: ['./valid.component.scss']
})
export class ValidComponent implements OnInit {

  validProjets = [];

  constructor(private projetService: ProjetService, private router: Router) { }

  ngOnInit() {
    this.projetService.getValidProjets()
      .subscribe(
        res => this.validProjets = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']);
            }
          }
        }
      );
  }

}
