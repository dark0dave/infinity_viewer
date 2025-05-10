import factory from "../models/factory";
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";

suite("Extension Test Suite", () => {
  const root: string = process.env.ROOT || ".";

  const are_file_json = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/ar0002.are.json`), "utf8")
      .trim(),
  );

  const cre_file_json = JSON.parse(
    fs
      .readFileSync(
        path.normalize(`${root}/fixtures/cutmelis.cre.json`),
        "utf8",
      )
      .trim(),
  );

  const eff_file_json = JSON.parse(
    fs
      .readFileSync(
        path.normalize(`${root}/fixtures/geniedam.eff.json`),
        "utf8",
      )
      .trim(),
  );

  const itm_file_json = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/sw1h01.itm.json`), "utf8")
      .trim(),
  );

  const spl_file_json = JSON.parse(
    fs
      .readFileSync(path.normalize(`${root}/fixtures/gate1.spl.json`), "utf8")
      .trim(),
  );

  const sto_file_json = JSON.parse(
    fs
      .readFileSync(
        path.normalize(`${root}/fixtures/ohbconco.sto.json`),
        "utf8",
      )
      .trim(),
  );

  const vvc_file_json = JSON.parse(
    fs
      .readFileSync(
        path.normalize(`${root}/fixtures/p_fireta.vvc.json`),
        "utf8",
      )
      .trim(),
  );

  test("Area Tests", () => {
    assert.strictEqual(
      JSON.stringify(factory(path.normalize(`${root}/fixtures/ar0002.are`))),
      JSON.stringify(are_file_json),
    );
  });

  ["bamc", "kit", "ring"].forEach((file) => {
    test(`Bam Test: ${file}`, () => {
      const expected = JSON.stringify(
        JSON.parse(
          fs
            .readFileSync(
              path.normalize(`${root}/fixtures/${file}.bam.json`),
              "utf8",
            )
            .trim(),
        ),
      );
      assert.strictEqual(
        JSON.stringify(factory(path.normalize(`${root}/fixtures/${file}.bam`))),
        expected,
      );
    });
  });

  test("Creature Tests", () => {
    assert.strictEqual(
      JSON.stringify(factory(path.normalize(`${root}/fixtures/cutmelis.cre`))),
      JSON.stringify(cre_file_json),
    );
  });

  ["mazzy", "zs_sdshd"].forEach((file) => {
    test(`Dialogue Test: ${file}`, () => {
      const expected = JSON.stringify(
        JSON.parse(
          fs
            .readFileSync(
              path.normalize(`${root}/fixtures/${file}.dlg.json`),
              "utf8",
            )
            .trim(),
        ),
      );
      assert.strictEqual(
        JSON.stringify(factory(path.normalize(`${root}/fixtures/${file}.dlg`))),
        expected,
      );
    });
  });

  test("Effect Tests", () => {
    assert.strictEqual(
      JSON.stringify(factory(path.normalize(`${root}/fixtures/geniedam.eff`))),
      JSON.stringify(eff_file_json),
    );
  });

  test("Item Tests", () => {
    assert.strictEqual(
      JSON.stringify(factory(path.normalize(`${root}/fixtures/sw1h01.itm`))),
      JSON.stringify(itm_file_json),
    );
  });

  test("Spell Tests", () => {
    assert.strictEqual(
      JSON.stringify(factory(path.normalize(`${root}/fixtures/gate1.spl`))),
      JSON.stringify(spl_file_json),
    );
  });

  test("Store Tests", () => {
    assert.strictEqual(
      JSON.stringify(factory(path.normalize(`${root}/fixtures/ohbconco.sto`))),
      JSON.stringify(sto_file_json),
    );
  });

  test("VVC Tests", () => {
    assert.strictEqual(
      JSON.stringify(factory(path.normalize(`${root}/fixtures/p_fireta.vvc`))),
      JSON.stringify(vvc_file_json),
    );
  });
});
