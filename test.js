#! /usr/bin/env node

// "use strict";
import rimraf from "rimraf";

rimraf("./node_modules", function (err) {
  console.log(err);
});
