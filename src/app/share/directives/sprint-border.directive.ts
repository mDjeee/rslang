import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appSprintBorder]'
})
export class SprintBorderDirective {
@Input('appSprintBorder') public flag!: boolean
  constructor(private el: ElementRef) {}
  ngOnChanges() {
    if (this.flag) {
      this.el.nativeElement.style.borderColor = 'green'
    } else {
      this.el.nativeElement.style.borderColor = 'red'
    }
  }
}
