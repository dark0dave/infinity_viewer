import { header_parser, resref } from "./common";
import { Parser } from "binary-parser";

const header = header_parser()
  .uint16le("language_id")
  .uint32le("number_of_string_entries")
  .uint32le("offset_to_string_data");

const entry = new Parser()
  .uint16le("bit_field")
  .nest("song_name", { type: resref })
  .uint32le("volume_variance")
  .uint32le("pitch_variance")
  .uint32le("offset_to_string")
  .uint32le("length");

const parser = header
  .array("tlk_entries", {
    type: entry,
    length: function () {
      return Math.min(this?.number_of_string_entries, 100);
    },
  })
  .saveOffset("currentOffset")
  .seek(function () {
    return this.offset_to_string_data - this.currentOffset;
  })
  .string("string_data", {
    formatter: function (buffer: Buffer) {
      const newBuffer = [];
      if (buffer) {
        this?.tlk_entries?.forEach((element) => {
          const item = buffer.subarray(
            element.offset_to_string,
            element.offset_to_string + element.length,
          );
          newBuffer.push(item.toString());
        });
      }
      return newBuffer;
    },
    length: function () {
      return (
        this?.tlk_entries?.reduce((a: any, b: any) => a.length + b.length) || 0
      );
    },
  });

export default parser;
