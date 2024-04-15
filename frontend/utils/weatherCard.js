import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const WeatherCard = ({ city, temperature, description, icon }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.temperature}>{`${temperature}°`}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 50,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default WeatherCard;
