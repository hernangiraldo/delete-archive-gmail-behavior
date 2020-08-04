import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Renderer2, Output, EventEmitter } from '@angular/core';
import { IonItem, Gesture, GestureController, GestureConfig } from '@ionic/angular';

declare const ResizeObserver: any;

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements AfterViewInit, OnDestroy {

  @ViewChild(IonItem, { read: ElementRef, static: true }) innerItem: ElementRef;
  @ViewChild('archive', { read: ElementRef, static: true }) archive: ElementRef;
  @ViewChild('delete', { read: ElementRef, static: true }) delete: ElementRef;
  @Output("deleted") deleted: EventEmitter<any> = new EventEmitter();
  @Output("archived") archived: EventEmitter<any> = new EventEmitter();

  private currentAction: "keep" | "archive" | "delete" = "keep";
  private gesture: Gesture = null;
  private resizeObserver: any;

  constructor(
    private hostElement: ElementRef,
    private gestureCtrl: GestureController,
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver(() => {
      this.init();
    });

    this.resizeObserver.observe(this.hostElement.nativeElement);
  }

  ngOnDestroy() {
    if (this.gesture) {
      this.gesture.destroy();
      this.gesture = null;
    }
  }

  private init() {
    if (this.gesture) {
      this.gesture.destroy();
    }

    const windowWidth = window.innerWidth;

    const options: GestureConfig = {
      el: this.hostElement.nativeElement,
      gestureName: 'swipe-archive-delete',
      onWillStart: async () => {
        this.renderer.setStyle(this.innerItem.nativeElement, "will-change", "transform");
      },
      onStart: () => {
        this.renderer.setStyle(this.innerItem.nativeElement, "transition", "");
        this.renderer.setStyle(this.innerItem.nativeElement, "border-radius", "8px");
      },
      onMove: (ev) => {
        if (ev.deltaX < 0) {
          this.currentAction = "delete";
          this.renderer.setStyle(this.delete.nativeElement, 'opacity', 1);
          this.renderer.setStyle(this.archive.nativeElement, 'opacity', 0);
        } else {
          this.currentAction = "archive";
          this.renderer.setStyle(this.delete.nativeElement, 'opacity', 0);
          this.renderer.setStyle(this.archive.nativeElement, 'opacity', 1);
        }


        this.renderer.setStyle(
          this.innerItem.nativeElement,
          "transform",
          `translateX(${ev.deltaX}px)`
        );

        if (this.isWithinArchiveRange(ev)) {
          this.currentAction = "archive";
        } else if (this.isWithinDeleteRange(ev)) {
          this.currentAction = "delete";
        } else {
          this.currentAction = "keep";
        }
      },
      onEnd: () => {
        this.renderer.setStyle(this.innerItem.nativeElement, "transition", "0.2s ease-out");
        this.renderer.setStyle(this.innerItem.nativeElement, "border-radius", "0");

        if (this.currentAction === "archive" || this.currentAction === "delete") {
          this.resizeObserver.disconnect();
          this.renderer.setStyle(
            this.innerItem.nativeElement,
            "transform",
            `translateX(${this.currentAction === "archive" ? windowWidth : -windowWidth}px)`
          );

          if(this.currentAction === "archive" ) {
            this.archived.emit(this.hostElement)
          } else {
            this.deleted.emit(this.hostElement);
          }

        } else {
          this.renderer.setStyle(this.innerItem.nativeElement, "transform", "");
        }
      }
    };

    this.gesture = this.gestureCtrl.create(options);
    this.gesture.enable();
  }

  isWithinArchiveRange(ev) {
    return ev.deltaX > 100 && ev.deltaX < 200;
  }

  isWithinDeleteRange(ev) {
    return ev.deltaX < -100 && ev.deltaX > -200;
  }

}
