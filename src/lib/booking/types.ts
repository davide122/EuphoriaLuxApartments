export type SuiteSlug = "passion" | "infinity";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type BookingRecord = {
  id: string;
  suite: SuiteSlug;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
};

export type BookingRequestInput = {
  suite: SuiteSlug;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
};

