import { Component, OnInit } from '@angular/core';
import { GithubService } from './../../_services/github.service';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent implements OnInit {

  private repoData: any;
  private queryString: string = '';
  private loader: boolean = true;
  private pageCount: number = 1;
  private maxPage: number;
  private forwardButton: boolean = true;
  private backwardButton: boolean = false;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.getRepoDetails();
  }

  getRepoDetails() {
    this.loader = true
    this.githubService.getRepoDetails(this.queryString, this.pageCount).subscribe((response) => {
      this.repoData = response;
      this.loader = false
      this.maxPage = Math.ceil(this.repoData.total_count/20)
      console.log(this.repoData)

      //forward backward page
      if(this.pageCount >= 50 || this.maxPage <= this.pageCount) {
        this.forwardButton = false
      } else {
        this.forwardButton = true
      }
      if(this.pageCount == 1) {
        this.backwardButton = false
      } else {
        this.backwardButton = true
    }

    }, error => {
      console.log('error', error)
    });

  }

  navigateToRepo(url: string) {
    try {
      console.log(url);
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  }

  onSearch(searchValue: string) {
    this.pageCount = 1
    if (searchValue) {
      this.queryString = `+${searchValue} in:name`
    } else {
      this.queryString = ''
    }
    this.getRepoDetails()
  }

  pageForward() {
    this.pageCount += 1
    this.getRepoDetails()
  }

  pageBackward() {
    this.pageCount -= 1
    this.getRepoDetails()
  }
}
