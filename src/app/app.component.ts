import { Component } from '@angular/core';
import { OpenaiService } from './openai.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  searchText = '';
  results!: { title: string, description: string, image: string }[];

  constructor(private openaiService: OpenaiService) { }

  async getResults() {
    const prompt = `Get three results from: ${this.searchText}. Use the following JSON Format: [{title: string, description: string }]`;
    const gptResults: { title: string, description: string }[] = JSON.parse(await firstValueFrom(this.openaiService.getGTPResponse(prompt)));

    this.results = gptResults.map(x => {
      return {
        title: x.title,
        description: x.description,
        image: 'https://freesvg.org/img/1544764567.png'
      }
    });

    this.results.forEach(x => this.openaiService.getDalleResponse(x.title).subscribe(a => x.image = a));
  }
}
