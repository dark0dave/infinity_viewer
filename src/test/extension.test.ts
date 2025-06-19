import factory from "../models/factory";
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";

suite("Extension Test Suite", () => {
  const root: string = process.env.ROOT || ".";

  [
    "ar0002.are",
    "bamc.bam",
    "cutmelis.cre",
    "finbodh.CRE",
    "gate1.spl",
    "geniedam.eff",
    "kit.bam",
    "mazzy.dlg",
    "ohbconco.sto",
    "p_fireta.vvc",
    "ring.bam",
    "sw1h01.itm",
    "zbpdnote.itm",
    "zs_sdshd.dlg",
    "ZSIPCKAA.ITM",
    "ZSIPTR02.EFF",
  ].forEach((file) => {
    test(`Test: ${file}`, () => {
      const expected = JSON.stringify(
        JSON.parse(
          fs
            .readFileSync(
              path.normalize(`${root}/fixtures/${file}.json`),
              "utf8",
            )
            .trim(),
        ),
      );
      assert.strictEqual(
        JSON.stringify(factory(`${root}/fixtures/${file}`)),
        expected,
      );
    });
  });
});
