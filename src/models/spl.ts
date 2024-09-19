import { feature_block_parser, header_parser } from "./common";
import { Parser } from "binary-parser";

const spell_header_parser = header_parser()
  .uint32le("unidentified_spell_name")
  .uint32le("identified_spell_name")
  .string("completion_sound", { length: 8, stripNull: true })
  .uint32le("flags")
  .uint16le("spell_type")
  .uint32le("exclusion_flags")
  .uint16le("casting_graphics")
  .uint8("min_level")
  .uint8("primary_spell_school")
  .uint8("min_strength")
  .uint8("secondary_spell_school")
  .uint8("min_strength_bonus")
  .uint8("kit_usability_1")
  .uint8("min_intelligence")
  .uint8("kit_usability_2")
  .uint8("min_dexterity")
  .uint8("kit_usability_3")
  .uint8("min_wisdom")
  .uint8("kit_usability_4")
  .uint16le("min_constitution")
  .uint16le("min_charisma")
  .uint32le("spell_level")
  .uint16le("max_stackable")
  .string("spell_book_icon", { length: 8, stripNull: true })
  .uint16le("lore")
  .string("ground_icon", { length: 8, stripNull: true })
  .uint32le("base_weight")
  .uint32le("spell_description_generic")
  .uint32le("spell_description_identified")
  .string("description_icon", { length: 8, stripNull: true })
  .uint32le("enchantment")
  .uint32le("offset_to_extended_headers")
  .uint16le("count_of_extended_headers")
  .uint32le("offset_to_feature_block_table")
  .uint16le("offset_to_casting_feature_blocks")
  .uint16le("count_of_casting_feature_blocks");

const extended_spell_header_parser = new Parser()
  .uint8("spell_form")
  .uint8("friendly")
  .uint16le("location")
  .string("memorised_icon", { length: 8, stripNull: true })
  .uint8("target_type")
  .uint8("target_count")
  .uint16le("range")
  .uint16le("level_required")
  .uint16le("casting_time")
  .uint16le("times_per_day")
  .uint16le("dice_sides")
  .uint16le("dice_thrown")
  .uint16le("enchanted")
  .uint16le("damage_type")
  .uint16le("count_of_feature_blocks")
  .uint16le("offset_to_feature_blocks")
  .uint16le("charges")
  .uint16le("charge_depletion_behaviour")
  .uint16le("projectile");

const parser = spell_header_parser
  .array("extended_headers", {
    type: extended_spell_header_parser,
    length: "count_of_extended_headers",
    offset: "offset_to_extended_headers",
  })
  .array("equipping_feature_blocks", {
    type: feature_block_parser,
    offset: "offset_to_feature_block_table",
    readUntil: "eof",
  });

export default parser;
