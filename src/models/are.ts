import header_parser from "./header";
import { Parser } from "binary-parser";

const file_header_parser = header_parser()
  .string("area_wed", { length: 8, stripNull: true })
  .uint32le("last_saved")
  .uint32le("area_flags")
  .string("resref_of_the_area_to_the_north_of_this_area", {
    length: 8,
    stripNull: true,
  })
  .uint32le("north_area_flags")
  .string("resref_of_the_area_to_the_east_of_this_area", {
    length: 8,
    stripNull: true,
  })
  .uint32le("east_area_flags")
  .string("resref_of_the_area_to_the_south_of_this_area", {
    length: 8,
    stripNull: true,
  })
  .uint32le("south_area_flags")
  .string("resref_of_the_area_to_the_west_of_this_area", {
    length: 8,
    stripNull: true,
  })
  .uint32le("west_area_flags")
  .uint16le("area_type_flags")
  .uint16le("rain_probability")
  .uint16le("snow_probability")
  .uint16le("fog_probability")
  .uint16le("lightning_probability")
  .uint16le("wind_speed")
  .uint32le("offset_to_actors")
  .uint16le("count_of_actors")
  .uint16le("count_of_regions")
  .uint32le("offset_to_regions")
  .uint32le("offset_to_spawn_points")
  .uint32le("count_of_spawn_points")
  .uint32le("offset_to_entrances")
  .uint32le("count_of_entrances")
  .uint32le("offset_to_containers")
  .uint16le("count_of_containers")
  .uint16le("count_of_items")
  .uint32le("offset_to_items")
  .uint32le("offset_to_vertices")
  .uint16le("count_of_vertices")
  .uint16le("count_of_ambients")
  .uint32le("offset_to_ambients")
  .uint32le("offset_to_variables")
  .uint32le("count_of_variables")
  .uint16le("offset_to_tiled_object_flags")
  .uint16le("count_of_tiled_object_flags")
  .string("area_script", { length: 8, stripNull: true })
  .uint32le("size_of_explored_bitmask")
  .uint32le("offset_to_explored_bitmask")
  .uint32le("count_of_doors")
  .uint32le("offset_to_doors")
  .uint32le("count_of_animations")
  .uint32le("offset_to_animations")
  .uint32le("count_of_tiled_objects")
  .uint32le("offset_to_tiled_objects")
  .uint32le("offset_to_song_entries")
  .uint32le("offset_to_rest_interruptions")
  .uint32le("offset_to_automap_notes")
  .uint32le("count_of_automap_notes")
  .uint32le("offset_to_projectile_traps")
  .uint32le("number_of_entries_in_the_projectile_traps")
  .string("rest_movie_day", { length: 8, stripNull: true })
  .string("rest_movie_night", { length: 8, stripNull: true })
  .array("unused", {
    type: "uint8",
    length: 56,
  });

const actor_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .uint16le("current_x_coordinate")
  .uint16le("current_y_coordinate")
  .uint16le("destination_x_coordinate")
  .uint16le("destination_y_coordinate")
  .uint32le("flags")
  .uint16le("has_been_spawned")
  .uint8("first_letter_of_cre_resref")
  .uint8("unused_1")
  .uint32le("actor_animation")
  .uint16le("actor_orientation")
  .uint16le("unused_2")
  .uint32le("actor_removal_timer")
  .uint16le("movement_restriction_distance")
  .uint16le("movement_restriction_distance_move_to_object")
  .uint32le("actor_appearence_schedule")
  .uint32le("num_times_talked_to")
  .string("dialog", { length: 8, stripNull: true })
  .string("script_override", { length: 8, stripNull: true })
  .string("script_general", { length: 8, stripNull: true })
  .string("script_class", { length: 8, stripNull: true })
  .string("script_race", { length: 8, stripNull: true })
  .string("script_default", { length: 8, stripNull: true })
  .string("script_specific", { length: 8, stripNull: true })
  .string("cre_file", { length: 8, stripNull: true })
  .uint32le("offset_to_cre_structure")
  .uint32le("size_of_stored_cre_structure")
  .array("unused_3", {
    type: "uint8",
    length: 128,
  });

