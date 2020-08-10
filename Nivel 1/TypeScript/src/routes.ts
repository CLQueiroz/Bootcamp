import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function HelloWorld(request: Request, response: Response) {
  const user = createUser({
    name: "caiqueonisto@live.com",
    email: "caiqueonisto@live.com",
    password: "123456",
    techs: [
      "Reactjs",
      "Nodejs",
      "React native",
      { title: "Javascript", experience: 100 },
    ],
  });

  console.log(user.email);
  return response.json({ message: "Hello World" });
}
