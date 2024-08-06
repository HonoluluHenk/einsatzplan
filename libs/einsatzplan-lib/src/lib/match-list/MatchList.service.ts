import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Match} from "@einsatzplan/einsatzplan-lib/model";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class MatchListService {
  readonly #http = inject(HttpClient);

  loadMatchList$(championship: string, teamName: string): Observable<Match[]> {
    // return of(matches as Match[]);
    return this.#http.get<Match[]>(`assets/championship/${fix(championship)}/${fix(teamName)}/matches.json`);
  }
}

function fix(string: string): string {
  return encodeURIComponent(encodeURIComponent(string))
}
