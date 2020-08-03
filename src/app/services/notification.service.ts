import { Injectable } from '@angular/core';
// import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // private readonly notifier: NotifierService;

  constructor(
    // notifierService: NotifierService,
  ) {
    // this.notifier = notifierService;
  }

  success(text?: string) {
    // this.notifier.notify('success', text);
  }

  error(text?: string) {
    // this.notifier.notify('error', text);
  }
}
