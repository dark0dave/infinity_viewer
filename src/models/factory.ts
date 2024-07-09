import cre_parser from "./cre";
import itm_parser from "./itm";
import fs from "fs";
import { Parser } from "binary-parser";

const model_factory = (extension: String): Parser => {
  switch (extension) {
    case "cre":
      return cre_parser;
    case "itm":
      return itm_parser;
    default:
      throw "Not Supported";
  }
};

const factory = (path: fs.PathLike): String => {
  const buffer = fs.readFileSync(path);
  const extension =
    path
      .toString()
      .substring(
        path.toString().lastIndexOf(".") + 1,
        path.toString().length,
      ) || path.toString();
  const parser = model_factory(extension);
  return parser.parse(buffer);
};

export default factory;
