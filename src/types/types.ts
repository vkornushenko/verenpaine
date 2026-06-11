export type User = {
  _id: string;
  email: string;
  name: string;
};

export type AuthUser = User & {
  token: string;
};

export type Measurement = {
  _id: string;
  date: string;
  systolic: number;
  diastolic: number;
  pulse: number;
};

export type ApiResponse<T> = {
  data: T;
  
};

export type MeasurementsResponse = {
  data: Measurement[];
  totalMeasurements: number;
};

export type Token = string;

export type tagName = 'reading' | 'readings' | 'user';

export type ActionState<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type AuthActionState = ActionState<User>;

export type MeasurementActionState = ActionState<Measurement>;
