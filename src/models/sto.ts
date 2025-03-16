import { header_parser, resref } from "./common";
import { Parser } from "binary-parser";

const header = header_parser()
  .int32le("type")
  .int32le("name")
  .array("flags", {
    type: "uint8",
    length: 4,
  })
  .int32le("sell_price_markup")
  .int32le("buy_price_markup")
  .int32le("depreciation_rate")
  .int16le("percentage_chance_steal_failure")
  .int16le("capacity")
  .array("unknown", {
    type: "uint8",
    length: 8,
  })
  .int32le("offset_to_items_purchased")
  .int32le("count_of_items_purchased")
  .int32le("offset_to_items_for_sale")
  .int32le("count_of_items_for_sale")
  .int32le("lore")
  .int32le("id_price")
  .nest("rumours_tavern", { type: resref })
  .int32le("offset_to_drinks")
  .int32le("count_of_drinks")
  .nest("rumours_temple", { type: resref })
  .array("room_flags", {
    type: "uint8",
    length: 4,
  })
  .int32le("price_of_a_peasant_room")
  .int32le("price_of_a_merchant_room")
  .int32le("price_of_a_noble_room")
  .int32le("price_of_a_royal_room")
  .int32le("offset_to_cures")
  .int32le("count_of_cures")
  .array("unused", {
    type: "uint8",
    length: 36,
  });

const items_for_sale = new Parser()
  .nest("filename", { type: resref })
  .int16le("item_expiration_time")
  .int16le("charges_1")
  .int16le("charges_2")
  .int16le("charges_3")
  .int32le("flags")
  .int32le("amount")
  .int32le("infinite_supply_flag");

const drinks = new Parser()
  .nest("rumour_resource", { type: resref })
  .int32le("name")
  .int32le("price")
  .int32le("alocholic_strength");

const cures = new Parser()
  .nest("filename_of_spl", { type: resref })
  .int32le("spell_price");

const parser = header
  .array("items_purchased", {
    type: "int32le",
    length: "count_of_items_purchased",
  })
  .array("items_for_sale", {
    type: items_for_sale,
    length: "count_of_items_for_sale",
    offset: "offset_to_items_for_sale",
  })
  .array("drinks", {
    type: drinks,
    length: "count_of_drinks",
  })
  .array("cures", {
    type: cures,
    length: "count_of_cures",
  });
export default parser;
