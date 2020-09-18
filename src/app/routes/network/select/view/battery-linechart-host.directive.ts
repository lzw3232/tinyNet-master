import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[battery-linechart-host-directive]',
})

export class BatteryLinehartHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
