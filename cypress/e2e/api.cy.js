describe("API Testing on GoRest with dynamic user flow", () => {
  let createdUserId; // variable global untuk simpan ID user

  // Test Case 1: Create a new user
  it("should create a new user successfully", () => {
    const newUser = {
      name: "John Doe",
      gender: "male",
      email: `john.doe.${Date.now()}@mail.com`, // email harus unik
      status: "active",
    };

    cy.apiRequest("POST", "public/v2/users", { body: newUser }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include(newUser);

      // Simpan ID user untuk digunakan di test berikutnya
      createdUserId = response.body.id;
    });
  });

  // Test Case 2: GET - Retrieve list of users
  it("should return 200 and an array of users", () => {
    cy.apiRequest("GET", "public/v2/users").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  // Test Case 3: PUT - Update user details (menggunakan user ID yang dibuat sebelumnya)
  it("should update user details successfully", () => {
    const updatedData = {
      name: "John Doe Updated",
      status: "inactive",
    };

    cy.apiRequest("PUT", `public/v2/users/${createdUserId}`, {
      body: updatedData,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include(updatedData);
    });
  });

  // Test Case 4: DELETE - Delete the user created earlier
  it("should delete a user successfully", () => {
    cy.apiRequest("DELETE", `public/v2/users/${createdUserId}`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
