export interface UserDTO {
  email: string;
  name: string;
  surname: string;
  keyword: string;
  birth_date: string;
  role: string;
  meals_per_day?: number;
  allergies?: string;
  injuries?: string;
  subscription_product_id: string;
  subscription_name: string;
  subscription_amount: string;
  gym_goal:
    | 'GAIN_MUSCLE'
    | 'LOSE_WEIGHT'
    | 'MAINTAIN_FITNESS'
    | 'IMPROVE_ENDURANCE';
  training_days?: string;
}

export interface Diet {
  diet_id: number;
  diet_name: string;
  start_date: string;
  note: string;
  created_at: string;
  preferences: string;
  allergies: string;
  id: number;
  type: string;
  description: string;
  diet_url: string;
  user_name: string | null;
  user_email: string | null;
}

export interface Workout {
  workout_id: number;
  workout_name: string;
  start_date: string;
  note: string;
  created_at: string;
  workout_url?: string;
  user_email?: string;
  user_name?: string;
}

export interface Subscription {
  productId: string;
  name: string;
  description: string;
  currency: string;
  amount: number;
  recurring: boolean;
  createdAt: string;
  updatedAt: string;
}
