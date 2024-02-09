export class Alert {
    aktivan : boolean;
    tip : string;
    sadrzaj : string;
    static alert : Alert = {aktivan: false, sadrzaj: "", tip: ""};

    constructor(tip: string, sadrzaj: string, trajanje: number = 2000) {
        this.tip = tip;
        this.sadrzaj = sadrzaj;
        this.aktivan = true;
        setTimeout(() => {this.aktivan = false}, 2000);
    }
}
export class TipAlerta {
     static readonly success = "primary";
     static readonly error = "danger";
}
