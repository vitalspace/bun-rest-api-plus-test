import { describe, expect, test } from "bun:test";

import "./index";
// expect(response.status).toBe(200);
//   console.log(response.status);

describe(`GET /api/users`, async () => {
  const response = await fetch("http://localhost:4000/api/users");
  const data = await response.json();
  test("Should get a list of existing user", () => {
    expect(data).toEqual(data);
    // or
    // expect(Array.isArray(data)).toBe(true)
    // or
    // expect(data.length).toBeGreaterThan(0);
  });
});
