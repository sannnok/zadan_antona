import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { Card } from './card';

@Directive({
  selector: '[renderAnchor]',
})
export class RenderAnchorDirective implements AfterViewInit {
  private el: HTMLElement;

  @Input() templateToRender: TemplateRef<any>;
  @Input() userActions: {
    onUserClickedCreateChild: EventEmitter<Card>;
    onUserClickedRemove: EventEmitter<Card>;
  } ;

  constructor(public vcr: ViewContainerRef) {}

  ngAfterViewInit() {
    this.userActions.onUserClickedCreateChild.subscribe((c: Card) => {
      this.createChild(c);
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
      const view = this.vcr.createEmbeddedView(this.templateToRender, {
        $implicit: newChild
      });

      newChild.view = view;

      context.childs.push(newChild);
    }
  }

  remove(card: Card) {
    if (card.parent) {
      const cardIndex = card.parent.childs.findIndex((c: Card) => c.id === card.id);
      if (cardIndex + 1) {
        card.parent.childs.splice(cardIndex, 1);
        card.view.destroy();
      }
    }
  }
}
