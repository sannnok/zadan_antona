import { Component, OnInit, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss']
})
export class OrganComponent implements OnInit {

  deti: OrganComponent[] = [1, 2] as any[];

  @Output() vpihivanie = new EventEmitter<OrganComponent>();

  constructor(private vf: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  public vpihivaem() {
    this.vpihivanie.emit(this);

    // Sozdayom rebenka
    // const rojdennyi = this.organServis.sozdanie();
    // this.deti.push(rojdennyi);

    let resolver = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    let componentFactory =   this.vf.createComponent(resolver);
  }

}
