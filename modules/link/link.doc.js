// Authentication & Authorization Specification
const auth = {
  name: "Authorization",
  in: "header",
  description: "Bearer token",
  type: "string",
  required: true,
};

const linkRouteDocumentation = {
  "/link": {
    post: {
      tags: ["Store Link"],
      parameters: [auth],
      summary: "Generate Link and QRCode",
      description:
        "The endpoint collects the business details as an object and returns a Unique QRcode ",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                businessName: "Zeddic Store",
                businessAddress: "Abuja, Nigeria",
                businessContactNumber: 2348100000000,
                businessContactEmail: "abc@example.com",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Ok",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  status: "Ok",
                  link: "http://bus.me/asdfghj3456789tyuighjkbnm",
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized",
        },
      },
    },
  },
};

module.exports = linkRouteDocumentation;
