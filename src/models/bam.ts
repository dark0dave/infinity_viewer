import header_parser from "./header";
import { Parser } from "binary-parser";
import zlib from "zlib";

const BAM_SIGNATURE = [66, 65, 77, 32];
const BAMC_SIGNATURE = [66, 65, 77, 67];
const VERSION1 = [86, 49, 32, 32];
const VERSION2 = [86, 50, 32, 32];
const BAMV1 = Buffer.from(BAM_SIGNATURE.concat(VERSION1));
const BAMV2 = Buffer.from(BAM_SIGNATURE.concat(VERSION2));
const BAMCV1 = Buffer.from(BAMC_SIGNATURE.concat(VERSION2));

// Bam  v1 -> 1
// Bam  v2 -> 2
// Bamc v1 -> 3
const type_parser = new Parser().uint8("bam_version");

const cycle_entry = new Parser()
  .uint16le("count_of_frame_indices")
  .uint16le("index_into_frame_lookup_table");

// BAM V1

const bam_v1_header = new Parser()
  .uint16le("count_of_frame_entries")
  .int8("count_of_cycles")
  .int8("compressed_color_index")
  .uint32le("offset_to_frame_entries")
  .uint32le("offset_to_palette")
  .uint32le("offset_to_lookup_table");

const bam_v1_frame_entry = new Parser()
  .uint16le("frame_width")
  .uint16le("frame_hieght")
  .int16le("frame_center_x_coordinate")
  .int16le("frame_center_y_coordinate")
  .uint32le("offset_to_frame_data");

const bam_v1_parser = bam_v1_header
  .array("frame_entries", {
    length: "count_of_frame_entries",
    type: bam_v1_frame_entry,
  })
  .array("cycle_entries", {
    length: "count_of_cycles",
    type: cycle_entry,
  })
  .array("bam_v1_palette", {
    type: "uint8",
    length: function () {
      return this.offset_to_lookup_table - this.offset_to_palette;
    },
  })
  .array("bam_v1_lookup_table", {
    type: "uint8",
    offset: "offset_to_lookup_table",
    readUntil: "eof",
  });

// BAM V2

const bam_v2_header = new Parser()
  .uint32le("count_of_frame_entries")
  .uint32le("count_of_cycle_entries")
  .uint32le("count_of_data_blocks")
  .uint32le("offset_to_frame_entries")
  .uint32le("offset_to_cycle_entries")
  .uint32le("offset_to_data_blocks");

const bam_v2_frame_entry = new Parser()
  .uint16le("frame_width")
  .uint16le("frame_hieght")
  .int8("frame_center_x_coordinate")
  .int8("frame_center_y_coordinate")
  .int8("compressed_color_index")
  .uint32le("offset_to_frame_data");

const bam_v2_data_block = new Parser()
  .uint32le("pvrz_page")
  .uint32le("source_x_coordinate")
  .uint32le("source_y_coordinate")
  .uint32le("width")
  .uint32le("height")
  .uint32le("target_x_coordinate")
  .uint32le("target_y_coordinate");

const bam_v2_parser = bam_v2_header
  .array("frame_entries", {
    length: "count_of_frame_entries",
    type: bam_v2_frame_entry,
  })
  .array("cycle_entries", {
    length: "count_of_cycle_entries",
    type: cycle_entry,
  })
  .array("data_blocks", {
    length: "count_of_data_blocks",
    type: bam_v2_data_block,
  });

// BAMC

const bamc_parser = new Parser()
  .uint32le("uncompressed_data_length")
  .array("compressed_data", {
    type: "uint8",
    readUntil: "eof",
    formatter: (buffer: any) => {
      return zlib.inflateRawSync(buffer);
    },
  });

const parser = header_parser()
  .seek(-8)
  .wrapped({
    wrapper: (buffer) => {
      if (buffer.equals(BAMV1)) {
        return Buffer.from([1]);
      }
      if (buffer.equals(BAMV2)) {
        return Buffer.from([2]);
      }
      if (buffer.equals(BAMCV1)) {
        return Buffer.from([3]);
      }
      return Buffer.from([0]);
    },
    length: 8,
    type: type_parser,
  })
  .choice({
    tag: "bam_version",
    choices: {
      0: null,
      1: bam_v1_parser,
      2: bam_v2_parser,
      3: bamc_parser,
    },
  });

export default parser;
