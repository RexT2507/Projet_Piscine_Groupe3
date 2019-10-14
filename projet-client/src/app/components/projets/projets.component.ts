import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss']
})
export class ProjetsComponent implements OnInit {

  projets = [];

  FormGroup: FormGroup;

  constructor(private projetService: ProjetService, private formBuilder: FormBuilder) { }

  hide() {
    const x = document.getElementById('detail');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  ngOnInit() {
    this.projetService.getProjets()
      .subscribe(
        res => this.projets = res,
        err => console.log(err)
      );

    this.FormGroup = this.formBuilder.group({
      Ctrl: ['', Validators.required]
    });
  }
}
