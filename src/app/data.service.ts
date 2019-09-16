import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs/index';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  baseURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=044bdbbf699e80d300bfe77aa4c73879&tags=people%2C+profile&format=json&nojsoncallback=1'

  unsplashURL = "https://api.unsplash.com";


  getRandomImages(){
      const headers = new HttpHeaders({
              "Accept-Version": "v1",
              "Authorization": "Client-ID 9a377f586d1113235fa91639eea30a899ca6ca43e90153b0395db66102cfa352"
      });

    const params = new HttpParams()
            .set('count', '10')
            .set('w', '100')
            .set('h', '100')
            .set('query', 'person');

      return this.http.get(this.unsplashURL + '/photos/random', { headers: headers, params: params })
  }

  imageSearchByTag() {
    return this.http.get(this.baseURL)
      // .pipe(
      //   map(response => {
      //     return response; // kind of useless
      //   }),
      //   catchError(err => {
      //     return throwError(err);
      //   })
      // ); // end of pipe
  }

}
