import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert, PermissionsAndroid, Platform } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Geolocation from "@react-native-community/geolocation";

const WEATHER_API_URL = "http://localhost:3000";

const HomeScreen = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getGeolocation();
    } else if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: "Weather App Location Permission",
          message: "Weather App needs access to your location " + "so you can get the local weather information.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
          getGeolocation();
        } else {
          setError("Location permission denied");
          Alert.alert("Permission Denied", "Recherchez une ville pour connaître la météo.");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      setError("This platform is not supported");
      Alert.alert("Platform Not Supported", "Recherchez une ville pour connaître la météo.");
    }
  };

  const getGeolocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setError(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchWeatherData = async (latitude, longitude) => {
    // Use latitude and longitude to fetch weather data from the backend
    try {
      const response = await axios.get(`${WEATHER_API_URL}/current`, {
        params: { lat: latitude, lon: longitude },
      });
      setCurrentWeather(response.data);
      setHourlyForecast(response.data.hourly);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      console.log(error.response); // Response provided by the server
      console.log(error.request); // Request details
      console.log(error.message); // Error message
    }
  };

  const searchCityWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError("");
      const response = await axios.get(`${WEATHER_API_URL}/current`, {
        params: { city: city },
      });
      setCurrentWeather(response.data.current);
      setHourlyForecast(response.data.hourly);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Please try again later.");
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 22) return "evening";
    return "night";
  };

  const getBackgroundImage = () => {
    const timeOfDay = getTimeOfDay();
    switch (timeOfDay) {
      case "morning":
        return require("../assets/Matin.jpg");
      case "afternoon":
        return require("../assets/Journe.jpg");
      case "evening":
        return require("../assets/Soire.jpg");
      case "night":
        return require("../assets/Nuit.jpg");
      default:
        return require("../assets/Journe.jpg");
    }
  };

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <TextInput
            placeholder="Search for city..."
            placeholderTextColor="#fff"
            style={styles.searchInput}
            value={city}
            onChangeText={(text) => setCity(text)}
            onSubmitEditing={searchCityWeather}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="magnify" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.weatherSection}>
          <Icon name={currentWeather?.icon} size={60} color="#fff" />
          <Text style={styles.temperatureText}>{currentWeather?.temperature}°</Text>
          <Text style={styles.weatherDescription}>{currentWeather?.description}</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.hourlyForecast}>
          {hourlyForecast.map((forecast, index) => (
            <View key={index} style={styles.hourlyItem}>
              <Text style={styles.hourlyTime}>{forecast.time}</Text>
              <Icon name={forecast.icon} size={25} color="#fff" />
              <Text style={styles.hourlyTemp}>{forecast.temperature}°</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.adviceText}>Conseils: Si vous souhaitez sortir cette nuit, n'hésitez pas à bien vous couvrir !</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    // ...other styles for the input
  },
  searchButton: {
    // ...styles for the button
  },
  weatherSection: {
    alignItems: "center",
    // ...additional styles
  },
  temperatureText: {
    fontSize: 60,
    color: "#fff",
    // ...additional styles
  },
  weatherDescription: {
    fontSize: 20,
    color: "#fff",
    // ...additional styles
  },
  hourlyForecast: {
    // ...styles for the scroll view
  },
  hourlyItem: {
    alignItems: "center",
    marginRight: 20,
    // ...additional styles
  },
  hourlyText: {
    color: "#fff",
    // ...additional styles
  },
  adviceText: {
    color: "#fff",
    // ...additional styles
  },
  // ...styles for the bottom navigation bar
});

export default HomeScreen;
