import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss']
})
export class ProjetsComponent implements OnInit {

  projets = [];

  constructor(private projetService: ProjetService) { }

  ngOnInit() {
    this.projetService.getProjets()
      .subscribe(
        res => this.projets = res,
        err => console.log(err)
      );
  }

}
