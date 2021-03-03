import { Component, OnInit, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ViewChild, AfterViewInit, AfterContentChecked, ComponentRef, ElementRef, ViewRef } from '@angular/core';
import { TzentrPoliotovAntonaService } from '../tzentr-poliotov-antona.service';

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss']
})
export class OrganComponent implements OnInit, AfterViewInit {

  deti: {
    mestoRojdeniyaChild: ViewContainerRef,
    rojdennyi: ComponentRef<OrganComponent>
  }[] = [];
  componentFactory: ComponentFactory<OrganComponent>;
  kolvo = 2;
  imeaOrgana = '';
  hasParent: boolean;
  isFirst: boolean;
  isLast: boolean;
  isMiddle: boolean;

  // @Output() childViewContainerRef = new EventEmitter<{f: ComponentFactory<OrganComponent>, vr: ViewContainerRef}>();
  @ViewChild('rojaem_v_priamom_efire', { read: ViewContainerRef }) mestoRojdeniya: ViewContainerRef;
  @ViewChild('input') input: ElementRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private tsup: TzentrPoliotovAntonaService,
    public viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef

  ) { }

  ngOnInit(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(OrganComponent);
  }

  ngAfterViewInit() {
    this.mestoRojdeniya.clear();
    // if (this.deti.length) {
    //   // this.tsup.save(this.mestoRojdeniya);
    //   // this.vpihivaem('init');
    //   for(let i=0; i<this.deti.length; i++) {
    //     // Sozdayom rebenka
    //     let rojdennyi: ComponentRef<OrganComponent> = this.mestoRojdeniya.createComponent(this.componentFactory);
    //   }  
    // }
  }

  public vpihivaem(from?: string) {
    if (from === 'input') {
      this.input.nativeElement.blur();
    }

    // Refresh pri povtornom triggere
    // this.mestoRojdeniya.clear();
    this.deti = [];

    for(let i=0; i<(this.kolvo || 1); i++) {
      // Sozdayom rebenka
      let rojdennyi: ComponentRef<OrganComponent> = this.mestoRojdeniya.createComponent(this.componentFactory);
      // Sohraniaem Ref Componenta
      this.deti.push({mestoRojdeniyaChild: this.mestoRojdeniya, rojdennyi});
      // if (i === (this.kolvo || 1) - 1) {
      //   // Ubiraem s View dlea testa
        this.mestoRojdeniya.detach();
      // }
    }

    // Vosstanavlivaem View
    // this.tsup.restore(this.deti);
    this.deti.forEach((rebionok, i) => {
      this.mestoRojdeniya.insert(rebionok.rojdennyi.hostView);
      rebionok.rojdennyi.instance.hasParent = true;
      rebionok.rojdennyi.instance.isFirst = i === 0;
      rebionok.rojdennyi.instance.isLast = i === this.deti.length - 1;
      rebionok.rojdennyi.instance.isMiddle = i === this.deti.length - 1;
    })
  }

}
