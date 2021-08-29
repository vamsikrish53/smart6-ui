import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iplplayer } from '../model/iplplayer';
import { Observable  } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class IplserviceService {

  constructor(private http : HttpClient, private iplPLayer : Iplplayer) { }

  baseUrl : string = "/ipl/";

  getPLayersByTeam (iplteam1 : string, iplteam2 : string) : Observable<Iplplayer[]> {
    let getIplPLayerUrl = this.baseUrl + iplteam1 +'vs' + iplteam2 + '/' + "players"
    return this.http.get<Iplplayer[]>(getIplPLayerUrl);
  }

  getIplSchedule() : Observable<Array<any>> {
    return this.http.get<[Array<any>]>(this.baseUrl+"schedule");
  }
}
