import { Hotel, RoomType } from "./Hotel";

export class HotelManager {
  private hotels: Hotel[];
  private static instance: HotelManager;

  private constructor() {
    this.hotels = [];
  }

  public static getInstance(): HotelManager {
    if (!this.instance) {
      this.instance = new HotelManager();
    }
    return this.instance;
  }

  public addHotel(
    name: string,
    location: string,
    address: string,
    roomTypes: RoomType[]
  ): Hotel {
    const hotel = new Hotel(name, location, address, roomTypes);
    this.hotels.push(hotel);
    return hotel;
  }

  public getHotels(): Hotel[] {
    return this.hotels;
  }

  public getHotelById(id: string): Hotel | undefined {
    return this.hotels.find((hotel) => hotel.getId() === id);
  }

  public getHotelByName(name: string): Hotel | undefined {
    return this.hotels.find((hotel) => hotel.getName() === name);
  }

  public getHotelByLocation(location: string): Hotel[] {
    return this.hotels.filter((hotel) => hotel.getLocation() === location);
  }

  public getHotelByAddress(address: string): Hotel[] {
    return this.hotels.filter((hotel) => hotel.getAddress() === address);
  }
}
