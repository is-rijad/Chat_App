import {Injectable} from "@angular/core";

@Injectable()
export class RandomGenerator {
  private readonly randomSlova = "qwertzuioplkjhgfdsayxcvbnmQWERTZUIOPLKJHGFDSAYXCVBNM";

  public GenerisiString(velicina : number) : string {
    let randomString = "";
    for (let i = 0; i < velicina; i++) {
      let randomIndex = Math.floor(Math.random() * this.randomSlova.length);
      randomString += this.randomSlova.charAt(randomIndex);
    }
    return randomString;
  }
}
