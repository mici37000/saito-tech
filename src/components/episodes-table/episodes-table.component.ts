import { CommonModule } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { ShowsApiService } from "../../services/shows-api.service";
import { Episode } from "../../models/episode.model";

@Component({
  selector: "app-episodes-table",
  templateUrl: "./episodes-table.component.html",
  styleUrls: ["./episodes-table.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class EpisodesTableComponent {
  constructor(public showsApiService: ShowsApiService) {}

  @Input() public episodes: Episode[] | null = [];

  public episodeClick(episodeId: number): void {
    if (this.showsApiService.getActiveEpisode() !== episodeId) {
      this.showsApiService.broadcastActiveEpisode(episodeId);
    }
  }
}
