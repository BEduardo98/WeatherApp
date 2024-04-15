const supertest = require("supertest");
const app = require("../app");
const axios = require("axios");
const db = require("../database");
jest.mock("axios");

describe("Weather API Tests", () => {
  afterAll(async () => {
    await db.end();
  });
  it("should fetch current weather data", async () => {
    const mockData = { temperature: "15°C", condition: "Sunny" };
    axios.get.mockResolvedValue({ data: mockData });

    const response = await supertest(app).get("/weather?city=London");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
