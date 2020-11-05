import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  public show(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (confirm('Are you sure?')) {
        resolve();
      } else {
        reject();
      }
    });
  }
}
