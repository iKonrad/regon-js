import _ from "lodash";
import TYPES from "./types";
import Data from "./data";

const body =
  '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:tns="http://CIS/BIR/PUBL/2014/07" xmlns:i0="http://CIS/BIR/PUBL/2014/07" xmlns:q1="http://CIS/BIR/2014/07" xmlns:q2="http://CIS/BIR/2014/07" xmlns:q3="http://CIS/BIR/2014/07" xmlns:q4="http://CIS/BIR/2014/07" xmlns:q5="http://CIS/BIR/2014/07" xmlns:q6="http://CIS/BIR/2014/07" xmlns:q7="http://CIS/BIR/2014/07" xmlns:q8="http://CIS/BIR/2014/07" xmlns:ns="http://CIS/BIR/2014/07"><soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"><wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To><wsa:Action>{action}</wsa:Action></soap:Header><soap:Body>{body}</soap:Body></soap:Envelope>';

class Payload {
  constructor(type, values) {
    if (typeof values !== "object") {
      throw new Error("Values should be an object");
    }

    if (Object.values(TYPES).indexOf(type) === -1) {
      throw new Error(`Invalid type "${type}"`);
    }

    this.type = type;
    this.values = values;
  }

  toString() {
    let payload = Data.Payloads[this.type];
    if (typeof this.values === "object") {
      Object.keys(this.values).forEach(key => {
        if (typeof this.values[key] === "string") {
          payload = payload.replace(`{${key}}`, this.values[key]);
        } else if (typeof this.values[key] === "object") {
          payload = payload.replace(
            `{${key}}`,
            this.getParamsValues(this.values[key])
          );
        }
      });
    }

    let xml = body.replace("{action}", this.getAction());
    xml = xml.replace("{body}", payload);
    return xml;
  }

  getAction() {
    return Data.Actions[this.type];
  }

  getParamsValues(params) {
    let response = "";
    if (typeof params !== "object") {
      return false;
    }

    _(params).forEach((value, key) => {
      response += this.getParamValue(key, value);
    });

    return response;
  }

  getParamValue(name, value) {
    let response = "";
    switch (_.lowerCase(name).replace(/\s/g, "")) {
      case "krs":
        response = `<dat:Krs>${value}</dat:Krs>`;
        break;
      case "krsy":
        response = `<dat:Krsy>${value}</dat:Krsy>`;
        break;
      case "nip":
        response = `<dat:Nip>${value}</dat:Nip>`;
        break;
      case "nipy":
        response = `<dat:Nipy>${value}</dat:Nipy>`;
        break;
      case "regon":
        response = `<dat:Regon>${this.regonRepair(value)}</dat:Regon>`;
        break;
      case "regony14zn":
        response = `<dat:Regony14zn>${this.regonRepair(
          value
        )}</dat:Regony14zn>`;
        break;
      case "regony9zn":
        response = `<dat:Regony9zn>${this.regonRepair(value)}</dat:Regony9zn>`;
        break;
      default:
        response = value;
        break;
    }
    return response;
  }

  regonRepair(regon) {
    let parsedRegon = regon.toString();
    if (parsedRegon.length !== 9 || parsedRegon.length !== 14) {
      if (parsedRegon.length < 9) {
        while (parsedRegon.length !== 9) {
          parsedRegon = `0${parsedRegon}`;
        }
      } else if (parsedRegon.length > 9 && parsedRegon.length < 14) {
        while (parsedRegon.length !== 14) {
          parsedRegon = `0${parsedRegon}`;
        }
      }
    }
    return parsedRegon;
  }
}

export default Payload;
