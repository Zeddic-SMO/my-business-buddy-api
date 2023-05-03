// Signup route
const signup = {
  tags: ["user"],
  summary: "New User account",
  description:
    "This endpoint permits a new user to create either a **Customer or Business** account.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            email: "example@gmail.com",
            password: "1234567890",
            username: "Zeddic",
            role: "customer",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              _id: "644bb11bdbad9ecf9f679d14",
              name: "Product 1",
              desc: "This is a shirt",
              price: 2345,
              createdAt: "2023-04-28T11:42:19.995Z",
              updatedAt: "2023-04-28T11:42:19.995Z",
              __v: 0,
            },
          },
        },
      },
    },
  },
};

// Signin route
const signin = {
  tags: ["user"],
  summary: "Sign in",
  description:
    "This endpoint enables the user to login to his/her account. The endpoint returns a JWT token with user id and role as payload",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            email: "abc@example.com",
            password: "1234567890",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              user: {
                _id: "64528b0e58774dd9e2c5484a",
                role: "Customer",
              },
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUyOGIwZTU4Nzc0ZGQ5ZTJjNTQ4NGEiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2ODMxNDE4MjksImV4cCI6MTY4MzE0OTAyOX0.oRR9eW79u_AK7J5BHctB_KG1sHfscE3lSi_nSk6OYzs",
            },
          },
        },
      },
    },
  },
};

// Reset password
const reset_password = {
  tags: ["user"],
  summary: "Reset Password",
  description:
    "This enables a user to reset forgotten password. **Accept valid email address**",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            email: "abc@example.com",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "Password Reset Link Sent",
              resetpasswordLink:
                "http://localhost:5000/api/v1/auth/change-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRiZGQ4MDk2ZmRjNDNmOTZhNzIxNTUiLCJpYXQiOjE2ODMxNDI5OTEsImV4cCI6MTY4MzE1MDE5MX0.bfTmREK9YvOZKhDuR8_5uBLTiNmT7JZxkdHcvNXkDAc",
            },
          },
        },
      },
    },
  },
};

// documentaion
const authRouteDocumentation = {
  "/auth/signup": {
    post: signup,
  },

  "/auth/signin": {
    post: signin,
  },
  "/auth/reset": {
    post: reset_password,
  },
};
module.exports = authRouteDocumentation;
