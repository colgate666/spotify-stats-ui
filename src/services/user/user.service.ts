import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  async redirectToSpotifyLogin() {
    const verifier = this._generateCodeVerifier(128);
    const challenge = await this._generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", environment.spotifyClientId);
    params.append("response_type", "code");
    params.append("redirect_uri", `${environment.baseUrl}/login`);
    params.append("scope", "user-read-private user-read-email user-library-read streaming playlist-read-private user-read-recently-played user-top-read user-read-playback-position");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  private _generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async _generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
