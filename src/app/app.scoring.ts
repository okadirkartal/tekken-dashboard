import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Schedule } from 'src/interfaces/Schedules';
import { MatchService } from 'src/services/matchService';
import { WebService } from 'src/services/webService';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom, // Use Shadow DOM
  templateUrl: '../views/scoring.html', // HTML Template name
  styles: [
    `
      h3 {
        text-align: center;
        color: navy;
        font-size: x- large;
        margin: 0px;
        font-weight: bold;
      }
      select {
        font-size: large;
        margin-left: 25px;
      }
    `,
  ],
  providers: [Title, MatchService, WebService],
})
export class AppScoring {
  private UsingAsync: boolean = false;
  private CurrentGame: number = 0;

  public SeriesName: string;
  public Fighter1: string;
  public Fighter2: string;
  public Fighter1Score: number = 0;
  public Fighter2Score: number = 0;
  public SeasonStart: Date = new Date();
  public CurrentRole: number = 1;
  public IPAddress: string;
  public ErrorMessage: string;
  public MD5Hash: string;
  public MySchedule: Schedule[];

  public constructor(
    private _titleService: Title,
    private _matchService: MatchService,
    private _web: WebService
  ) {
    this._titleService.setTitle('Tekken 2');
    this.SeriesName = 'Tekken 2';
    _web.getIP().subscribe((IP) => (this.IPAddress = IP));

    this.getSchedule();
    if (this.MySchedule.length > 0) {
      this.updateVariables(0); //default to first game in drop-down list
      this.CurrentGame = 1;
    }
  }

  public onScheduleChanged(GameValue: number) {
    if (GameValue >= 0) {
      this.updateVariables(GameValue);
      this.CurrentGame = GameValue;
    }
  }

  //Get the score from the form and update it
  public onRecordScores() {
    this.MySchedule[this.CurrentGame - 1].Fighter2Score = Number(
      this.Fighter2Score
    );
    this.MySchedule[this.CurrentGame - 1].Fighter1Score = Number(
      this.Fighter1Score
    );
  }

  //Update screen variable based on current match
  private updateVariables(GameID: number) {
    var x: number = 0;
    if (GameID > 0) x = GameID - 1;

    this.Fighter1 = this.MySchedule[x].Fighter1;
    this.Fighter2 = this.MySchedule[x].Fighter2;
    this.Fighter1Score = this.MySchedule[x].Fighter1Score;
    this.Fighter2Score = this.MySchedule[x].Fighter2Score;
  }

  private getSchedule() {
    this.UsingAsync
      ? this._matchService
          .getScheduleAsync()
          .then((Schedules: Schedule[]) => (this.MySchedule = Schedules))
      : (this.MySchedule = this._matchService.getSchedule());
  }
}
