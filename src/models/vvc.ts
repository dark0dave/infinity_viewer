import { header_parser, resref } from "./common";

const parser = header_parser()
  .nest("animation", { type: resref })
  .nest("animation_bam_unused", { type: resref })
  .uint16le("display_flag")
  .uint16le("color_flag")
  .uint32le("unused_1")
  .uint32le("sequence_flags")
  .uint32le("unused_2")
  .uint32le("x_position")
  .uint32le("y_position")
  .uint32le("use_orientation")
  .uint32le("frame_rate")
  .uint32le("number_of_orientations")
  .uint32le("base_orientations")
  .uint32le("travel_orientation")
  .nest("bitmap_palette", { type: resref })
  .int32le("z_offset_position")
  .uint32le("light_spot_width")
  .uint32le("light_spot_height")
  .uint32le("light_spot_brightness")
  .int32le("duration_frames")
  .nest("resource", { type: resref })
  .uint32le("first_bam_sequence_introduction")
  .uint32le("second_bam_sequence_duration")
  .uint32le("current_animation_sequence")
  .uint32le("continuous_sequences_boolean")
  .nest("starting_sound", { type: resref })
  .nest("duration_sound", { type: resref })
  .nest("alpha_blending_animation", { type: resref })
  .uint32le("third_bam_sequence_ending")
  .nest("ending_sound", { type: resref });

export default parser;
