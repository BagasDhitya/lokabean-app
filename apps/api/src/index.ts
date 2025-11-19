import express, { Application } from "express";

class App {
  private app: Application;
  private PORT: number;

  constructor() {
    this.app = express();
    this.PORT = 8000;
    this.middlewares();
  }

  public middlewares() {
    this.app.use(express.json());
  }

  public start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running at http://localhost:${this.PORT}`);
    });
  }
}

const app = new App();
app.start();
