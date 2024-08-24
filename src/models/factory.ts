import cre_parser from "./cre";
import itm_parser from "./itm";
import are_parser from "./are";
import fs from "fs";
import { Parser } from "binary-parser";

const model_factory = (extension: String): Parser => {
  switch (extension) {
    case "cre":
      return cre_parser;
    case "itm":
      return itm_parser;
    case "are":
      return are_parser;
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
  return parser.parse(buffer);
};

export default factory;
