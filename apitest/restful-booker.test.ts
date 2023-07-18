import { expect, request, test } from "@playwright/test";

let auth_token: string;
test("Generate auth token", async ({ request, baseURL }) => {
  const _response = await request.post(`${baseURL}/auth`, {
    // headers: {
    //   "Content-Type": "application/json",
    // },
    data: {
      username: "admin",
      password: "password123",
    },
  });

  console.log(_response.status());
  console.log(await _response.json());

  const res = await _response.json();
  auth_token = res.token;
  console.log(auth_token);

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});
