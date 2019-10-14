import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-refus',
  templateUrl: './refus.component.html',
  styleUrls: ['./refus.component.scss']
})
export class RefusComponent implements OnInit {

  refusProjets = [];

  FormGroup: FormGroup;

  constructor(private projetService: ProjetService, private router: Router, private formBuilder: FormBuilder) { }

  hide() {
    const x = document.getElementById('detail');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  ngOnInit() {
    this.projetService.getRefusProjets()
      .subscribe(
        res => this.refusProjets = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']);
            }
          }
        }
      );
    this.FormGroup = this.formBuilder.group({
      Ctrl: ['', Validators.required]
    });
  }

}
