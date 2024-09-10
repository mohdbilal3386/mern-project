export interface ProductType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface userType {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number | string;
  weight: number | string;
  eyeColor: string;
  hair: { color: string; type: string };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: { lat: number; lng: number };
    country: string;
  };
}
