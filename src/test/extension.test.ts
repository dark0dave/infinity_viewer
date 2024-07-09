import * as assert from "assert";
import cre_parser from "../models/cre";
import * as fs from "fs";
import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  const cre_file = fs.readFileSync("./fixtures/cutmelis.cre");
  const cre_file_json = JSON.parse(
    fs.readFileSync("./fixtures/cutmelis.cre.json", "utf8").trim(),
  );

  test("Creature Tests", () => {
    assert.strictEqual(
      JSON.stringify(cre_parser.parse(cre_file)),
      JSON.stringify(cre_file_json),
    );
  });
});
