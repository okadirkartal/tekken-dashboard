import { Injectable } from '@angular/core';
import { SEASON_SCHEDULE, SERIES } from './scheduleData';

@Injectable({ providedIn: 'root' })
export class MatchService {
  getScheduleAsync() {
    return Promise.resolve(SEASON_SCHEDULE);
  }

  getSchedule() {
    return SEASON_SCHEDULE;
  }

  getAllSeriesAsync() {
    return Promise.resolve(SERIES);
  }

  getAllSeries() {
    return SERIES;
  }
}
