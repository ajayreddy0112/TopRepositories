import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseProviderService } from './baseProvider.service';

@Injectable({
  providedIn: 'root'
})

export class GithubService extends BaseProviderService {
  constructor(public http: HttpClient) {
    super(http);
  }
  getRepoDetails(query: string, pageNumber: number) {
      let url = `https://api.github.com/search/repositories?sort=forks&order=desc&per_page=20&page=${pageNumber}&q=created:>1970+language:JavaScript`
      if(query) {
          url = url + query
      }
    // return this.makeGetCall('/api/progress');
    return this.makeGetCall(url);
  }
}
