import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  EventEmitter,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';
import { Card } from './card';

@Directive({
  selector: '[renderAnchor]',
})
export class RenderAnchorDirective implements AfterViewInit {
  private templatesToRender: TemplateRef<any>[];
  private cond: boolean;

  @Input() userActions: {
    onUserClickedCreateChild: EventEmitter<any>;
    onUserClickedRemove: EventEmitter<Card>;
  };

  @Input('templatesToRender') set templateToRenderF(tmpls: TemplateRef<any>[]) {
    this.templatesToRender = tmpls;
  }

  constructor(public vcr: ViewContainerRef) {}

  ngAfterViewInit() {
    this.userActions.onUserClickedCreateChild.subscribe(( card: Card ) => {
      this.createChild(card);
    });
    this.userActions.onUserClickedRemove.subscribe((c: Card) => {
      this.remove(c);
    });
  }

  public createChild(context: Card) {
    for (let i = 0; i < context.kolvo; i++) {
      const newChild = new Card(
        context.iteration,
        context,
        `Child of ${context.title || context.id}`,
        []
      );
      const view = this.vcr.createEmbeddedView(this.templatesToRender[context.isMainTemplateUsed ? 0 : 1], {
        $implicit: newChild,
      });
      newChild.view = view;
      context.childs.push(newChild);
    }
  }

  remove(card: Card) {
    if (card.parent) {
      const cardIndex = card.parent.childs.findIndex(
        (c: Card) => c.id === card.id
      );
      if (cardIndex + 1) {
        card.parent.childs.splice(cardIndex, 1);
        card.view.destroy();
      }
    }
  }
}
