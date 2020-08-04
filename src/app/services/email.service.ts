import { Injectable } from '@angular/core';

export interface Email {
  uid: number;
  subject: string;
  message: string;
  sender: string;
  read: boolean;
  archived: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emails: Email[];

  constructor() {
    this.emails = [
      {
        uid: 1,
        subject: "Outlet - Final Hours",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Clothing Brand",
        read: false,
        archived: false,
      },
      {
        uid: 2,
        subject: "Epic Streamer is live: REMOTE STARING COMPETITION",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Twitch",
        read: true,
        archived: false,
      },
      {
        uid: 3,
        subject: "Want a shoutout for your brand?",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Promo Tools",
        read: false,
        archived: false,
      },
      {
        uid: 4,
        subject: "Package discount for accounting tools",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Special Deals",
        read: false,
        archived: false,
      },
      {
        uid: 5,
        subject: "Interview with best selling author",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Book People",
        read: true,
        archived: false,
      },
      {
        uid: 6,
        subject: "Hungry?",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Evan",
        read: true,
        archived: false,
      },
      {
        uid: 7,
        subject: "Our content would be great for your site",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Link Builder",
        read: true,
        archived: false,
      },
      {
        uid: 8,
        subject: "20% Off Digital Pianos",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Music Store",
        read: false,
        archived: false,
      },
      {
        uid: 9,
        subject: "Clearance on Canvas Prints - 50% OFF",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Art Store",
        read: true,
        archived: false,
      },
      {
        uid: 10,
        subject: "Free Grinder with Purchases over $200",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Coffee Company",
        read: false,
        archived: false,
      },
      {
        uid: 11,
        subject: "Outlet - Final Hours",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Clothing Brand",
        read: false,
        archived: false,
      },
      {
        uid: 12,
        subject: "Epic Streamer is live: REMOTE STARING COMPETITION",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Twitch",
        read: false,
        archived: false,
      },
      {
        uid: 13,
        subject: "Want a shoutout for your brand?",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Promo Tools",
        read: true,
        archived: false,
      },
      {
        uid: 14,
        subject: "Package discount for accounting tools",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Special Deals",
        read: true,
        archived: false,
      },
      {
        uid: 15,
        subject: "Interview with best selling author",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Book People",
        read: true,
        archived: false,
      },
      {
        uid: 16,
        subject: "Hungry?",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Evan",
        read: true,
        archived: false,
      },
      {
        uid: 17,
        subject: "Our content would be great for your site",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Link Builder",
        read: false,
        archived: false,
      },
      {
        uid: 18,
        subject: "20% Off Digital Pianos",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Music Store",
        read: false,
        archived: false,
      },
      {
        uid: 19,
        subject: "Clearance on Canvas Prints - 50% OFF",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Art Store",
        read: false,
        archived: false,
      },
      {
        uid: 20,
        subject: "Free Grinder with Purchases over $200",
        message: "Lorum ipsum dolor or sit amet",
        sender: "Coffee Company",
        read: false,
        archived: false,
      },
    ];
  }

  public getEmails(): Email[] {
    return [...this.emails].filter((email) => {
      return !email.archived;
    });
  }
}
