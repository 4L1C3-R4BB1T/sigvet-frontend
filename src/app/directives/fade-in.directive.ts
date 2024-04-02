import { AfterViewInit, Directive, ElementRef, HostBinding, inject, OnDestroy, Renderer2 } from '@angular/core';
import { interval, map, Subscription, throttleTime } from 'rxjs';

@Directive({
  selector: '[fadeIn]',
  standalone: true,
})
export class FadeInDirective implements AfterViewInit, OnDestroy {

  #elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>)
  #renderer2 = inject(Renderer2);

  #subscriptions = [] as Subscription[];

  @HostBinding('style.opacity')
  public opacity = '0';

  public ngAfterViewInit() {

    const subscription = interval(300)
      .pipe(
        throttleTime(100),
        map(() => this.#elementRef.nativeElement.getBoundingClientRect()),
        map(project => ({ canShow: project.top > 0 && project.bottom > 0 })),
      )
      .subscribe(({ canShow }) => {
        if (canShow) {
          this.#renderer2.setStyle(this.#elementRef.nativeElement, 'opacity', '1');
          this.#renderer2.setAttribute(this.#elementRef.nativeElement, 'class', 'fade-in');
        } else {
          this.#renderer2.setStyle(this.#elementRef.nativeElement, 'opacity', '0');
          this.#renderer2.setAttribute(this.#elementRef.nativeElement, 'class', 'fade-out');
        }
      });

    this.#subscriptions.push(subscription);
  }

  public ngOnDestroy() {
    this.#subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
