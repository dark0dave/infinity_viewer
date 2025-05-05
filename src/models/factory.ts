import are_parser from "./are";
import bam_parser from "./bam";
import bif_parser from "./bif";
import cre_parser from "./cre";
import dlg_parser from "./dlg";
import eff_parser from "./eff";
import itm_parser from "./itm";
import key_parser from "./key";
import sto_parser from "./sto";
import spl_parser from "./spl";
import tlk_parser from "./tlk";
import vvc_parser from "./vvc";
import fs from "fs";
import path from "path";
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
    case "dlg":
      return dlg_parser;
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
    case "vvc":
      return vvc_parser;
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

const factory = (file_path: fs.PathLike): Object => {
  const buffer = getFileContents(file_path);
  const extension = path.extname(file_path.toString());
  try {
    const parser = model_factory(extension);
    return parser.parse(buffer);
  } catch (e) {
    console.error(`Failed to parse ${file_path} with ${JSON.stringify(e)}`);
    return {
      error: "failed to parse file",
      file_contents: buffer.toJSON(),
    };
  }
};

export default factory;
