// Authentication & Authorization Specification
const auth = {
  name: "Authorization",
  in: "header",
  description: "Bearer token",
  type: "string",
  required: true,
};

// Product Id parameter specification
const productId = {
  name: "id",
  in: "path",
  description: "Product's Id",
  type: "string",
  required: true,
  example: "644bb11bdbad9ecf9f679d14",
};

// list all products route
const listProducts = {
  tags: ["Product"],
  summary: "Fetch all products",
  description:
    "This endpoint fetches all the products available in a business store - **Public to all customers**",
  parameters: [auth],
  responses: {
    200: {
      description: "Ok",
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
    401: {
      description: "Unauthorized",
    },
  },
};

// create a new product route
const createProduct = {
  tags: ["Product"],
  summary: "Add a new product",
  description:
    "Supply a JSON data for the new product to be added. **- This operation is restricted to only Business Account handlers.**",
  parameters: [auth],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            name: "Aba_L Shirt",
            desc: "XL white Aba_L shirt",
            price: "N5000",
            businessOwner: "644bb11bdbad9ecf9f679d14",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
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
    401: {
      description: "Unauthorized",
    },
  },
};

// view a single product route
const singleProduct = {
  tags: ["Product"],
  parameters: [auth, productId],
  summary: "Fetch a single product",
  description: "This endpoint fetch a single product from the store.",
  responses: {
    200: {
      description: "Ok",
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
    401: {
      description: "Unauthorized",
    },
  },
};

// Edit a single product
const editProduct = {
  tags: ["Product"],
  parameters: [auth, productId],
  summary: "Update a product",
  description:
    "This endpoint accepts JSON data for product update -**This operation is restricted to Business account handlers only.**",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            name: "Aba_L Shirt",
            desc: "XL white Aba_L shirt",
            price: "N5000",
            businessOwner: "644bb11bdbad9ecf9f679d14",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "success",
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
    401: {
      description: "Unauthorized",
    },
  },
};

// Delete a product
const deleteProduct = {
  tags: ["Product"],
  parameters: [auth, productId],
  summary: "Delete a product",
  description:
    "This operations allows for deletion of a single product using the product's ID. **This operation is restricted to Business account handlers only.**",
  responses: {
    200: {
      description: "Ok",
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
    401: {
      description: "Unauthorized",
    },
  },
};

const productRouteDocumentation = {
  "/product": {
    get: listProducts,
    post: createProduct,
  },
  "/product/{productId}": {
    get: singleProduct,
    put: editProduct,
    delete: deleteProduct,
  },
};
module.exports = productRouteDocumentation;
