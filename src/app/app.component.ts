import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Projettp1';
  Albums: Album[] = [];
  Nomartiste?: string = "";
  
 

  constructor(public httpClient: HttpClient) {}

  async searchlisteArtiste(): Promise<void> {
    let x = await lastValueFrom(this.httpClient.get<any>("https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.Nomartiste + "&api_key=8f630f1f91e115680f041428891d246b&format=json"));
    console.log(x);
    this.Albums = [];
    for (let i = 0; i < x.topalbums.album.length; i++) {
      let objAlbum = x.topalbums.album[i];
      let album = new Album(objAlbum.artist.name, objAlbum.name, objAlbum.image[2]["#text"]);
      this.Albums.push(album);
    }
    console.log(this.Albums); 
  }


}

class Album {
  constructor(public artist: string, public name: string, public image: string) {}
}

