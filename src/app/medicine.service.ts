import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  public getData(formData: FormData): Observable<any> {
    
    return this.http.post('', formData);

  }
}
