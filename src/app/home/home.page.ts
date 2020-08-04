import { Component, OnInit, NgZone, ElementRef, Renderer2 } from '@angular/core';
import { EmailService, Email } from 'src/app/services/email.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public emails: Email[];

  constructor(
    private emailService: EmailService,
    private renderer: Renderer2,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.emails = this.emailService.getEmails();
  }

  public async archiveDeleteItem(event: ElementRef, uid: number) {
    this.renderer.addClass(event.nativeElement, 'remove-item');
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.emails = this.emails.filter(email => email.uid !== uid);
    this.zone.run(() => {});
  }

}
