export enum RoomType {
  "Delux",
  "SuperDelux",
  "Suit",
}

export class Hotel {
  private id: string;
  private name: string;
  private location: string;
  private address: string;
  private roomTypes: RoomType[];
  private totalRooms: Map<RoomType, number>;
  private reservedRooms: Map<RoomType, number>;

  constructor(
    name: string,
    location: string,
    address: string,
    roomTypes: RoomType[]
  ) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.name = name;
    this.location = location;
    this.address = address;
    this.roomTypes = roomTypes;
    this.totalRooms = new Map<RoomType, number>();
    for (const roomType of this.roomTypes) {
      this.totalRooms.set(roomType, 100);
    }
    this.reservedRooms = new Map<RoomType, number>();
    for (const roomType of this.roomTypes) {
      this.reservedRooms.set(roomType, 0);
    }
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getLocation(): string {
    return this.location;
  }

  public getAddress(): string {
    return this.address;
  }

  public getRoomTypes(): RoomType[] {
    return this.roomTypes;
  }

  public getTotalRooms(): Map<RoomType, number> {
    return this.totalRooms;
  }

  public getReservedRooms(): Map<RoomType, number> {
    return this.reservedRooms;
  }

  public addReservedRooms(roomType: RoomType, numberOfRooms: number) {
    this.reservedRooms.set(
      roomType,
      (this.reservedRooms.get(roomType) ?? 0) + numberOfRooms
    );
  }

  public removeReservedRooms(roomType: RoomType, numberOfRooms: number) {
    this.reservedRooms.set(
      roomType,
      (this.reservedRooms.get(roomType) ?? 0) - numberOfRooms
    );
  }

  public getAvailableRoomsByRoomType(roomType: RoomType): number {
    return (
      (this.totalRooms.get(roomType) ?? 0) -
      (this.reservedRooms.get(roomType) ?? 0)
    );
  }

  public getAvailableRooms(): Map<RoomType, number> {
    const availableRooms = new Map<RoomType, number>();
    for (const roomType of this.roomTypes) {
      availableRooms.set(roomType, this.getAvailableRoomsByRoomType(roomType));
    }
    return availableRooms;
  }
}
