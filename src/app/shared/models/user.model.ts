export interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    role: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    address: Address;
    company: Company;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
    coordinates: Coordinates;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Company {
    department: string;
    name: string;
    title: string;
    address: CompanyAddress;
}

export interface CompanyAddress {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
    coordinates: Coordinates;
}