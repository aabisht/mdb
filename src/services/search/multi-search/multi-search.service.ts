import { Constants } from './../../../app/app.constants';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ISearchResults } from '../../../interface/search-interface';
import 'rxjs/Rx';

@Injectable()

export class MultiSearchService {
  private _multiSearchServiceUrl: string;

  constructor(private _http: Http) { }

  getSearchResult(keyword: string): Observable<ISearchResults> {
    this._multiSearchServiceUrl = Constants.API_URL + 'search/multi?api_key='+ Constants.API_Key_v3 +'&language='+ Constants.Default_Language +'&query='+ keyword +'&page=1&include_adult=false'

    return this._http
            .get(this._multiSearchServiceUrl)
            .map((response: Response) => {
            return <ISearchResults>response.json();
            })
            .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
