import { effect_v1_parser, effect_v2_parser, header_parser } from "./common";
import { Parser } from "binary-parser";

const creature_header_parser = header_parser()
  .uint32("long_creature_name")
  .uint32("short_creature_name")
  .uint32("flags")
  .uint32("exp_for_killing")
  .uint32("exp")
  .uint32("gold")
  .uint32("state_flags")
  .uint16("current_hp")
  .uint16("base_hp")
  .uint32("animation_id")
  .uint8("metal_color")
  .uint8("minor_color")
  .uint8("major_color")
  .uint8("skin_color")
  .uint8("leather_color")
  .uint8("armor_color")
  .uint8("hair_color")
  .uint8("eff_structure")
  .string("small_portrait", { length: 8, stripNull: true })
  .string("large_portrait", { length: 8, stripNull: true })
  .uint8("reputation")
  .uint8("hide_in_shadows")
  .int16("nac_1")
  .int16("nac_2")
  .int16("nac_mod_crushing")
  .int16("nac_mod_missile")
  .int16("nac_mod_piercing")
  .int16("nac_mod_slashing")
  .uint8("thac0")
  .uint8("attacks")
  .uint8("save_death")
  .uint8("save_wands")
  .uint8("save_poly")
  .uint8("save_breath")
  .uint8("save_spells")
  .uint8("resist_fire")
  .uint8("resist_cold")
  .uint8("resist_electricity")
  .uint8("resist_acid")
  .uint8("resist_magic")
  .uint8("resist_magicfire")
  .uint8("resist_magiccold")
  .uint8("resist_slashing")
  .uint8("resist_crushing")
  .uint8("resist_piercing")
  .uint8("resist_missile")
  .uint8("detect_illusions")
  .uint8("set_traps")
  .uint8("lore")
  .uint8("open_locks")
  .uint8("move_silently")
  .uint8("find_traps")
  .uint8("pick_pockets")
  .uint8("fatique")
  .uint8("intoxication")
  .uint8("luck")
  .uint8("proficiency_largeswords")
  .uint8("proficiency_smallswords")
  .uint8("proficiency_bows")
  .uint8("proficiency_spears")
  .uint8("proficiency_blunt")
  .uint8("proficiency_spiked")
  .uint8("proficiency_axes")
  .uint8("proficiency_missiles")
  .string("unused_proficencies", { length: 7, stripNull: true })
  .uint8("nightmare_mode")
  .uint8("translucency")
  .uint8("reputation_loss_if_killed")
  .uint8("reputation_loss_if_joins_party")
  .uint8("reputation_loss_if_leaves_party")
  .uint8("turn_undead_level")
  .uint8("tracking_skill")
  .string("tracking_length", { length: 32, stripNull: true })
  .array("strrefs", {
    type: "int32le",
    length: 100,
  })
  .uint8("level_first_class")
  .uint8("level_second_class")
  .uint8("level_third_class")
  .uint8("sex")
  .uint8("strength")
  .uint8("strength_bonus")
  .uint8("intelligence")
  .uint8("wisdom")
  .uint8("dexterity")
  .uint8("constitution")
  .uint8("charisma")
  .uint8("morale")
  .uint8("morale_break")
  .uint8("racial_enemy")
  .uint16("morale_recovery_time")
  .uint32("kit")
  .string("override_script", { length: 8, stripNull: true })
  .string("class_script", { length: 8, stripNull: true })
  .string("race_script", { length: 8, stripNull: true })
  .string("general_script", { length: 8, stripNull: true })
  .string("default_script", { length: 8, stripNull: true })
  .uint8("enemy_ally")
  .uint8("general")
  .uint8("race")
  .uint8("class")
  .uint8("specific")
  .uint8("gender")
  .string("object_references", { length: 5, stripNull: true })
  .uint8("alignment")
  .uint16("global_actor_enumeration")
  .uint16("local_actor_enumeration")
  .string("death_variable", { length: 32, stripNull: true })
  .int32("offset_to_known_spells")
  .int32("count_of_known_spells")
  .int32("offset_to_spell_memorization_info")
  .int32("count_of_spell_memorization_info")
  .int32("offset_to_memorized_spell_table")
  .int32("count_of_memorized_spell_table")
  .int32("offset_to_item_slots")
  .int32("offset_to_items")
  .int32("count_of_items")
  .int32("offset_to_effects")
  .int32("count_of_effects")
  .string("dialog_ref", { length: 8, stripNull: true });

