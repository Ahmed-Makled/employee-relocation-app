// generic-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    // if (error.error instanceof ErrorEvent) {
    //   console.error('An error occurred:', error.error.message);
    // } else {
    //   console.error(`Backend returned code ${error.status}, body was: `, error.error);
    // }
    return throwError('Something bad happened; please try again later.');
  }

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(endpoint).pipe(catchError(this.handleError));
  }

  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${endpoint}/${id}`).pipe(catchError(this.handleError));
  }

  create<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(endpoint, data).pipe(catchError(this.handleError));
  }

  update<T>(endpoint: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${endpoint}/${id}`, data).pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${endpoint}/${id}`).pipe(catchError(this.handleError));
  }
}
