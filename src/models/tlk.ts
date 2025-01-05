import { header_parser, resref } from "./common";
import { Parser } from "binary-parser";

const tlk_header = header_parser()
  .uint16le("language_id")
  .uint32le("number_of_string_entries")
  .uint32le("offset_to_string_data");

const tlk_entry = new Parser()
  .uint16le("bit_field")
  .nest("song_name", { type: resref })
  .uint32le("volume_variance")
  .uint32le("pitch_variance")
  .uint32le("offset_to_string")
  .uint32le("length");

const parser = tlk_header
  .array("tlk_entries", {
    type: tlk_entry,
    length: 100,
  })
  .saveOffset("currentOffset")
  .seek(function () {
    return this.offset_to_string_data - this.currentOffset;
  })
  .buffer("string_data", {
    formatter: function (buffer: Buffer) {
      const newBuffer = [];
      this?.tlk_entries?.forEach((element) => {
        const item = buffer.subarray(
          element.offset_to_string,
          element.offset_to_string + element.length,
        );
        newBuffer.push(item.toString());
      });
      return newBuffer;
    },
    length: "number_of_string_entries",
  });

export default parser;
