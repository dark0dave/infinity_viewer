import are_parser from "./are";
import bam_parser from "./bam";
import bif_parser from "./bif";
import cre_parser from "./cre";
import eff_parser from "./eff";
import itm_parser from "./itm";
import key_parser from "./key";
import sto_parser from "./sto";
import spl_parser from "./spl";
import tlk_parser from "./tlk";
import fs from "fs";
import { Parser } from "binary-parser";

const model_factory = (extension: String): Parser => {
  switch (extension) {
    case "are":
      return are_parser;
    case "bam":
      return bam_parser;
    case "bif":
      return bif_parser;
    case "cre":
      return cre_parser;
    case "eff":
      return eff_parser;
    case "itm":
      return itm_parser;
    case "key":
      return key_parser;
    case "sto":
      return sto_parser;
    case "spl":
      return spl_parser;
    case "tlk":
      return tlk_parser;
    default:
      throw "Not Supported";
  }
};

const getFileContents = (path: fs.PathLike): Buffer => {
  try {
    return fs.readFileSync(path, { encoding: null });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const factory = (path: fs.PathLike): String => {
  const buffer = getFileContents(path);
  const extension = path
    .toString()
    .toLowerCase()
    .substring(path.toString().lastIndexOf(".") + 1, path.toString().length);
  const parser = model_factory(extension);
  try {
    return parser.parse(buffer);
  } catch (e) {
    console.error(`Failed to parse ${path} with ${JSON.stringify(e)}`);
    throw e;
  }
};

export default factory;