const region_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .uint16le("region_type")
  .array("minimum_bounding_box_of_this_point", { type: "uint16le", length: 4 })
  .uint16le("count_of_vertices_composing_the_perimeter")
  .uint32le("index_to_first_vertex")
  .uint32le("trigger_value")
  .uint32le("cursor_index")
  .string("destination_area", { length: 8, stripNull: true })
  .string("entrance_name_in_destination_area", {
    length: 32,
    stripNull: true,
  })
  .uint32le("flags")
  .uint32le("information_text")
  .uint16le("trap_detection_difficulty_percent")
  .uint16le("trap_removal_difficulty_percent")
  .uint16le("region_is_trapped")
  .uint16le("trap_detected")
  .array("trap_launch_location", { type: "uint16le", length: 2 })
  .string("key_item", { length: 8, stripNull: true })
  .string("region_script", { length: 8, stripNull: true })
  .uint16le("alternative_use_point_x_coordinate")
  .uint16le("alternative_use_point_y_coordinate")
  .array("unknown_1", {
    type: "uint8",
    length: 36,
  })
  .array("sound", { type: "uint8", length: 8, stripNull: true })
  .uint16le("talk_location_point_x")
  .uint16le("talk_location_point_y")
  .uint32le("speaker_name")
  .string("dialog_file", { length: 8, stripNull: true });

const spawn_point_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .uint16le("x_coordinate")
  .uint16le("y_coordinate")
  .string("resref_of_creature_to_spawn_1st", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_2nd", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_3rd", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_4th", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_5th", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_6th", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_7th", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_8th", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_9th", { length: 8, stripNull: true })
  .string("resref_of_creature_to_spawn_10th", { length: 8, stripNull: true })
  .uint16le("count_of_spawn_creatures")
  .uint16le("base_creature_number_to_spawn")
  .uint16le("frequency")
  .uint16le("spawn_method")
  .uint32le("actor_removal_timer")
  .uint16le("movement_restriction_distance")
  .uint16le("movement_restriction_distance_move_to_object")
  .uint16le("maximum_creatures_to_spawn")
  .uint16le("spawn_point_enabled")
  .uint32le("spawn_point_appearence_schedule")
  .uint16le("probability_day")
  .uint16le("probability_night")
  .uint32le("spawn_frequency")
  .uint32le("countdown")
  .uint8("spawn_weight_of_1st_creature_slot")
  .uint8("spawn_weight_of_2nd_creature_slot")
  .uint8("spawn_weight_of_3rd_creature_slot")
  .uint8("spawn_weight_of_4th_creature_slot")
  .uint8("spawn_weight_of_5th_creature_slot")
  .uint8("spawn_weight_of_6th_creature_slot")
  .uint8("spawn_weight_of_7th_creature_slot")
  .uint8("spawn_weight_of_8th_creature_slot")
  .uint8("spawn_weight_of_9th_creature_slot")
  .uint8("spawn_weight_of_10th_creature_slot")
  .array("unused", {
    type: "uint8",
    length: 38,
  });

const entrance_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .uint16le("x_coordinate")
  .uint16le("y_coordinate")
  .uint16le("orientation")
  .array("unused", {
    type: "uint8",
    length: 66,
  });

const container_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .uint16le("x_coordinate")
  .uint16le("y_coordinate")
  .uint16le("container_type")
  .uint16le("lock_difficulty")
  .uint32le("flags")
  .uint16le("trap_detection_difficulty")
  .uint16le("trap_removal_difficulty")
  .uint16le("container_is_trapped")
  .uint16le("trap_detected")
  .uint16le("trap_launch_x_coordinate")
  .uint16le("trap_launch_y_coordinate")
  .uint16le("left_bounding_box_of_container_polygon")
  .uint16le("top_bounding_box_of_container_polygon")
  .uint16le("right_bounding_box_of_container_polygon")
  .uint16le("bottom_bounding_box_of_container_polygon")
  .uint32le("index_to_first_item_in_this_container")
  .uint32le("count_of_items_in_this_container")
  .string("trap_script", { length: 8, stripNull: true })
  .uint32le("index_to_first_vertex_of_the_outline")
  .uint16le("count_of_vertices_making_up_the_outline")
  .uint16le("trigger_range")
  .string("owner_script_name", { length: 32, stripNull: true })
  .string("key_item", { length: 8, stripNull: true })
  .uint32le("break_difficulty")
  .uint32le("lockpick_string")
  .array("unused", {
    type: "uint8",
    length: 56,
  });

const vertices_parser = new Parser().uint16le("x").uint16le("y");

const item_parser = new Parser()
  .string("item_resref", { length: 8, stripNull: true })
  .uint16le("item_expiration_time")
  .uint16le("quantity_1")
  .uint16le("quantity_2")
  .uint16le("quantity_3")
  .uint32le("flags");

