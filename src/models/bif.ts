import { header_parser } from "./common";
import { Parser } from "binary-parser";

const header = header_parser()
  .uint32le("count_of_fileset_entries")
  .uint32le("count_of_tileset_entries")
  .uint32le("offset_to_file_entries");

const fileset_entry = new Parser()
  .uint32le("resource_locator")
  .uint32le("offset")
  .uint32le("size")
  .uint16le("resource_type")
  .uint16le("unknown");

const tileset_entry = new Parser()
  .uint32le("resource_locator")
  .uint32le("offset")
  .uint32le("tile_count")
  .uint32le("tile_size")
  .uint16le("resource_type")
  .uint16le("unknown");

const parser = header
  .array("fileset_entries", {
    type: fileset_entry,
    length: "count_of_fileset_entries",
    offset: "offset_to_file_entries",
  })
  .array("tileset_entries", {
    type: tileset_entry,
    length: "count_of_tileset_entries",
  });

export default parser;
