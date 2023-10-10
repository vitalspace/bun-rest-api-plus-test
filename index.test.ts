import { describe, expect, test } from "bun:test";

import "./index";

// describe(`GET /api/users`, async () => {
//   const response = await fetch("http://localhost:4000/api/users");
//   const data = await response.json();
//   test("Should get a list of existing user", () => {
// expect(response.status).toBe(200);
//     expect(data).toEqual(data);
//     // or
//     // expect(Array.isArray(data)).toBe(true)
//     // or
//     // expect(data.length).toBeGreaterThan(0);
//   });
// });

describe("POST /api/createuser", async () => {
  test("Should create a new user", async () => {
    const bodyContent = JSON.stringify({
      id: 4,
      name: "lucia",
      email: "lucia@mail.com",
    });

    const response = await fetch("http://localhost:4000/api/createuser", {
      method: "POST",
      body: bodyContent,
    });

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe("The user was created successfully");
  });

  test("Should return a response indicating the user already exists", async () => {
    const bodyContent = JSON.stringify({
      id: 4,
      name: "lucia",
      email: "lucia@mail.com",
    });

    const response = await fetch("http://localhost:4000/api/createuser", {
      method: "POST",
      body: bodyContent,
    });

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe("The user already exists");
  });
});