const ambient_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .uint16le("x_coordinate")
  .uint16le("y_coordinate")
  .uint16le("radius")
  .uint16le("height")
  .uint32le("pitch_variance")
  .uint16le("volume_variance")
  .uint16le("volume_percentage")
  .string("resref_of_sound_1", { length: 8, stripNull: true })
  .string("resref_of_sound_2", { length: 8, stripNull: true })
  .string("resref_of_sound_3", { length: 8, stripNull: true })
  .string("resref_of_sound_4", { length: 8, stripNull: true })
  .string("resref_of_sound_5", { length: 8, stripNull: true })
  .string("resref_of_sound_6", { length: 8, stripNull: true })
  .string("resref_of_sound_7", { length: 8, stripNull: true })
  .string("resref_of_sound_8", { length: 8, stripNull: true })
  .string("resref_of_sound_9", { length: 8, stripNull: true })
  .string("resref_of_sound_10", { length: 8, stripNull: true })
  .uint16le("count_of_sounds")
  .uint16le("_unused_1")
  .uint32le("base_time_interval")
  .uint32le("base_time_deviation")
  .uint32le("ambient_appearence_schedule")
  .uint32le("flags")
  .array("unused", {
    type: "uint8",
    length: 64,
  });

const variable_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .uint16le("variable_type")
  .uint16le("resource_value")
  .uint32le("dword_value")
  .uint32le("int_value")
  .int64le("double_value")
  .string("script_name_value", { length: 32, stripNull: true });

const door_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .string("door_id", { length: 8, stripNull: true })
  .uint32le("flags")
  .uint32le("index_of_first_vertex_of_the_door_outline_when_open")
  .uint16le("count_of_vertices_of_the_door_outline_when_open")
  .uint16le("count_of_vertices_of_the_door_outline_when_closed")
  .uint32le("index_of_first_vertex_of_the_door_outline_when_closed")
  .array("minimum_bounding_box_of_the_door_polygon_when_open", {
    type: "uint16le",
    length: 4,
  })
  .array("minimum_bounding_box_of_the_door_polygon_when_closed", {
    type: "uint16le",
    length: 4,
  })
  .uint32le("index_of_first_vertex_in_the_impeded_cell_block_when_open")
  .uint16le("count_of_vertices_in_impeded_cell_block_when_open")
  .uint16le("count_of_vertices_in_impeded_cell_block_when_closed")
  .uint32le("index_of_first_vertex_in_the_impeded_cell_block_when_closed")
  .uint16le("hit_points")
  .uint16le("armor_class")
  .string("door_open_sound", { length: 8, stripNull: true })
  .string("door_close_sound", { length: 8, stripNull: true })
  .uint32le("cursor_index")
  .uint16le("trap_detection_difficulty")
  .uint16le("trap_removal_difficulty")
  .uint16le("door_is_trapped")
  .uint16le("trap_detected")
  .uint16le("trap_launch_target_x_coordinate")
  .uint16le("trap_launch_target_y_coordinate")
  .string("key_item", { length: 8, stripNull: true })
  .string("door_script", { length: 8, stripNull: true })
  .uint32le("detection_difficulty")
  .uint32le("lock_difficulty")
  .array("two_points", { type: "uint16le", length: 4 })
  .uint32le("lockpick_string")
  .string("travel_trigger_name", { length: 24, stripNull: true })
  .uint32le("dialog_speaker_name")
  .string("dialog_resref", { length: 8, stripNull: true })
  .array("unused", {
    type: "uint8",
    length: 8,
  });

const animation_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .uint16le("x_coordinate")
  .uint16le("y_coordinate")
  .uint32le("animation_appearence_schedule")
  .string("animation_resref", { length: 8, stripNull: true })
  .uint16le("bam_sequence_number")
  .uint16le("bam_frame_number")
  .uint32le("flags")
  .uint16le("height")
  .uint16le("transparency")
  .uint16le("starting_frame")
  .uint8("chance_of_looping")
  .uint8("skip_cycles")
  .string("palette", { length: 8, stripNull: true })
  .uint16le("animation_width")
  .uint16le("animation_height");

const automap_notes_bgee_parser = new Parser()
  .uint16le("x_coordinate")
  .uint16le("y_coordinate")
  .uint32le("note_text")
  .uint16le("strref_location")
  .uint16le("colour")
  .uint32le("note_count")
  .array("unused", {
    type: "uint8",
    length: 36,
  });

const tiled_object_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .string("tile_id", { length: 8, stripNull: true })
  .uint32le("flags")
  .uint32le("offset_to_open_search_squares")
  .uint16le("count_of_open_search_squares")
  .uint16le("count_of_closed_search_squares")
  .uint32le("offset_to_closed_search_squares")
  .array("unused", {
    type: "uint8",
    length: 48,
  });

