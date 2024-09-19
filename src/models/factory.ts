import are_parser from "./are";
import bam_parser from "./bam";
import cre_parser from "./cre";
import itm_parser from "./itm";
import spl_parser from "./spl";
import fs from "fs";
import { Parser } from "binary-parser";

const model_factory = (extension: String): Parser => {
  switch (extension) {
    case "are":
      return are_parser;
    case "bam":
      return bam_parser;
    case "cre":
      return cre_parser;
    case "itm":
      return itm_parser;
    case "spl":
      return spl_parser;
    default:
      throw "Not Supported";
  }
};

const getFileContents = (path: fs.PathLike): Buffer => {
  try {
    return fs.readFileSync(path, { encoding: null });
  } catch (e) {
    console.log(e);
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
