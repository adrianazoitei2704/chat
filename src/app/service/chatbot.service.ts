import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:8080/chatbot/response';
  constructor(private http: HttpClient) { }

  getResponse(message: string): Observable<string> {
    const params = new HttpParams().set('message', message);
    return this.http.get(this.apiUrl, { params, responseType: 'text' });
  }
}
