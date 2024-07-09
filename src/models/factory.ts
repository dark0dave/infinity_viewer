import cre_parser from "./cre";
import fs from "fs";

const model_factory = (name: String) => {
  switch (name) {
    case "cre":
      return cre_parser;
    default:
      console.log("Not Supported");
      return;
  }
};

const factory = (path: fs.PathLike) => {
  const buffer = fs.accessSync(path);
  const extention =
    path
      .toString()
      .substring(
        path.toString().lastIndexOf(".") + 1,
        path.toString().length,
      ) || path.toString();
  const parser = model_factory(extention);
  return parser(buffer);
};

export default factory;
