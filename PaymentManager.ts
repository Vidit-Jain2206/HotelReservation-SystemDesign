import { Payment, PaymentStatus } from "./Payment";
import { Reservation, ReservationStatus } from "./Reservation";

export class PaymentManager {
  private payments: Payment[];
  private static instance: PaymentManager;

  private constructor() {
    this.payments = [];
  }

  public static getInstance(): PaymentManager {
    if (!this.instance) {
      this.instance = new PaymentManager();
    }
    return this.instance;
  }

  public createPayment(amount: number, reservation: Reservation): Payment {
    const payment = new Payment(amount, reservation);
    this.payments.push(payment);
    return payment;
  }

  public processPayment(payment: Payment) {
    // enable payment gateway
    // if payment is successful
    // set payment status to completed
    // set reservation status to confirmed

    // if payment is failed
    // set payment status to failed
    // set reservation status to cancelled

    // if payment is pending
    // set payment status to pending
    // set reservation status to pending

    let paymentStatus = false;
    // enable payment gateway it will return payment status

    // if payment is successful
    if (paymentStatus) {
      payment.setStatus(PaymentStatus.COMPLETED);
      payment.getReservation().changeStatus(ReservationStatus.CONFIRMED);
    } else {
      payment.setStatus(PaymentStatus.FAILED);
      payment.getReservation().changeStatus(ReservationStatus.CANCELLED);
    }
  }

  public getPayments(): Payment[] {
    return this.payments;
  }

  public getPaymentById(id: string): Payment | undefined {
    return this.payments.find((payment) => payment.getId() === id);
  }
}
