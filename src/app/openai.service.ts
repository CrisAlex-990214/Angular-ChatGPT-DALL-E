import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  openaiKey = '';

  constructor(private http: HttpClient) { }

  getGTPResponse(prompt: string) {
    return this.http.post<{ choices: { message: { content: string } }[] }>('https://api.openai.com/v1/chat/completions',
      {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": prompt }],
        "max_tokens": 256
      },
      {
        headers: {
          contentType: 'application/json',
          Authorization: `Bearer ${this.openaiKey}`
        }
      }).pipe(map(x => x.choices[0].message.content))
  }

  getDalleResponse(title: string) {
    return this.http.post<{ data: { url: string }[] }>('https://api.openai.com/v1/images/generations',
      {
        "prompt": title,
        "n": 1,
        "size": "512x512"
      },
      {
        headers: {
          contentType: 'application/json',
          Authorization: `Bearer ${this.openaiKey}`
        }
      }).pipe(map(x => x.data[0].url))
  }
}
