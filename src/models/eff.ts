import { effects_v2_without_headers_parser, header_parser } from "./common";
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

const effect_v1_parser = new Parser()
  .uint16le("effect_type")
  .uint8("target_type")
  .uint8("power")
  .uint32le("parameter_1")
  .uint32le("parameter_2")
  .uint8("timing_mode")
  .uint8("dispel_resistance")
  .uint32le("duration")
  .uint8("probability_1")
  .uint8("probability_2")
  .string("resref_key", {
    length: 8,
    stripNull: true,
  })
  .uint32le("dice_thrown_maximum_level")
  .uint32le("dice_sides_minimum_level")
  .uint32le("saving_throw_type")
  .uint32le("saving_throw_bonus")
  .uint32le("nown");

const effect_v2_parser = new Parser().nest("effect_v2", {
  type: header_parser().nest({
    type: effects_v2_without_headers_parser,
  }),
});

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
