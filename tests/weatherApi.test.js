import { fetchWeatherData } from "../frontend/api/weatherApi";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

it("récupère les données météorologiques et retourne les données pour une ville donnée", async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));

  const response = await fetchWeatherData("Nantes");

  expect(response.data).toEqual("12345");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining("Nantes"));
});
