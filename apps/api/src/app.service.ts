import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World from the me API!";
  }

  health() {
    return { status: "OK" };
  }
}
