import { render, fireEvent } from "@testing-library/react-native";
import WeatherCard from "../frontend/utils/weatherCard";

describe("WeatherCard Component", () => {
  it("affiche correctement les informations météorologiques", () => {
    const mockData = {
      city: "Nantes",
      temperature: "7",
      description: "Nuageux",
    };

    const { getByText } = render(<WeatherCard {...mockData} />);

    expect(getByText("Nantes")).toBeTruthy();
    expect(getByText("7°")).toBeTruthy();
    expect(getByText("Nuageux")).toBeTruthy();
  });

  // Ici, tu pourrais ajouter des tests supplémentaires pour les interactions ou les changements d'état
});
