import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-valid',
  templateUrl: './valid.component.html',
  styleUrls: ['./valid.component.scss']
})
export class ValidComponent implements OnInit {

  validProjets = [];

  constructor(private projetService: ProjetService) { }

  ngOnInit() {
    this.projetService.getValidProjets()
      .subscribe(
        res => this.validProjets = res,
        err => console.log(err)
      );
  }

}
