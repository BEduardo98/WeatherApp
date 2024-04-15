const supertest = require("supertest");
const app = require("../app");
const db = require("../database");
const bcrypt = require("bcrypt");
jest.mock("../database"); // Mock the database

describe("UserController Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    db.query.mockClear();
  });

  afterAll(async () => {
    await db.query("DELETE FROM utilisateur");
    await db.end();
  });

  test("Register User - Success", async () => {
    db.query.mockResolvedValueOnce([{ insertId: 1 }]);
    const response = await supertest(app)
      .post("/users/register")
      .send({
        email: "test@example.com",
        password: "Password123!",
      })
      .expect(201)
      .expect("Content-Type", /json/);
    expect(response.body.message).toBe("User registered");
  });

  test("Register User - Fail on Duplicate Email", async () => {
    const duplicateEmailError = new Error("Duplicate email");
    duplicateEmailError.code = "ER_DUP_ENTRY";
    db.query.mockRejectedValueOnce(duplicateEmailError);
    const response = await supertest(app)
      .post("/users/register")
      .send({
        email: "test@example.com",
        password: "Password123!",
      })
      .expect(409); // Expect conflict due to duplicate email

    expect(response.body.message).toBe("Email already exists");
  });
  test("Login User - Success", async () => {
    db.query.mockResolvedValueOnce([
      [
        {
          id: 1,
          email: "login@example.com",
          mot_de_passe: await bcrypt.hash("Password123!", 12),
        },
      ],
    ]); // Double array because [users] is expected to be an array of results

    const user = {
      email: "login@example.com",
      password: "Password123!",
    };

    // Try to login
    const response = await supertest(app)
      .post("/users/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.token).toBeDefined();
    expect(response.body.userId).toBeDefined();
  });
  test("Update Preferences - Success", async () => {
    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); // Simulate successful update

    const response = await supertest(app)
      .put("/users/preferences/1")
      .send({
        localisationPréférée: 2,
        unitéDeMesure: "metric",
        notifications: true,
      })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("Preferences updated successfully.");
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [
      "1",
      JSON.stringify({ localisationPréférée: 2, unitéDeMesure: "metric", notifications: true }),
    ]);
  });
});
