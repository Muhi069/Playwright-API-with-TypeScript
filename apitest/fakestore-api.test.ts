import { APIResponse, expect, request, test } from "@playwright/test";

// negative testing login api //
test("wrong username pass -", async ({ request, baseURL }) => {
  const _response = await request.post(`${baseURL}/auth/login`, {
    data: {
      username: "mor_214",
      password: "8dfdfdf",
    },
  });

  console.log(_response.status());

  expect(_response.status()).toBe(401);

  if (_response.status() == 401) {
    console.log("login failed");
  } else {
    console.log("login success");
  }

  const htmlContent = await _response.text();
  console.log(htmlContent);

  expect(htmlContent).toContain("username or password is incorrect");
});

// empty usernamne or password //
test("empty username or pass -", async ({ request, baseURL }) => {
  const _response = await request.post(`${baseURL}/auth/login`, {
    data: {
      username: "",
      password: "8dfdfdf",
    },
  });

  console.log(_response.status());

  expect(_response.status()).toBe(400);

  if (_response.status() == 400) {
    console.log("login failed");
  } else {
    console.log("login success");
  }

  const htmlContent = await _response.text();
  console.log(htmlContent);

  expect(htmlContent).toContain(
    "username and password are not provided in JSON format"
  );
});

// positive testing login api //
let auth_token: string;
let firstname: string;
let lastname: string;
test("Generate auth token by logging in +", async ({ request, baseURL }) => {
  const _response = await request.post(`${baseURL}/auth/login`, {
    data: {
      username: "mor_2314",
      password: "83r5^_",
    },
  });

  console.log(_response.status());
  console.log(await _response.json());

  const res = await _response.json();
  auth_token = res.token;
  console.log(auth_token);

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();

  if (_response.status() == 200) {
    console.log("login successful");
  } else {
    console.log("login not successful");
  }
});

// get logged in user information //
test("Get profile info of logged in user +", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}/users/2`);

  console.log(_response.status());
  console.log(await _response.json());

  const kk = JSON.parse(await _response.text());
  console.log(Object.keys(kk));

  expect(Object.keys(kk)).toContain("name");

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

// update user profile //
test("Update user profile +", async ({ request, baseURL }) => {
  const _response = await request.patch(`${baseURL}/users/2`, {
    data: {
      address: {
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
        city: "kilcoole",
        street: "Lovers Ln",
        number: 7267,
        zipcode: "12926-3874",
      },
      id: 2,
      email: "morrison@gmail.com",
      username: "mor_2314",
      password: "83r5^_",
      name: {
        firstname: "david",
        lastname: "morrisson",
      },
      phone: "1-570-236-7033",
      __v: 0,
    },
  });

  console.log(_response.status());
  console.log(await _response.json());

  const res = await _response.json();
  lastname = res.name.lastname;
  console.log(lastname);

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();

  if (lastname == "morrisson") {
    console.log("Name changed");
  } else {
    console.log("ID Hacked");
  }
});

// user searching all products //
test("User searching all products +", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}/products`);

  console.log(_response.status());
  console.log(await _response.json());

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

// search product by category, limit search result, sort the search result //
test("User searches product by category +", async ({ request, baseURL }) => {
  const itemSize: number = 3;
  const _response = await request.get(
    `${baseURL}/products/category/electronics`,
    {
      params: {
        limit: itemSize,
        sort: "desc",
      },
    }
  );
  const kk = JSON.parse(await _response.text())[0];
  console.log(Object.keys(kk));

  expect(Object.keys(JSON.parse(await _response.text())[0])).toEqual([
    "id",
    "title",
    "price",
    "description",
    "category",
    "image",
    "rating",
  ]);

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
  console.log(JSON.parse(await _response.text()).length);
  expect(JSON.parse(await _response.text()).length).toEqual(itemSize);
});

// see cart //
test("See cart +", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}/carts`);

  console.log(_response.status());
  console.log(await _response.json());

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

// add new to cart //
test("add to cart +", async ({ request, baseURL }) => {
  const _response = await request.post(`${baseURL}/carts`, {
    data: {
      userId: 5,
      date: "2020-02-03",
      products: [
        {
          productId: 5,
          quantity: 1,
        },
        {
          productId: 1,
          quantity: 5,
        },
      ],
    },
  });

  console.log(_response.status());
  console.log(await _response.json());

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

// update cart //
test.only("update to cart +", async ({ request, baseURL }) => {
  const _response = await request.put(`${baseURL}/carts/7`, {
    data: {
      userId: 3,
      date: "2019-12-10",
      products: [
        {
          productId: 1,
          quantity: 3,
        },
      ],
    },
  });

  console.log(_response.status());
  console.log(await _response.json());

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});
