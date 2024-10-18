import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

interface Item {
  _id?: String;
  name: String;
  description: String;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:4000/item';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}s`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }
  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }
  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
