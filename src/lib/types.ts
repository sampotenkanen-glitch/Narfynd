export type TransportMode = "train" | "bus" | "carpool" | "flight" | string;

export interface TransportOption {
  mode: TransportMode;
  durationMinutes: number;
  priceUSD: number;
  co2Kg: number;
}

export type AccommodationType = "hotel" | "airbnb" | "hidden_gem" | string;

export interface AccommodationOption {
  name: string;
  type: AccommodationType;
  rating: number;
  pricePerNight: number;
  locationDescription: string;
  isHiddenGem?: boolean;
}

export interface WeatherDay {
  date: string;
  tempHighC: number;
  tempLowC: number;
  rainProbability: number;
}

export interface WeatherForecast {
  comfortScore: number;
  daily: WeatherDay[];
}
