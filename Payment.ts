import { Reservation } from "./Reservation";
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export class Payment {
  private id: string;
  private amount: number;
  private status: PaymentStatus;
  private reservation: Reservation;

  constructor(amount: number, reservation: Reservation) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.amount = amount;
    this.status = PaymentStatus.PENDING;
    this.reservation = reservation;
  }

  public getId(): string {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getStatus(): string {
    return this.status;
  }

  public getReservation(): Reservation {
    return this.reservation;
  }

  public setStatus(status: PaymentStatus) {
    this.status = status;
  }
}
