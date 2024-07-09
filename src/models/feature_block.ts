import { Parser } from "binary-parser";

const feature_block_parser = new Parser()
  .uint16le("opcode_number")
  .uint8("target_type")
  .uint8("power")
  .uint32le("parameter_1")
  .uint32le("parameter_2")
  .uint8("timing_mode")
  .uint8("dispel_resistance")
  .uint32le("duration")
  .uint8("probability_1")
  .uint8("probability_2")
  .string("resource", {
    length: 8,
    stripNull: true,
  })
  .uint32le("dice_thrown_max_level")
  .uint32le("dice_sides_min_level")
  .string("saving_throw_type", {
    length: 4,
    stripNull: true,
  })
  .uint32le("saving_throw_bonus")
  .uint32le("stacking_id");

export default feature_block_parser;
