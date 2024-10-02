import { Parser } from "binary-parser";

const header_parser = () =>
  new Parser()
    .endianness("little")
    .string("signature", {
      length: 4,
      stripNull: true,
      formatter: (sig: string) => {
        return sig.replaceAll(" ", "");
      },
    })
    .string("version", {
      length: 4,
      stripNull: true,
      formatter: (version: string) => {
        return version.replaceAll(" ", "");
      },
    });

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

const effects_v2_without_headers_parser = new Parser()
  .uint32le("opcode_number")
  .uint32le("target_type")
  .uint32le("power")
  .uint32le("parameter_1")
  .uint32le("parameter_2")
  .uint16le("timing_mode")
  .uint16le("timing")
  .uint32le("duration")
  .uint16le("probability_1")
  .uint16le("probability_2")
  .array("resource_1", { type: "uint8", length: 8, stripNull: true })
  .uint32le("dice_thrown")
  .uint32le("dice_sides")
  .uint32le("saving_throw_type")
  .uint32le("saving_throw_bonus")
  .uint32le("special")
  .uint32le("primary_spell_school")
  .uint32le("unknown_1")
  .uint32le("parent_resource_lowest_affected_level")
  .uint32le("parent_resource_highest_affected_level")
  .uint32le("dispel_resistance")
  .uint32le("parameter_3")
  .uint32le("parameter_4")
  .uint32le("parameter_5")
  .uint32le("time_applied_ticks")
  .string("resource_2", { length: 8, stripNull: true })
  .string("resource_3", { length: 8, stripNull: true })
  .int32le("caster_x_coordinate")
  .int32le("caster_y_coordinate")
  .int32le("target_x_coordinate")
  .int32le("target_y_coordinate")
  .uint32le("parent_resource_type")
  .string("parent_resource", { length: 8, stripNull: true })
  .string("parent_resource_flags", { length: 4, stripNull: true })
  .uint32le("projectile")
  .int32le("parent_resource_slot")
  .string("variable_name", { length: 32, stripNull: true })
  .uint32le("caster_level")
  .uint32le("first_apply")
  .uint32le("secondary_type")
  .array("_unknown_2", {
    type: "uint32le",
    length: 15,
  });

const effect_v2_parser = new Parser().nest("effect_v2", {
  type: header_parser().nest({
    type: effects_v2_without_headers_parser,
  }),
});

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

export {
  effect_v1_parser,
  effects_v2_without_headers_parser,
  effect_v2_parser,
  feature_block_parser,
  header_parser,
};
