import { Component, OnInit, ComponentFactory, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'dynamic',
  templateUrl: './organ2.component.html',
  styleUrls: ['./organ2.component.scss'],
})
export class Organ2Component implements OnInit {

  kolvo = 2;
  imeaOrgana = '';
  componentFactory: ComponentFactory<Organ2Component>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,) { }

  ngOnInit(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(Organ2Component);
  }

  vpihivaem() {

  }

}
