import { header_parser, resref } from "./common";
import { Parser } from "binary-parser";

const header = header_parser()
  .uint32le("count_of_bif_entries")
  .uint32le("count_of_resource_entries")
  .uint32le("index_to_bif_entries")
  .uint32le("index_to_resource_entries");

const bif_entry = new Parser()
  .uint32le("length_of_bif_file")
  .uint32le("offset_to_start_of_file")
  .uint16le("length")
  .uint16le("location");

const resource_entry = new Parser()
  .nest("resource_name", {
    type: resref,
  })
  .uint16le("resource_type")
  .uint32le("resource_locator");

const parser = header
  .array("bif_entries", {
    type: bif_entry,
    length: "count_of_bif_entries",
  })
  .string("string_data", {
    formatter: function (buffer: any) {
      return buffer.split("\u0000").filter((x: any) => x);
    },
    length: function (_item: any) {
      return (
        this?.index_to_resource_entries -
        (this?.index_to_bif_entries + this?.count_of_bif_entries * 12)
      );
    },
  })
  .array("resource_entries", {
    type: resource_entry,
    length: "count_of_resource_entries",
  });

export default parser;
