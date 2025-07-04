export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  category: 'luxury' | 'exotic' | 'sports' | 'classic';
  specs: {
    engine: string;
    horsepower: number;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    fuelType: string;
  };
  features: string[];
  description: string;
  available: boolean;
}

export interface BookingRequest {
  id?: number;
  carId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

