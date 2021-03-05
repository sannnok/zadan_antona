import { Injectable, ViewContainerRef, ComponentRef } from '@angular/core';
import { OrganComponent } from './organ/organ.component';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TzentrPoliotovAntonaService {
  private deti: {
    mestoRojdeniyaChild: ViewContainerRef,
    rojdennyi: ComponentRef<OrganComponent>
  }[] = [];
  private mestoRojdeniya: ViewContainerRef;
  private glavnyiOrgan: OrganComponent;

  public save(glavnyiOrgan: OrganComponent) {
    this.mestoRojdeniya = glavnyiOrgan.vcr;
    this.deti = glavnyiOrgan.deti;
    this.glavnyiOrgan = glavnyiOrgan;
  }

  public restore(deti?: ComponentRef<OrganComponent>[]) {
    // this.mainOrgan.mestoRojdeniya.insert((this.mainOrgan as any)._hostView);
    // Vosstanavlivaem View
    // this.deti.forEach((rebionok, i) => {
    //   this.detach();
    // })
    // this.glavnyiOrgan.triggerRedraw();
    // this.glavnyiOrgan.deti.forEach(reb => reb.rojdennyi.instance.vpihivaem());
    // this.deti.forEach((rebionok, i) => {
    //   // Detach all current view containers
    //   rebionok.rojdennyi.instance.vpihivaem();

    //   // Attach only we saved 
    //   // rebionok.mestoRojdeniyaChild.insert(rebionok.rojdennyi.hostView);
    //   // rebionok.rojdennyi.instance.hasParent = true;
    //   // rebionok.rojdennyi.instance.isFirst = i === 0;
    //   // rebionok.rojdennyi.instance.isLast = i === this.deti.length - 1;
    //   // rebionok.rojdennyi.instance.isMiddle = i === this.deti.length - 1; 
    // })
    // for(let i=0; i<this.deti.length; i++) {
    //   // Sozdayom rebenka
    //   let rojdennyi: ComponentRef<OrganComponent> = this.mestoRojdeniya.createComponent(this.glavnyiOrgan.componentFactory);
    //   rojdennyi.instance.input = this.deti[i].rojdennyi.instance.input;
    //   rojdennyi.instance.isFirst = this.deti[i].rojdennyi.instance.isFirst;
    //   rojdennyi.instance.isLast = this.deti[i].rojdennyi.instance.isLast;
    //   rojdennyi.instance.isMiddle = this.deti[i].rojdennyi.instance.isMiddle;
    //   rojdennyi.instance.kolvo = this.deti[i].rojdennyi.instance.kolvo;
    //   rojdennyi.instance.hasParent = this.deti[i].rojdennyi.instance.hasParent;
    //   rojdennyi.instance.imeaOrgana = this.deti[i].rojdennyi.instance.imeaOrgana;
    //   rojdennyi.instance.deti = this.deti[i].rojdennyi.instance.deti;
    // }
    let temp = [...this.deti];
    let maped = this.deti.map(d => d.rojdennyi.instance.imeaOrgana)
    this.recursiveStep(temp, this.glavnyiOrgan.componentFactory, this.mestoRojdeniya);
  }

  private recursiveStep(deti, componentFactory, mestoRojdeniya) {
    for(let i=0; i<deti.length; i++) {
      // Sozdayom rebenka
      let rojdennyi: ComponentRef<OrganComponent> = mestoRojdeniya.createComponent(componentFactory);
      rojdennyi.instance.input = this.deti[i].rojdennyi.instance.input;
      rojdennyi.instance.isFirst = this.deti[i].rojdennyi.instance.isFirst;
      rojdennyi.instance.isLast = this.deti[i].rojdennyi.instance.isLast;
      rojdennyi.instance.isMiddle = this.deti[i].rojdennyi.instance.isMiddle;
      rojdennyi.instance.kolvo = this.deti[i].rojdennyi.instance.kolvo;
      rojdennyi.instance.hasParent = this.deti[i].rojdennyi.instance.hasParent;
      rojdennyi.instance.imeaOrgana = this.deti[i].rojdennyi.instance.imeaOrgana;
      rojdennyi.instance.deti = [...this.deti[i].rojdennyi.instance.deti];

      let temp = [...rojdennyi.instance.deti];

      timer(500).subscribe(() => {
        this.recursiveStep(temp, rojdennyi.instance.componentFactory, rojdennyi.instance.vcr);
      });
    }  
  }

  public detach() {
    this.mestoRojdeniya.clear();
  }
}
