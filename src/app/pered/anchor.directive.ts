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
  @Input() userClick: EventEmitter<Card>;

  constructor(public vcr: ViewContainerRef) {}

  ngAfterViewInit() {
    this.userClick.subscribe((c: Card) => {
      this.createChild(c);
    });
  }

  public createChild(context: Card) {
    for (let i = 0; i < context.kolvo; i++) {
      this.vcr.createEmbeddedView(this.templateToRender, {
        $implicit: new Card(
          context.iteration,
          context.id,
          `Child of ${context.title || context.id}`,
          []
        ),
      });
    }
  }
}
