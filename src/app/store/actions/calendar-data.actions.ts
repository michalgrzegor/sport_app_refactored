import { Association } from './../../shared/models/training-plan.interface';
import { createAction, props } from '@ngrx/store';
import { CalendarDay } from 'src/app/shared/models/calendar.interface';

export const SetIsCalendarDataLoading = createAction(
  '[Associations API] SET_IS_CALENDAR_DATA_LOADING',
  props<{ isCalendarDataLoading: boolean }>()
);

export const SetCalendarData = createAction(
  '[Create Calendar Service] SET_CALENDAR_DATA',
  props<{ calendar: CalendarDay[] }>()
);

export const SetNextPage = createAction('[Calendar module] SET_NEXT_PAGE');

export const SetPreviousPage = createAction(
  '[Calendar module] SET_PREVIOUS_PAGE'
);

export const SetOpenedDay = createAction(
  '[Create Calendar Service] SET_OPENED_DAY',
  props<{ calendarDay: CalendarDay }>()
);

export const AddTileToDay = createAction(
  '[Association API] ADD_TILE_TO_DAY',
  props<{ association: Association }>()
);

export const UpdateCalendarAssociations = createAction(
  '[Associations API] UPDATE_CALENDAR_ASSOCIATIONS',
  props<{ association: Association }>()
);

export const RemoveTileFromDay = createAction(
  '[Association API] REMOVE_TILE_FROM_DAY',
  props<{ association: Association }>()
);

export const RemoveCalendarAssociations = createAction(
  '[Associations API] REMOVE_CALENDAR_ASSOCIATIONS',
  props<{ association: Association }>()
);
