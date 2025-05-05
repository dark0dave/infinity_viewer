import { Parser } from "binary-parser";
import { header_parser, resref } from "./common";

const dialogue_header = header_parser()
  .uint32le("count_of_state_tables")
  .uint32le("offset_to_state_table")
  .uint32le("count_of_transitions")
  .uint32le("offset_to_transition_table")
  .uint32le("offset_to_state_trigger_table")
  .uint32le("count_of_state_triggers")
  .uint32le("offset_to_transition_trigger_table")
  .uint32le("count_of_transition_triggers")
  .uint32le("offset_to_action_table")
  .uint32le("count_of_action_tables")
  .array("flags", { type: "uint8", length: 4 });

const state_table = new Parser()
  .uint32le("actor_response_text")
  .int32le("index_of_the_first_transition")
  .uint32le("count_of_transitions")
  .int32le("index_of_state_trigger");

const transition = new Parser()
  .array("flags", { type: "uint8", length: 4 })
  .uint32le("player_character_text")
  .uint32le("journal_text")
  .uint32le("index_of_transitions_trigger")
  .uint32le("index_of_transitions_action_table")
  .nest("resource_name", { type: resref })
  .uint32le("index_of_the_next_state");

const state_trigger = new Parser()
  .int32le("offset_to_start_of_file")
  .int32le("length_in_bytes");

const transition_trigger = new Parser()
  .int32le("offset_to_start_of_file")
  .int32le("length_in_bytes");

const action_table = new Parser()
  .int32le("offset_to_start_of_file")
  .int32le("length_in_bytes");

const parser = dialogue_header
  .array("state_tables", {
    type: state_table,
    length: "count_of_state_tables",
  })
  .array("transitions", {
    type: transition,
    length: "count_of_transitions",
  })
  .array("state_triggers", {
    type: state_trigger,
    length: "count_of_state_triggers",
  })
  .array("transition_triggers", {
    type: transition_trigger,
    length: "count_of_transition_triggers",
  })
  .array("action_tables", {
    type: action_table,
    length: "count_of_action_tables",
  })
  .string("contents", { greedy: true });

export default parser;
