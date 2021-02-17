import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GetCardsApiResponse} from './get-cards-api.response';

@Injectable()
export class CardsDataService {
  getCards(name: string, page: number, pageSize: number): Observable<GetCardsApiResponse> {

    // Use params to handle encoding query string values
    const params = new HttpParams({
      fromObject: {
        name,
        page: page.toString(),
        pageSize: pageSize.toString(),
        'X-Requested-With': 'XMLHttpRequest',
      }
    });

    return this.httpClient.get<GetCardsApiResponse>('https://api.elderscrollslegends.io/v1/cards', {
      params
    });
  }

  constructor(private httpClient: HttpClient) {
  }
}

