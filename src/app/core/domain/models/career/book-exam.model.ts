export interface BookExamRequest {
  cdsId: number;
  adId: number;
  appId: number;
  adsceId: number;
  password: string;
}

export interface CancelBookingRequest {
  cdsId: number;
  adId: number;
  appId: number;
  password: string;
}
