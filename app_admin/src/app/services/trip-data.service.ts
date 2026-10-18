import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      this.baseUrl + '/trips'
    );
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(
      `${this.baseUrl}/trips/${tripCode}`
    );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      this.baseUrl + '/trips',
      trip,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.baseUrl}/trips/${trip.code}`,
      trip,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  deleteTrip(tripCode: string): Observable<Trip> {
    return this.http.delete<Trip>(
      `${this.baseUrl}/trips/${tripCode}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  login(
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    return this.handleAuthAPICall(
      'login',
      user,
      passwd
    );
  }

  register(
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    return this.handleAuthAPICall(
      'register',
      user,
      passwd
    );
  }

  private handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {

    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(
      `${this.baseUrl}/${endpoint}`,
      formData
    );
  }
}