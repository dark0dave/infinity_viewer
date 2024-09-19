import * as assert from "assert";
import are_parser from "../models/are";
import bam_parser from "../models/bam";
import cre_parser from "../models/cre";
import eff_parser from "../models/eff";
import itm_parser from "../models/itm";
import spl_parser from "../models/spl";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  const root: string = process.env.ROOT || ".";

  const are_file = fs.readFileSync(
    path.normalize(`${root}/fixtures/ar0002.are`),
  );
  const are_file_json = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/ar0002.are.json`), "utf8")
      .trim(),
  );

  const bam_v1_file = fs.readFileSync(
    path.normalize(`${root}/fixtures/kit.bam`),
  );
  const bam_v1_json_file = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/kit.bam.json`), "utf8")
      .trim(),
  );

  const bam_v2_file = fs.readFileSync(
    path.normalize(`${root}/fixtures/ring.bam`),
  );
  const bam_v2_json_file = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/ring.bam.json`), "utf8")
      .trim(),
  );

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

  const eff_file = fs.readFileSync(
    path.normalize(`${root}/fixtures/geniedam.eff`),
  );
  const eff_file_json = JSON.parse(
    fs
      .readFileSync(
        path.normalize(`${root}/fixtures/geniedam.eff.json`),
        "utf8",
      )
      .trim(),
  );

  const itm_file = fs.readFileSync(
    path.normalize(`${root}/fixtures/sw1h01.itm`),
  );
  const itm_file_json = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/sw1h01.itm.json`), "utf8")
      .trim(),
  );

  const spl_file = fs.readFileSync(
    path.normalize(`${root}/fixtures/gate1.spl`),
  );
  const spl_file_json = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/gate1.spl.json`), "utf8")
      .trim(),
  );

  test("Area Tests", () => {
    assert.strictEqual(
      JSON.stringify(are_parser.parse(are_file)),
      JSON.stringify(are_file_json),
    );
  });

  test("Bam Tests", () => {
    assert.strictEqual(
      JSON.stringify(bam_parser.parse(bam_v1_file)),
      JSON.stringify(bam_v1_json_file),
    );
    assert.strictEqual(
      JSON.stringify(bam_parser.parse(bam_v2_file)),
      JSON.stringify(bam_v2_json_file),
    );
  });

  test("Creature Tests", () => {
    assert.strictEqual(
      JSON.stringify(cre_parser.parse(cre_file)),
      JSON.stringify(cre_file_json),
    );
  });

  test("Effect Tests", () => {
    assert.strictEqual(
      JSON.stringify(eff_parser.parse(eff_file)),
      JSON.stringify(eff_file_json),
    );
  });

  test("Item Tests", () => {
    assert.strictEqual(
      JSON.stringify(itm_parser.parse(itm_file)),
      JSON.stringify(itm_file_json),
    );
  });

  test("Spell Tests", () => {
    assert.strictEqual(
      JSON.stringify(spl_parser.parse(spl_file)),
      JSON.stringify(spl_file_json),
    );
  });
});
