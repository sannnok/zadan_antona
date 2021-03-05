import { ViewContainerRef, TemplateRef, ElementRef, EventEmitter } from '@angular/core';

export class Card {
  // Amount of childs to create
  public kolvo = 2;
  public id: number;
  public userClicked = new EventEmitter();

  constructor(
    public iteration?: { i: number },
    public parentId?: number,
    public title?: string,
    public childs?: any[] | Card[]
  ) {
    this.id = this.iteration.i++;
  }

  // TODO: Save and rerender saved tree

  renderExisting(vcr: ViewContainerRef, tplr: TemplateRef<any>, childs: Card[]) {
    //   Render existing Card childs. Depends on childs array;
    childs.forEach(c => this.createChild(vcr, tplr, childs));
  }

  createChild(vcr: ViewContainerRef, tplr: TemplateRef<any>, childs: Card[], anchorElement?: ElementRef) {
    this.userClicked.next(this);
  }
}
