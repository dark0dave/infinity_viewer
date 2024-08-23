import feature_block_parser from "./feature_block";
import header_parser from "./header";
import { Parser } from "binary-parser";

const item_header_parser = header_parser()
  .int32le("unidentified_item_name")
  .int32le("identified_item_name")
  .string("replacement_item", { length: 8, stripNull: true })
  .uint32le("type_flags")
  .uint16le("category")
  .uint32le("usability")
  .string("item_animation", { length: 2, stripNull: true })
  .uint16le("min_level")
  .uint16le("min_strength")
  .uint8("min_strength_bonus")
  .uint8("kit_usability_1")
  .uint8("min_intelligence")
  .uint8("kit_usability_2")
  .uint8("min_dexterity")
  .uint8("kit_usability_3")
  .uint8("min_wisdom")
  .uint8("kit_usability_4")
  .uint8("min_constitution")
  .uint8("weapon_proficiency")
  .uint16le("min_charisma")
  .uint32le("base_value")
  .uint16le("max_stackable")
  .string("item_icon", { length: 8, stripNull: true })
  .uint16le("lore")
  .string("ground_icon", { length: 8, stripNull: true })
  .uint32le("base_weight")
  .int32le("item_description_generic")
  .int32le("item_description_identified")
  .string("description_icon", { length: 8, stripNull: true })
  .uint32le("enchantment")
  .int32le("offset_to_extended_headers")
  .int16le("count_of_extended_headers")
  .int32le("offset_to_feature_blocks")
  .int16le("index_to_equipping_feature_blocks")
  .int16le("count_of_feature_blocks");

const extended_item_header_parser = new Parser()
  .uint8("attack_type")
  .uint8("id_required")
  .uint8("location")
  .uint8("alternative_dice_sides")
  .string("use_icon", { length: 8, stripNull: true })
  .uint8("target_type")
  .uint8("target_count")
  .uint16le("range")
  .uint8("launcher_required")
  .uint8("alternative_dice_thrown")
  .uint8("speed_factor")
  .uint8("alternative_damage_bonus")
  .uint16le("thaco")
  .uint8("dice_sides")
  .uint8("primary_type_school")
  .uint8("dice_thrown")
  .uint8("secondary_type")
  .uint16le("damage_bonus")
  .uint16le("damage_type")
  .uint16le("feature_blocks_count")
  .uint16le("feature_blocks_index")
  .uint16le("max_charges")
  .uint16le("charge_depletion_behaviour")
  .array("flags", {
    type: "uint8",
    length: 4,
  })
  .uint16le("projectile_animation")
  .array("melee_animation", {
    type: "uint8",
    length: 6,
  })
  .uint16le("is_arrow")
  .uint16le("is_bolt")
  .uint16le("is_bullet");

const parser = item_header_parser
  .array("extended_headers", {
    type: extended_item_header_parser,
    length: "count_of_extended_headers",
    offset: "offset_to_extended_headers",
  })
  .array("equipping_feature_blocks", {
    type: feature_block_parser,
    length: "count_of_feature_blocks",
    offset: "offset_to_feature_blocks",
  });

export default parser;
