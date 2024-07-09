import { Parser } from "binary-parser";

const header_parser = () =>
  new Parser()
    .endianness("little")
    .string("signature", { length: 4, stripNull: true })
    .string("version", { length: 4, stripNull: true });

export default header_parser;
