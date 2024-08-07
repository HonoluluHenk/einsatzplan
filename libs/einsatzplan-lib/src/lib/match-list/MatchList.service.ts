import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Match} from "@einsatzplan/einsatzplan-lib/model";
import {HttpClient} from "@angular/common/http";
import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";

@Injectable({providedIn: 'root'})
export class MatchListService {
  readonly #http = inject(HttpClient);

  loadMatchList$(championship: string, teamName: string): Observable<Record<ID<'Match'>, Match>> {
    return this.#http.get<Record<ID<'Match'>, Match>>(`assets/championship/${championship}/${teamName}/matches/matches.json`);
  }
}

