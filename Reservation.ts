import { Hotel, RoomType } from "./Hotel";
import { User } from "./User";

export enum ReservationStatus {
  PENDING,
  CONFIRMED,
  CANCELLED,
}

export class Reservation {
  private id: string;
  private hotel: Hotel;
  private roomType: RoomType;
  private numberOfRooms: number;
  private checkInDate: Date;
  private checkOutDate: Date;
  private user: User;
  private status: ReservationStatus;

  constructor(
    id: string,
    hotel: Hotel,
    roomType: RoomType,
    numberOfRooms: number,
    checkInDate: Date,
    checkOutDate: Date,
    user: User
  ) {
    this.id = id;
    this.hotel = hotel;
    this.roomType = roomType;
    this.numberOfRooms = numberOfRooms;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.user = user;
    this.status = ReservationStatus.PENDING;
  }

  public changeStatus(status: ReservationStatus) {
    this.status = status;
  }

  public getStatus(): ReservationStatus {
    return this.status;
  }

  public getRoomType(): RoomType {
    return this.roomType;
  }

  public getNumberOfRooms(): number {
    return this.numberOfRooms;
  }

  public getCheckInDate(): Date {
    return this.checkInDate;
  }

  public getCheckOutDate(): Date {
    return this.checkOutDate;
  }

  public getUser(): User {
    return this.user;
  }

  public getHotel(): Hotel {
    return this.hotel;
  }

  public getId(): string {
    return this.id;
  }
}
