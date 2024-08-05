import React, { useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { BookingContext } from "../context/BookingContext";

const MyCabsScreen = () => {
  const { bookedCabs, setBookedCabs } = useContext(BookingContext);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsSnapshot = await getDocs(collection(db, "bookings"));
      const bookings = bookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookedCabs(bookings);
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel the booking?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await deleteDoc(doc(db, "bookings", bookingId));
            setBookedCabs(
              bookedCabs.filter((booking) => booking.id !== bookingId)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookedCabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>{item.carModel}</Text>
              <Text style={styles.itemSubtext}>{item.companyName}</Text>
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelBooking(item.id)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  itemSubtext: {
    fontSize: 14,
    color: "#666666",
  },
  cancelButton: {
    backgroundColor: "#ff3b30",
    padding: 8,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: "#ffffff",
  },
});

export default MyCabsScreen;
