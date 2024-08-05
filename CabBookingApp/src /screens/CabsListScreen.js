import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

const CabsListScreen = ({ navigation }) => {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const fetchCabs = async () => {
      const cabsCollection = collection(db, "cabs");
      const cabsSnapshot = await getDocs(cabsCollection);
      const cabsList = cabsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCabs(cabsList);
    };

    fetchCabs();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("CabDetail", { carId: item.id })}
          >
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>{item.companyName}</Text>
              <Text style={styles.itemSubtext}>{item.carModel}</Text>
            </View>
            <Text style={styles.chevron}>{">"}</Text>
          </TouchableOpacity>
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
  chevron: {
    fontSize: 24,
    color: "#4a90e2",
  },
});

export default CabsListScreen;
