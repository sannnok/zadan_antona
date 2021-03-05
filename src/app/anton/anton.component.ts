import { Component, OnInit, ViewChild, ElementRef, ComponentRef, ViewRef } from '@angular/core';
import { OrganComponent } from './organ/organ.component';
import { TzentrPoliotovAntonaService } from './tzentr-poliotov-antona.service';

@Component({
  selector: 'app-anton',
  templateUrl: './anton.component.html',
  styleUrls: ['./anton.component.scss']
})
export class AntonComponent implements OnInit {

  @ViewChild('glavnyiOrgan',{static: false}) glavnyiOrgan: OrganComponent;

  constructor(
    private tsup: TzentrPoliotovAntonaService,
    // private componentRef: ComponentRef<OrganComponent>
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.tsup.save(this.glavnyiOrgan);
  }

  restore() {
    this.tsup.restore();
  }

  detach() {
    this.tsup.detach();
  }

}
