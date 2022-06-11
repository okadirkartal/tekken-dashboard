import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class WebService {
  constructor(private _http: HttpClient) {}

  public getIP(): Observable<string> {
    return this._http
      .get(environment.IPUrl)
      .pipe(map((extractIP) => this.extractIP(extractIP)))
      .pipe(catchError((error) => this.handleError(error)));
  }

  public getMD5(value: string): Observable<string> {
    return this._http
      .get(`${environment.MD5Url}${encodeURI(value)}`)
      .pipe(map((response) => this.extractMD5(response)));
  }

  private extractIP(res: any): string {
    return res.ip || {};
  }

  private extractMD5(res: any): string {
    console.log(res);
    return res.md5 || {};
  }

  private handleError(error: HttpErrorResponse | any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.errorMessage;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
