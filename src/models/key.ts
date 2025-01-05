import { header_parser, resref } from "./common";
import { Parser } from "binary-parser";

const key_header = header_parser()
  .uint32le("count_of_bif_entries")
  .uint32le("count_of_resource_entries")
  .uint32le("index_to_bif_entries")
  .uint32le("index_to_Resource_entries");

const key_bif_entries = new Parser()
  .uint32le("length_of_bif_file")
  .uint32le("offset_to_start_of_file")
  .uint16le("length")
  .uint16le("location");

const key_resource_entries = new Parser()
  .nest("resource_name", {
    type: resref,
  })
  .uint16le("resource_type")
  .uint32le("resource_locator");

const parser = key_header
  .array("key_bif_entries", {
    type: key_bif_entries,
    length: "count_of_bif_entries",
    offset: "index_to_bif_entries",
  })
  .array("key_resource_entries", {
    type: key_resource_entries,
    length: "count_of_resource_entries",
    offset: "index_to_resource_entries",
  });

export default parser;
