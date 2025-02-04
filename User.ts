import { Reservation } from "./Reservation";

export class User {
  private id: string;
  private name: string;
  private email: string;
  private phone: string;
  private reservations: Reservation[];

  constructor(name: string, email: string, phone: string) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.reservations = [];
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getReservations(): Reservation[] {
    return this.reservations;
  }

  public addReservation(reservation: Reservation) {
    this.reservations.push(reservation);
  }
}
