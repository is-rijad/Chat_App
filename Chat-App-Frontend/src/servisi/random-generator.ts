export class RandomGenerator {
  private static readonly randomSlova = "qwertzuioplkjhgfdsayxcvbnmQWERTZUIOPLKJHGFDSAYXCVBNM";

  public static GenerisiString(velicina : number) : string {
    let randomString = "";
    for (let i = 0; i < velicina; i++) {
      let randomIndex = Math.floor(Math.random() * this.randomSlova.length);
      randomString += this.randomSlova.charAt(randomIndex);
    }
    return randomString;
  }
}
