import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class BaseProviderService {
  public headers = new HttpHeaders();
  public httpOptions = { headers: this.headers };
  public http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http as HttpClient;
    this.httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getHttpHeaders(): HttpHeaders {
    return this.httpOptions.headers;
  }

  /*
  Function for GET call
  */
  makeGetCall(resourceURL: string, params?: URLSearchParams): Observable<{} | HttpResponse<any>> {
    return this.http.get(resourceURL, { headers: this.getHttpHeaders(), observe: 'body' }).pipe(retry(0), map(response => response), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<Error> {
    if (error.status === 500 || error.status === 503) {
      return Observable.throw(error.error as HttpEvent<any>);
    } else {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
        return Observable.throw(error.error);
      } else {
        throw (error.error);
      }
    }
  }

}
