import * as assert from "assert";
import cre_parser from "../models/cre";
import are_parser from "../models/are";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  const root: string = process.env.ROOT || ".";

  const cre_file = fs.readFileSync(
    path.normalize(`${root}/fixtures/cutmelis.cre`),
  );
  const cre_file_json = JSON.parse(
    fs
      .readFileSync(
        path.normalize(`${root}/fixtures/cutmelis.cre.json`),
        "utf8",
      )
      .trim(),
  );

  const are_file = fs.readFileSync(
    path.normalize(`${root}/fixtures/ar0002.are`),
  );
  const are_file_json = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/ar0002.are.json`), "utf8")
      .trim(),
  );

  test("Creature Tests", () => {
    assert.strictEqual(
      JSON.stringify(cre_parser.parse(cre_file)),
      JSON.stringify(cre_file_json),
    );
  });

  test("Area Tests", () => {
    assert.strictEqual(
      JSON.stringify(are_parser.parse(are_file)),
      JSON.stringify(are_file_json),
    );
  });
});
