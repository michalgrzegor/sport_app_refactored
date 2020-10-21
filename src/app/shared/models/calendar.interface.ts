import { Association, CalendarComment } from './training-plan.interface';

export interface CalendarDay {
  date: Date;
  originalPage: number;
  page: number[];
  associations: Association[];
  trainingSessions: number;
  comments: CalendarComment[];
}