const known_spells_parser = new Parser()
  .string("spell_name", { length: 8, stripNull: true })
  .uint16le("spell_level")
  .uint16le("spell_type");

const spell_memorization_info_parser = new Parser()
  .uint16le("spell_level")
  .uint16le("number_of_spells_memorizable")
  .uint16le("number_of_spells_memorizable_after_effects")
  .uint16le("spell_type")
  .int32le("index_to_spell_table")
  .int32le("count_of_memorizable_spell_tables");

const spell_memorization_table_parser = new Parser()
  .string("spell_name", { length: 8, stripNull: true })
  .uint32le("memorised");

const item_table_parser = new Parser()
  .string("resource_name", { length: 8, stripNull: true })
  .uint8("item_expiration_time_hour")
  .uint8("item_expiration_time")
  .uint16le("quantity_1")
  .uint16le("quantity_2")
  .uint16le("quantity_3")
  .bit4("unused_1")
  .bit1("undroppable")
  .bit1("stolen")
  .bit1("unstealable")
  .bit1("identified")
  .seek(3);

const item_slots_parser = new Parser()
  .int16le("helmet")
  .int16le("armor")
  .int16le("shield")
  .int16le("gloves")
  .int16le("left_ring")
  .int16le("right_ring")
  .int16le("amulet")
  .int16le("belt")
  .int16le("boots")
  .int16le("weapon_1")
  .int16le("weapon_2")
  .int16le("weapon_3")
  .int16le("weapon_4")
  .int16le("quiver_1")
  .int16le("quiver_2")
  .int16le("quiver_3")
  .int16le("quiver_4")
  .int16le("cloak")
  .int16le("quick_item_1")
  .int16le("quick_item_2")
  .int16le("quick_item_3")
  .int16le("inventory_item_1")
  .int16le("inventory_item_2")
  .int16le("inventory_item_3")
  .int16le("inventory_item_4")
  .int16le("inventory_item_5")
  .int16le("inventory_item_6")
  .int16le("inventory_item_7")
  .int16le("inventory_item_8")
  .int16le("inventory_item_9")
  .int16le("inventory_item_10")
  .int16le("inventory_item_11")
  .int16le("inventory_item_12")
  .int16le("inventory_item_13")
  .int16le("inventory_item_14")
  .int16le("inventory_item_15")
  .int16le("inventory_item_16")
  .int16le("magic_weapon")
  .int16le("weapon_slot_selected")
  .int16le("weapon_ability_selected");

const effect_v1_array_parser = new Parser().array("effects", {
  type: effect_v1_parser,
  length: "count_of_effects",
});

const effect_v2_array_parser = new Parser().array("effects", {
  type: effect_v2_parser,
  length: "count_of_effects",
});

const parser = creature_header_parser
  .array("known_spells", {
    type: known_spells_parser,
    length: "count_of_known_spells",
    offset: "offset_to_known_spells",
  })
  .array("spell_memorization_info", {
    type: spell_memorization_info_parser,
    length: "count_of_spell_memorization_info",
    offset: "offset_to_spell_memorization_info",
  })
  .array("memorized_spells", {
    type: spell_memorization_table_parser,
    length: "count_of_memorized_spell_table",
    offset: "offset_to_memorized_spell_table",
  })
  // @ts-ignore
  .saveOffset("currentOffset")
  .seek(function () {
    return this.offset_to_effects - this.currentOffset;
  })
  .choice({
    tag: "eff_structure",
    choices: {
      0: effect_v1_array_parser,
      1: effect_v2_array_parser,
    },
  })
  .saveOffset("currentOffset")
  .seek(function () {
    return this.offset_to_item_slots - this.currentOffset;
  })
  .nest("item_slots", { type: item_slots_parser })
  .saveOffset("currentOffset")
  .seek(function () {
    return this.offset_to_items - this.currentOffset;
  })
  .array("item_table", {
    type: item_table_parser,
    length: "count_of_items",
  });

export default parser;
