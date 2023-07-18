import { expect, test } from "@playwright/test";

test("Create an incident", async ({ request, baseURL }) => {
  const _response = await request.post(`${baseURL}api/users`, {
    data: {
      name: "morpheus",
      job: "leader",
    },
  });
  console.log(_response.status());
  console.log(await _response.json());

  expect(_response.status()).toBe(201);
  expect(_response.ok()).toBeTruthy();
});

test.only("Get an instance", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}api/users`, {
    params: {
      pages: 2,
    },
    /*
    using param is similar to ${baeURL}api/users?pages=2
    */
  });

  console.log(baseURL);

  console.log(_response.status());
  console.log(await _response.json());
});

test("Get instance of single user", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}api/users/2`);

  console.log(baseURL);

  console.log(_response.status());
  console.log(await _response.json());
});

/*
    output as xml:
    in the header section:
    headers: {
        "Accept": "application/xml"
    }

    console.log((await _response.body()).toString());

*/

test("Update an incident", async ({ request, baseURL }) => {
  const _response = await request.put(`${baseURL}api/users/2`, {
    data: {
      name: "morpheus",
      job: "zion resident",
    },
  });
  console.log(_response.status());
  console.log(await _response.json());

  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

//custom request by me

const email = "testuser@mail.com";
test("Partial update an incident", async ({ request, baseURL }) => {
  const _response = await request.patch(`${baseURL}api/users/2`, {
    data: {
      name: "morpheus",
      job: "zion resident",
      email: email,
    },
  });
  console.log(_response.status());
  console.log(await _response.json());
});

/*
  for authorization and extra headers:
    playwright config er moddhe: 
    use: {
      extraHTTPHeaders: {
        "": ""
        jegula headers lage ogula ekhane dibo. 
      }
    }

*/

/*
    parsing a value from the json response body

    1st e amra je value ta reponse theke nibo oitar 1ta variable nite hobe.

    let (variable): (variable_type)


    then we have to capture the entire json response body in a variable;
    const (var)= await _response.json()

    then from within that response body, we have to select the specific value that we are looking for;
    (variable) = (var).result.(jetar value amra json reponse theke nibo oita)

    example:
    let email: string

    const res= await _response.json()
    email= res.result.email_address

    then we can use this email variable where ever we want:
    example:
    params: {
      new_email: email
    }

*/

/*
    verify response: 

    expect(await _response.json()).toMatchObject({
      ekhane pura response body ta re paste kore dibo.
    })

*/

/* 
    output as xml:
    console.log((await _response.body()).toString());

    but before this line, we have to use a header:
    headers: {
      "Accept": "application/xml"
    }

*/
