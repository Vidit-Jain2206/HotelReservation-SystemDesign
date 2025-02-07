import { Hotel, RoomType } from "./Hotel";
import { Reservation, ReservationStatus } from "./Reservation";
import { User } from "./User";

export class ReserveManager {
  private reservations: Reservation[];
  private static instance: ReserveManager;

  private constructor() {
    this.reservations = [];
  }

  public static getInstance(): ReserveManager {
    if (!this.instance) {
      this.instance = new ReserveManager();
    }
    return this.instance;
  }

  public addReservation(
    id: string,
    hotel: Hotel,
    roomType: RoomType,
    numberOfRooms: number,
    checkInDate: Date,
    checkOutDate: Date,
    user: User
  ): Reservation | null {
    const reservation = new Reservation(
      id,
      hotel,
      roomType,
      numberOfRooms,
      checkInDate,
      checkOutDate,
      user
    );
    const totalRooms = reservation.getHotel().getTotalRooms();
    const reservedRooms = reservation.getHotel().getReservedRooms();
    const hotelRoomType = reservation.getHotel().getRoomTypes();

    if (!hotelRoomType.includes(roomType)) {
      console.log("Invalid Room Type");
      return null;
    }
    if (
      (totalRooms.get(roomType) ?? 0) >=
      (reservedRooms.get(roomType) ?? 0) + reservation.getNumberOfRooms()
    ) {
      this.reservations.push(reservation);
      reservation.getUser().addReservation(reservation);
      reservation
        .getHotel()
        .addReservedRooms(roomType, reservation.getNumberOfRooms());
      // reservation.changeStatus(ReservationStatus.CONFIRMED);
      return reservation;
    } else {
      console.log("Not enough rooms");
      return null;
    }
  }

  public cancelReservation(reservationId: string) {
    const reservation = this.reservations.find(
      (reservation) => reservation.getId() === reservationId
    );
    if (!reservation) {
      console.log("Reservation not found");
      return;
    }
    reservation.changeStatus(ReservationStatus.CANCELLED);
    reservation
      .getHotel()
      .removeReservedRooms(
        reservation.getRoomType(),
        reservation.getNumberOfRooms()
      );
  }

  public getReservations(): Reservation[] {
    return this.reservations;
  }

  public getReservationsByUser(user: User): Reservation[] {
    return this.reservations.filter(
      (reservation) => reservation.getUser() === user
    );
  }

  public getReservationsByHotel(hotel: Hotel): Reservation[] {
    return this.reservations.filter(
      (reservation) => reservation.getHotel() === hotel
    );
  }

  public getReservationById(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.getId() === id);
  }

  public getAmount(reservationId: string): number {
    const reservation = this.getReservationById(reservationId);
    if (!reservation) {
      console.log("Reservation not found");
      return 0;
    }
    const roomType = reservation.getRoomType();
    const numberOfRooms = reservation.getNumberOfRooms();
    const price = reservation.getHotel().getPriceByRoomType(roomType);
    const noOfDays = this.getNoOfDays(reservation.getId());
    return price * numberOfRooms * noOfDays;
  }

  public getNoOfDays(reservationId: string): number {
    const reservation = this.reservations.find(
      (reservation) => reservation.getId() === reservationId
    );
    if (!reservation) {
      console.log("Reservation not found");
      return 0;
    }
    const checkInDate = reservation.getCheckInDate();
    const checkOutDate = reservation.getCheckOutDate();
    const noOfDays = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(noOfDays / (1000 * 60 * 60 * 24));
  }
}
