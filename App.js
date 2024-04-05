import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>Nantes</Text>
      <Text style={styles.temperature}>15°C</Text>
      <Text style={styles.conditions}>Nuageux</Text>
      <View style={styles.forecast}>
        <Text>Prévisions horaires :</Text>
        {/* Ici, vous pouvez mapper sur vos données de prévisions pour afficher chaque heure */}
      </View>
      <View style={styles.advice}>
        <Text>Conseil :</Text>
        <Text>N'oubliez pas de vous couvrir si vous sortez ce soir.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  city: {
    fontSize: 30,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 60,
  },
  conditions: {
    fontSize: 20,
  },
  forecast: {
    marginTop: 20,
  },
  advice: {
    marginTop: 20,
  },
});
