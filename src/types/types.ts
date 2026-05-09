export type User = {
  _id: string;
  email: string;
  name: string;
}

export type Measurement = {
  _id: string;
  date: string;
  systolic: number;
  diastolic: number;
  pulse: number;
};

export type ApiResponse<T> = {
  data: T;
}

export type Token = string;

export type tagName = 'reading' | 'readings' | 'user';