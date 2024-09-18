import { Parser } from "binary-parser";

const header_parser = () =>
  new Parser()
    .endianness("little")
    .string("signature", {
      length: 4,
      stripNull: true,
      formatter: (sig: string) => {
        return sig.replaceAll(" ", "");
      },
    })
    .string("version", {
      length: 4,
      stripNull: true,
      formatter: (version: string) => {
        return version.replaceAll(" ", "");
      },
    });

export default header_parser;
