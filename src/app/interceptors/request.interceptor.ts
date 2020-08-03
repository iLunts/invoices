import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

//
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(public _toast: ToastController) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      // headers: req.headers.set('Session', '123456789'),
    });

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          // if (event instanceof HttpResponse) console.log('Server response');
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.errorToast(err.message);
            // if (err.status == 401) console.log('Unauthorized');
          }
        }
      )
    );
  }

  async errorToast(message?: string) {
    const toast = await this._toast.create({
      header: 'Error',
      message: message,
      position: 'bottom',
      duration: 3000,
    });
    toast.present();
  }
}
