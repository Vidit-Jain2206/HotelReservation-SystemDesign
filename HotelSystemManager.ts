import { Hotel, RoomType } from "./Hotel";
import { HotelManager } from "./HotelManager";
import { Reservation, ReservationStatus } from "./Reservation";
import { ReserveManager } from "./ReserveManager";
import { User } from "./User";
import { UserManager } from "./UserManager";

export class HotelSystemManager {
  private userManager: UserManager;
  private hotelManager: HotelManager;
  private reserveManager: ReserveManager;
  private static instance: HotelSystemManager;

  private constructor() {
    this.userManager = UserManager.getInstance();
    this.hotelManager = HotelManager.getInstance();
    this.reserveManager = ReserveManager.getInstance();
  }

  public static getInstance(): HotelSystemManager {
    if (!this.instance) {
      this.instance = new HotelSystemManager();
    }
    return this.instance;
  }

  public addHotel(
    name: string,
    location: string,
    address: string,
    roomTypes: RoomType[]
  ): Hotel {
    return this.hotelManager.addHotel(name, location, address, roomTypes);
  }

  public addUser(name: string, email: string, phone: string): User {
    return this.userManager.addUser(name, email, phone);
  }

  public addReservation(
    id: string,
    hotelId: string,
    roomType: RoomType,
    numberOfRooms: number,
    checkInDate: Date,
    checkOutDate: Date,
    userId: string
  ): Reservation | null {
    const hotel = this.hotelManager.getHotelById(hotelId);
    const user = this.userManager.getUserById(userId);

    if (!hotel) {
      console.log("Hotel not found");
      return null;
    }

    if (!user) {
      console.log("User not found");
      return null;
    }
    return this.reserveManager.addReservation(
      id,
      hotel,
      roomType,
      numberOfRooms,
      checkInDate,
      checkOutDate,
      user
    );
  }

  public getHotels(): Hotel[] {
    return this.hotelManager.getHotels();
  }

  public getUsers(): User[] {
    return this.userManager.getUsers();
  }

  public getReservations(): Reservation[] {
    return this.reserveManager.getReservations();
  }

  public getReservationsByHotel(hotelId: string): Reservation[] {
    const hotel = this.hotelManager.getHotelById(hotelId);
    if (!hotel) {
      console.log("Hotel not found");
      return [];
    }
    return this.reserveManager.getReservationsByHotel(hotel);
  }

  public getReservationsByUser(userId: string): Reservation[] {
    const user = this.userManager.getUserById(userId);
    if (!user) {
      console.log("User not found");
      return [];
    }
    return this.reserveManager.getReservationsByUser(user);
  }

  public getHotelByName(name: string): Hotel | undefined {
    return this.hotelManager.getHotelByName(name);
  }

  public cancelReservation(reservationId: string) {
    this.reserveManager.cancelReservation(reservationId);
  }
}
