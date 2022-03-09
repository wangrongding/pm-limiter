#! /usr/bin/env node

// "use strict";
import boxen from "boxen";
import chalk from "chalk";

// npminstall:cnpm | npm | yarn | pnpm

const usedPM = process.env.npm_config_user_agent
  ? process.env.npm_config_user_agent.split("/")[0]
  : null;

// console.log("🚀正在是用的包管理工具:", usedPM);
// console.log("🚀🚀🚀 / process.argv", process.argv, process.argv.length);
if (process.argv.length < 3) {
  console.log(
    boxen(
      `${chalk.bold.red(
        "请在scripts中设置你要限制的包管理器: "
      )}"preinstall":"npx npm-limit [npm|yarn|...]"`,
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
if (usedPM != process.argv[2]) {
  console.log(
    boxen(
      `您正在使用 ${chalk.bold.red(
        usedPM == "npminstall" ? "cnpm" : usedPM
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
