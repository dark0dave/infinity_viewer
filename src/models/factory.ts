import { parser as cre_parser } from "./cre";
import fs from "fs";

const model_factory = (name: String): any => {
  switch (name) {
    case "cre":
      return cre_parser;
    default:
      console.log("Not Supported");
      return;
  }
};

const getFileBuffer = (path: fs.PathLike) => {
  return fs.readFileSync(path);
};

const factory = (path: fs.PathLike) => {
  const buffer = getFileBuffer(path);
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
