import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Serie } from 'src/interfaces/Series';
import { MatchService } from 'src/services/matchService';
import { Ranking } from 'src/interfaces/Rankings';
import { Schedule } from 'src/interfaces/Schedules';

@Component({
  encapsulation: ViewEncapsulation.Emulated, //Use Shadow DOM
  templateUrl: '../views/standings.html',
})
export class AppStandings {
  public UsingAsync: boolean = false;
  public MySeries: Serie[];
  public SeriesName: string;
  public MySchedule: Schedule[];
  public Standings: Ranking[];

  public constructor(
    private _titleService: Title,
    private _matchService: MatchService
  ) {
    this._titleService.setTitle('Tekken Tournament');
    this.getSeries();
    this.SeriesName = 'Tekken 3';
    this.getSchedule();
    this.ComputeRankings();
  }

  getSeries() {
    this.UsingAsync
      ? this._matchService
          .getAllSeriesAsync()
          .then((Series: Serie[]) => (this.MySeries = Series))
      : (this.MySeries = this._matchService.getAllSeries());
  }

  private getSchedule() {
    this.UsingAsync
      ? this._matchService
          .getScheduleAsync()
          .then((Schedules: Schedule[]) => (this.MySchedule = Schedules))
      : (this.MySchedule = this._matchService.getSchedule());
  }

  public ComputeRankings() {
    var curDate: Date = new Date();
    var SeriesAt: number;
    this.Standings = [];
    this.MySchedule.forEach((element) => {
      if (element.PlayingDate < curDate && element.Fighter1Score >= 0) {
        SeriesAt = this.FindSeries(element.Fighter1);
        if (SeriesAt < 0) {
          this.Standings.push({
            SeriesName: element.Fighter1,
            GamesPlayed: 0,
            Wins: 0,
            Loss: 0,
            AttacksFor: 0,
            AttacksAgainst: 0,
          });
          SeriesAt = this.Standings.length - 1;
        }
        this.UpdateCurrentRow(element, SeriesAt, 'H');
        SeriesAt = this.FindSeries(element.Fighter2);

        if (SeriesAt < 0) {
          this.Standings.push({
            SeriesName: element.Fighter2,
            GamesPlayed: 0,
            Wins: 0,
            Loss: 0,
            AttacksFor: 0,
            AttacksAgainst: 0,
          });
          SeriesAt = this.Standings.length - 1;
        }
        this.UpdateCurrentRow(element, SeriesAt, 'A');
      }
    });

    //Sort Standings
    this.Standings.sort((left, right): number => {
      if (left.Wins * 3 + left.Loss < right.Wins * 3 + right.Loss) return 1;
      if (left.Wins * 3 + left.Loss > right.Wins * 3 + right.Loss) return -1;
      if (left.AttacksFor < right.AttacksFor) return 1;
      if (left.AttacksFor > right.AttacksFor) return -1;
      return 0;
    });
  }

  private UpdateCurrentRow(
    element: Schedule,
    SeriesAt: number,
    HomeAway: string
  ) {
    this.Standings[SeriesAt].GamesPlayed++;
    if (HomeAway == 'H') {
      this.Standings[SeriesAt].GamesPlayed += element.Fighter1Score;
      this.Standings[SeriesAt].AttacksAgainst += element.Fighter2Score;
      //Win
      if (element.Fighter1Score > element.Fighter2Score)
        this.Standings[SeriesAt].Wins++;
    }

    if (HomeAway == 'A') {
      this.Standings[SeriesAt].AttacksFor += element.Fighter2Score;
      this.Standings[SeriesAt].AttacksAgainst += element.Fighter1Score;

      if (element.Fighter2Score > element.Fighter1Score)
        this.Standings[SeriesAt].Wins++;
    }

    if (element.Fighter1Score == element.Fighter1Score)
      this.Standings[SeriesAt].Loss++;
  }

  //Find the series or return -1
  private FindSeries(SeriesName: string): number {
    var FoundAt: number = -1;

    for (var x = 0; x < this.Standings.length; x++)
      if (this.Standings[x].SeriesName == SeriesName) return x;

    return FoundAt;
  }
}
