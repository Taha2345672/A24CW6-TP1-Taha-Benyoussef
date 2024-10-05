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
    
  Chansons: chanson[] = [];
  Nomchanson?: string = "";
  
 

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

  async searchlisteChanson(): Promise<void> {
    let y = await lastValueFrom(this.httpClient.get<any>("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=8f630f1f91e115680f041428891d246b&artist=" + this.Nomartiste + "&album=" + this.Nomchanson + "&format=json"));
    console.log(y);
    this.Chansons = [];
    for (let i = 0; i < y.album.tracks.track.length; i++) {
      let objChanson = y.album.tracks.track[i];
      let song = new chanson(objChanson.name); 
      this.Chansons.push(song);
    }
    console.log(this.Chansons); 
  }
}



class Album {
  constructor(public artist: string, public name: string, public image: string) {}
}


class chanson {
  constructor(public ChansonName: string) {}
}

