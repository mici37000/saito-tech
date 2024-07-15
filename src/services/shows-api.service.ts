import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of, tap } from "rxjs";
import { Episode } from "../models/episode.model";

@Injectable()
export class ShowsApiService {
  constructor(private http: HttpClient) {}

  private url: string = "https://api.tvmaze.com";
  private activeEpisodeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private showsCache = new Map();
  private episodesCache = new Map();
  public readonly activeEpisode$: Observable<number> = this.activeEpisodeSubject.asObservable();

  public broadcastActiveEpisode(episodeId: number): void {
    this.activeEpisodeSubject.next(episodeId);
  }

  public getActiveEpisode(): number {
    return this.activeEpisodeSubject.getValue();
  }

  public getEpisodes(showId: number): Observable<Episode[]> {
    if (this.showsCache.has(showId)) {
      return of(this.showsCache.get(showId));
    } else {
      return this.http.get(`${this.url}/shows/${showId}/episodes`).pipe(
        tap((show: any) => {
          this.showsCache.set(showId, show);
        })
      );
    }
  }

  public getEpisode(episodeId: number): Observable<Episode> {
    if (this.episodesCache.has(episodeId)) {
      return of(this.episodesCache.get(episodeId));
    } else {
      return this.http.get(`${this.url}/episodes/${episodeId}`).pipe(
        tap((episode: any) => {
          this.episodesCache.set(episodeId, episode);
        })
      );
    }
  }
}
