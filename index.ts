import { serve } from "bun";
import { FS } from "@bunland/fs";

const fs = new FS();

const server = serve({
  async fetch(req) {
    const { method, url } = req;
    const { pathname } = new URL(url);

    let users;

    if (await fs.exists("./users.json")) {
      users = JSON.parse(await fs.openFile("./users.json"));
    }

    if (pathname === "/api/users" && method === "GET") {
      return new Response(JSON.stringify(users), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (pathname === "/api/createuser" && method === "POST") {
      const body = await req.json();
      const userExists = users.some((user: any) => user.id === body.id);

      if (userExists) {
        return new Response(
          JSON.stringify({ message: "The user already exists" })
        );
      }

      const newUsersJson = users.concat(body);
      await fs.writeFile("./users.json", JSON.stringify(newUsersJson));
      return new Response(JSON.stringify({ message: "The user was created successfully" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (pathname === "/api/updateuser" && method === "POST") {
      const body = await req.json();
      const newUsersJson = users.map((user: any) => {
        if (user.id === body.id) {
          return body;
        }
        return user;
      });

      await fs.writeFile("./users.json", JSON.stringify(newUsersJson));

      return new Response(JSON.stringify({"message": "User data was updated correctly"}), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (pathname === "/api/deleteuser" && method === "POST") {
      const body = await req.json();

      const newUsersJson = users.filter((user: any) => user.id !== body.id);
      await fs.writeFile("./users.json", JSON.stringify(newUsersJson));

      return new Response(JSON.stringify(newUsersJson), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response("", {
      status: 404,
    });
  },
  port: 4000,
});

console.log("Server on http://localhost:" + server.port);

export { server };
