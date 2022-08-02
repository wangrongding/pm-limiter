#! /usr/bin/env node

// "use strict";
import boxen from "boxen";
import chalk from "chalk";
import rimraf from "rimraf";
import fs from "fs";

// npminstall:cnpm | npm | yarn | pnpm

const specifiedPM = process.env.npm_config_user_agent
  ? process.env.npm_config_user_agent.split("/")[0]
  : null;

if (process.argv.length < 3) {
  console.log(
    boxen(
      `${chalk.bold.red(
        "请在scripts中设置你要限制的包管理器: "
      )}"preinstall":"npx pm-limiter [npm|yarn|...]"`,
      {
        title: "Error!",
        titleAlignment: "center",
        borderColor: "red",
        borderStyle: "arrow",
        padding: 1,
      }
    )
  );
  process.exit(1);
}

if (specifiedPM != process.argv[2]) {
  isExistThanRemove("./node_modules");
  removeGarbage(specifiedPM);
  console.log(
    boxen(
      `您正在使用 ${chalk.bold.red(
        specifiedPM == "npminstall" ? "cnpm" : specifiedPM
      )} 安装依赖!\n在该项目中,您只能用 ${chalk.bold.green(
        process.argv[2]
      )} 的命令来安装依赖!`,
      {
        title: "Error!",
        titleAlignment: "center",
        borderColor: "red",
        borderStyle: "arrow",
        padding: 1,
      }
    )
  );
  process.exit(1);
}

function removeGarbage(specifiedPM) {
  specifiedPM = "pnpm";
  switch (specifiedPM) {
    case "npminstall":
      isExistThanRemove("./pnpm-lock.yaml");
      isExistThanRemove("./yarn.lock");
      break;
    case "npm":
      isExistThanRemove("./pnpm-lock.yaml");
      isExistThanRemove("./yarn.lock");
      break;
    case "yarn":
      isExistThanRemove("./package-lock.json");
      isExistThanRemove("./pnpm-lock.yaml");
      break;
    case "pnpm":
      isExistThanRemove("./package-lock.json");
      isExistThanRemove("./yarn.lock");
      break;
    default:
      break;
  }
}

function isExistThanRemove(path) {
  try {
    if (fs.existsSync(path)) {
      rimraf(path, function (err) {});
      return true;
    }
  } catch (err) {
    // console.log("🚀🚀🚀 / err", err);
  }
  // console.log("🚀🚀🚀 / true", path, "不存在");
  return false;
}
