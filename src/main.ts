import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { EpisodesPageComponent } from './components/episodes-page/episodes-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ShowsApiService } from './services/shows-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <app-episodes-page></app-episodes-page>
  `,
  imports: [CommonModule, EpisodesPageComponent, HttpClientModule],
  providers: [ShowsApiService],
})
export class App {}

bootstrapApplication(App);