const projectile_trap_parser = new Parser()
  .string("projectile_resref", { length: 8, stripNull: true })
  .uint32le("effect_block_offset")
  .uint16le("effect_block_size")
  .uint16le("missile_ids_reference")
  .uint16le("ticks_until_next_trigger_check")
  .uint16le("triggers_remaining")
  .uint16le("x_coordinate")
  .uint16le("y_coordinate")
  .uint16le("z_coordinate")
  .uint8("enemy_ally_targetting")
  .uint8("party_member_index");

const song_entry_parser = new Parser()
  .uint32le("day_song_reference_number")
  .uint32le("night_song_reference_number")
  .uint32le("win_song_reference_number")
  .uint32le("battle_song_reference_number")
  .uint32le("lose_song_reference_number")
  .uint32le("alt_music_1")
  .uint32le("alt_music_2")
  .uint32le("alt_music_3")
  .uint32le("alt_music_4")
  .uint32le("alt_music_5")
  .string("main_day_ambient_1", { length: 8, stripNull: true })
  .string("main_day_ambient_2", { length: 8, stripNull: true })
  .uint32le("main_day_ambient_volume_percent")
  .string("main_night_ambient_1", { length: 8, stripNull: true })
  .string("main_night_ambient_2", { length: 8, stripNull: true })
  .uint32le("main_night_ambient_volume_percent")
  .uint32le("reverb_or_unused")
  .array("unused", {
    type: "uint8",
    length: 60,
  });

const resref = new Parser().string("value", { length: 8, stripNull: true });

const rest_interruption_parser = new Parser()
  .string("name", { length: 32, stripNull: true })
  .array("interruption_explanation_text", {
    type: "uint32le",
    length: 10,
  })
  .array("resref_of_creature_to_spawn", { type: resref, length: 10 })
  .uint16le("count_of_creatures_in_spawn_table")
  .uint16le("difficulty")
  .uint32le("removal_time")
  .uint16le("movement_restriction_distance")
  .uint16le("movement_restriction_distance_move_to_object")
  .uint16le("maximum_number_of_creatures_to_spawn")
  .uint16le("interruption_point_enabled")
  .uint16le("probability_day_per_hour")
  .uint16le("probability_night_per_hour")
  .array("unused", {
    type: "uint8",
    length: 56,
  });

const parser = file_header_parser
  .array("actors", {
    type: actor_parser,
    length: "count_of_actors",
    offset: "offset_to_actors",
  })
  .array("regions", {
    type: region_parser,
    length: "count_of_regions",
    offset: "offset_to_regions",
  })
  .array("spawn_points", {
    type: spawn_point_parser,
    length: "count_of_spawn_points",
    offset: "offset_to_spawn_points",
  })
  .array("entrances", {
    type: entrance_parser,
    length: "count_of_entrances",
    offset: "offset_to_entrances",
  })
  .array("containers", {
    type: container_parser,
    length: "count_of_containers",
    offset: "offset_to_containers",
  })
  .array("items", {
    type: item_parser,
    length: "count_of_items",
    offset: "offset_to_items",
  })
  .array("vertices", {
    type: vertices_parser,
    length: "count_of_vertices",
    offset: "offset_to_vertices",
  })
  .array("ambients", {
    type: ambient_parser,
    length: "count_of_ambients",
    offset: "offset_to_ambients",
  })
  .array("variables", {
    type: variable_parser,
    length: "count_of_variables",
    offset: "offset_to_variables",
  })
  .array("explored_bitmasks", {
    type: "uint8",
    length: "count_of_explored_bitmasks",
    offset: "offset_to_explored_bitmasks",
  })
  .array("doors", {
    type: door_parser,
    length: "count_of_doors",
    offset: "offset_to_doors",
  })
  .array("animations", {
    type: animation_parser,
    length: "count_of_animations",
    offset: "offset_to_animations",
  })
  .array("automap_notes", {
    type: automap_notes_bgee_parser,
    length: "count_of_automap_notes",
    offset: "offset_to_automap_notes",
  })
  .array("tiled_objects", {
    type: tiled_object_parser,
    length: "count_of_tiled_objects",
    offset: "offset_to_tiled_objects",
  })
  .array("projectile_traps", {
    type: projectile_trap_parser,
    length: "number_of_entries_in_the_projectile_traps",
    offset: "offset_to_projectile_traps",
  })
  .nest("songs", { type: song_entry_parser, offset: "offset_to_songs" })
  .nest("rest_interruptions", {
    type: rest_interruption_parser,
    offset: "offset_to_rest_interruptions",
  });

export default parser;
