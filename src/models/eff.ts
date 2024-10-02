import { effect_v1_parser, effect_v2_parser, header_parser } from "./common";
import { Parser } from "binary-parser";

// "EFF "
const EFFECT_SIGNATURE = [69, 70, 70, 32];
// "V1"
const VERSION1 = [86, 49];
// "V2"
const VERSION2 = [86, 50];
// "EFF V1"
const EFFECTV1 = Buffer.from(EFFECT_SIGNATURE.concat(VERSION1));
// "EFF V2"
const EFFECTV2 = Buffer.from(EFFECT_SIGNATURE.concat(VERSION2));

// Effect  V1 -> 1
// Effect  V2 -> 2
const type_parser = new Parser().uint8("effect_version");

const parser = header_parser()
  .seek(-8)
  .wrapped({
    wrapper: (buffer) => {
      if (buffer.equals(EFFECTV1)) {
        return Buffer.from([1]);
      }
      if (buffer.equals(EFFECTV2)) {
        return Buffer.from([2]);
      }
      return Buffer.from([0]);
    },
    length: 6,
    type: type_parser,
  })
  .seek(2)
  .choice({
    tag: "effect_version",
    choices: {
      0: null,
      1: effect_v1_parser,
      2: effect_v2_parser,
    },
  });

export default parser;
