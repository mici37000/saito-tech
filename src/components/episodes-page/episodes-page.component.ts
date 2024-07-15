import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ShowsApiService } from "../../services/shows-api.service";
import { CommonModule } from "@angular/common";
import { EpisodesTableComponent } from "../episodes-table/episodes-table.component";
import { Observable, filter, map, of, tap } from "rxjs";
import { Episode } from "../../models/episode.model";

@Component({
  selector: "app-episodes-page",
  templateUrl: "./episodes-page.component.html",
  styleUrls: ["./episodes-page.component.css"],
  standalone: true,
  imports: [CommonModule, EpisodesTableComponent],
})
export class EpisodesPageComponent implements OnInit {
  private readonly MIN_GRADE: number = 8;
  private activeShow: number = 1;
  @ViewChild("ratingCheckRef") private ratingCheckRef!: ElementRef;

  public showIds = Array.from({ length: 1000 }, (_, i) => i + 1);
  public episodes$: Observable<any> = of(null);
  public episode$: Observable<any> = of(null);
  public isOldEpisode: boolean = false;

  constructor(private showsApiService: ShowsApiService) {}

  ngOnInit() {
    this.episodes$ = this.showsApiService.getEpisodes(this.activeShow);

    this.showsApiService.activeEpisode$.subscribe((episodeId: number) => {
      if (episodeId) {
        this.episode$ = this.showsApiService.getEpisode(episodeId).pipe(
          tap((episode: Episode) => {
            this.isOldEpisode = this.isYearBefore(episode.airstamp, 2000);
          })
        );
      }
    });
  }

  public showSelectChange(selectElement: HTMLSelectElement): void {
    const selectedValue: number = Number(selectElement.value);
    this.activeShow = selectedValue;
    this.ratingCheckRef.nativeElement.checked = false;
    this.episodes$ = this.showsApiService.getEpisodes(selectedValue);
  }

  public showRatingFilterChange(event: any): void {
    if (event.target.checked) {
      this.episodes$ = this.episodes$.pipe(
        map((episodes) => {
          return episodes.filter(
            (episode: Episode) => episode.rating.average >= this.MIN_GRADE
          );
        })
      );
    } else {
      this.episodes$ = this.showsApiService.getEpisodes(this.activeShow);
    }
  }

  public isYearBefore(dateStr: string, year: number): boolean {
    const d = new Date(dateStr);
    return d.getFullYear() < year;
  }
}
