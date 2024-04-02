import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const fastFadeInOutAnimation = trigger('fastFadeInOutAnimation', [
  transition(':enter', [
    animate('200ms', keyframes([
      style({ opacity: 0 }),
      style({ opacity: 1 }),
    ]))
  ])
]);

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  transition(':enter', [
    animate('400ms cubic-bezier(.53,.02,1,.73)', keyframes([
      style({ opacity: 0 }),
      style({ opacity: 1 }),
    ]))
  ])
]);

export const zoomIn = trigger('zoomIn', [
  transition(':enter', [
    style({ transform: 'scale(0.5)' }),
    animate('{{time}} cubic-bezier(0,.87,.61,.98)', style({ transform: 'scale(1)' })),
  ], { params: { time: '400ms' } }),
]);
