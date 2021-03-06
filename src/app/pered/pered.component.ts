import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-pered',
  templateUrl: './pered.component.html',
  styleUrls: ['./pered.component.scss']
})
export class PeredComponent implements OnInit {
  public iteration = { i: 1 };

  public cards: Card[] = [
    new Card(this.iteration, null, 'Base', []),
  ];

  public savedTree: Card[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('Current structure: ', this.cards);
  }

  // TODO: Save and rerender saved tree

  save() {
    const clonedTree: Card[] = [];
    const recursive = (cards: Card[], jusClonedCard?: Card) => {
      cards.forEach((card: Card) => {
        const clonedCard = {
          id: card.id,
          isCardViewUsed: card.isCardViewUsed,
          isMainTemplateUsed: card.isMainTemplateUsed,
          title: card.title,
          kolvo: card.kolvo,
          iteration: card.iteration,
          userActions: null,
          parent: null,
          view: null,
          childs: [],
        } as Card;
        if (!jusClonedCard) {
          // init node
          clonedTree.push(clonedCard);
        } else {
          jusClonedCard.childs.push(clonedCard);
        }
        recursive(card.childs, clonedCard);
      });
    };

    recursive(this.cards);

    const clonedTreeString = JSON.stringify(clonedTree);
    const clonedTreeObj = JSON.parse(clonedTreeString);
    this.savedTree = clonedTreeObj;
    console.log('Saved state: ', this.savedTree);
  }
}
