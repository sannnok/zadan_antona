import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-pered',
  templateUrl: './pered.component.html',
  styleUrls: ['./pered.component.scss']
})
export class PeredComponent implements OnInit {
  public iteration = { i: 1 };

  @ViewChild('cardChildContainer', { read: TemplateRef }) vcr;
  @ViewChild('rojaem_v_priamom_efire', { read: ViewContainerRef }) mestoRojdeniya: ViewContainerRef;


  public cards: Card[] = [
    new Card(this.iteration, null, 'Base', []),
  ];

  constructor() { }

  ngOnInit(): void {
    console.log(this.cards);
  }

}
