export interface Athlete {
  id?: number;
  athlete_name?: string;
  athlete_phone_number?: string;
  athlete_email?: string;
  athlete_sport_discipline?: string;
  athlete_age?: string;
  athlete_height?: string;
  athlete_weight?: string;
  athlete_arm?: string;
  athlete_chest?: string;
  athlete_waist?: string;
  athlete_hips?: string;
  athlete_tigh?: string;
  fitness_level?: number;
  custom_athlete_parameters?: CustomAthleteParameter[];
  platform_notes?: PlatformNote[];
  plan_appends?: TrainingPlanApend[];
  attendant_membership?: MinAthleteInvitation;
  invitation?: MinAthleteInvitation;
  pending_user_invitation?: MinAthleteInvitation;
}

export interface TrainingPlanApend {
  id?: number;
  training_plan_id?: number;
  athlete_platform_id?: number;
  plan_activity_status?: string;
}

export interface MinAthleteInvitation {
  id?: number;
  athlete_email?: string;
}

export interface CustomAthleteParameter {
  parameter_name?: string;
  parameter_date?: string;
  parameter_description?: number;
  id?: number;
}

export interface PlatformNote {
  platform_note_name?: string;
  platform_note_link?: string;
  platform_note_description?: string;
  id?: number;
}

export interface AthleteInformations {
  id?: number;
  athlete_name: string;
  activated_training_plan?: {
    training_plan_id?: number;
    training_plan_name?: string;
  };
}
