export interface TrainingPlan {
  training_plan_name: string;
  date_from: string;
  date_to: string;
  training_sesion_number: number;
  calendar_assocs: Association[];
  calendar_stars: Star[];
  calendar_comments: CalendarComment[];
  id: number;
}

export interface Association {
  tile_id: string;
  calendar_date: string;
  training_plan: string;
  training_plan_id: number;
  tile_color: string;
  training_sesion: number;
  tile_type: string;
  asso_index_in_array: number;
  asso_temporary_id: number;
  id: number;
}

export interface CalendarComment {
  comment_user: string;
  comment_data: string;
  comment_day: string;
  comment_body: string;
  comment_is_edited: boolean;
  comment_user_role: string;
  id: number;
}

export interface TrainingPlanInfo {
  training_plan_name: string;
  training_plan_active: boolean;
  training_plan_athlete: string;
  training_plan_id: number;
  id: number;
}

export interface Star {
  id: number;
  star_date: string;
  star_color: string;
  star_description: string;
}

export interface Invitation {
  platform_token: string;
  trainer_email: string;
  trainer_nick: string;
}
