import { HotelSystemManager } from "./HotelSystemManager";
import { RoomType } from "./Hotel";
import { Reservation } from "./Reservation";

// Get the system manager instance
const hotelSystemManager = HotelSystemManager.getInstance();

// Test hotel creation
try {
  console.log("\n=== Creating Hotels ===");
  const hotel1 = hotelSystemManager.addHotel(
    "Marriott",
    "New York",
    "123 Broadway St",
    [RoomType.Delux, RoomType.Suit, RoomType.SuperDelux],
    new Map([
      [RoomType.Delux, 100],
      [RoomType.Suit, 200],
      [RoomType.SuperDelux, 300],
    ])
  );

  const hotel2 = hotelSystemManager.addHotel(
    "Hilton",
    "Los Angeles",
    "456 Hollywood Blvd",
    [RoomType.Delux, RoomType.Suit],
    new Map([
      [RoomType.Delux, 100],
      [RoomType.Suit, 200],
    ])
  );

  console.log(
    "Hotels created successfully:",
    hotel1.getName(),
    hotel2.getName()
  );

  // Test user creation
  console.log("\n=== Creating Users ===");
  const user1 = hotelSystemManager.addUser(
    "John Doe",
    "john@example.com",
    "1234567890"
  );

  const user2 = hotelSystemManager.addUser(
    "Jane Smith",
    "jane@example.com",
    "9876543210"
  );

  console.log("Users created successfully:", user1.getName(), user2.getName());

  // Test reservation creation
  console.log("\n=== Creating Reservations ===");
  const checkInDate = new Date();
  const checkOutDate = new Date();
  checkOutDate.setDate(checkOutDate.getDate() + 3); // 3 days stay

  const reservation1 = hotelSystemManager.addReservation(
    "RES001",
    hotel1.getId(),
    RoomType.Delux,
    2,
    checkInDate,
    checkOutDate,
    user1.getId()
  );

  console.log("Reservation created successfully for", user1.getName());

  // Test getting reservations
  console.log("\n=== Checking Reservations ===");
  console.log("All Reservations:", hotelSystemManager.getReservations());
  console.log(
    "User1 Reservations:",
    hotelSystemManager.getReservationsByUser(user1.getId())
  );
  console.log(
    "Hotel1 Reservations:",
    hotelSystemManager.getReservationsByHotel(hotel1.getId())
  );

  // Test room availability
  console.log("\n=== Checking Room Availability ===");
  console.log("Available rooms in Hotel1:", hotel1.getAvailableRooms());

  // Test reservation cancellation
  console.log("\n=== Cancelling Reservation ===");
  if (reservation1) {
    hotelSystemManager.cancelReservation(reservation1.getId());
    console.log("Reservation cancelled successfully");
  }

  // Verify cancellation effects
  console.log("\n=== Verifying Cancellation Effects ===");
  console.log("Updated available rooms in Hotel1:", hotel1.getAvailableRooms());
  console.log(
    "Updated User1 Reservations:",
    hotelSystemManager.getReservationsByUser(user1.getId())
  );

  // Test error cases
  console.log("\n=== Testing Error Cases ===");

  // Try to create reservation with non-existent hotel
  try {
    hotelSystemManager.addReservation(
      "RES002",
      "non-existent-hotel-id",
      RoomType.Delux,
      1,
      checkInDate,
      checkOutDate,
      user1.getId()
    );
  } catch (error: any) {
    console.log("Expected error for non-existent hotel:", error.message);
  }

  // Try to create reservation with non-existent user
  try {
    hotelSystemManager.addReservation(
      "RES003",
      hotel1.getId(),
      RoomType.Delux,
      1,
      checkInDate,
      checkOutDate,
      "non-existent-user-id"
    );
  } catch (error: any) {
    console.log("Expected error for non-existent user:", error.message);
  }

  // Try to create reservation with invalid room type
  try {
    hotelSystemManager.addReservation(
      "RES004",
      hotel2.getId(),
      RoomType.SuperDelux, // Hotel2 doesn't have SuperDelux
      1,
      checkInDate,
      checkOutDate,
      user1.getId()
    );
  } catch (error: any) {
    console.log("Expected error for invalid room type:", error.message);
  }
} catch (error: any) {
  console.error("An error occurred:", error.message);
}
