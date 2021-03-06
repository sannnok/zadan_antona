import { TemplateRef, EventEmitter, EmbeddedViewRef } from '@angular/core';

export class Card {
  // Amount of childs to create
  public kolvo = 2;
  public id: number;

  public userActions = {
    onUserClickedCreateChild: new EventEmitter<Card>(),
    onUserClickedRemove: new EventEmitter<Card>(),
  };

  public view: EmbeddedViewRef<Card>;

  public isMainTemplateUsed = true;
  public isCardViewUsed = true;

  constructor(
    public iteration: { i: number },
    public parent?: Card,
    public title?: string,
    public childs?: any[] | Card[],
  ) {
    this.id = this.iteration.i++;
  }

  createChild(tmplRefName: 'main' | 'other') {
    this.isMainTemplateUsed = tmplRefName === 'main';

    this.userActions.onUserClickedCreateChild.next(this);
  }

  remove() {
    this.userActions.onUserClickedRemove.next(this);
  }
}
