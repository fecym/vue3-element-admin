import gradient from "gradient-string";
import { getPackageSize } from "./utils.js";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import boxen from "boxen";

dayjs.extend(duration);

const welcomeMessage = gradient(["cyan", "magenta"]).multiline(
  `🚀 项目启动成功！\n一步步迈向目标，尽管前方有挑战，但勇气和坚持会带你穿越艰难险阻！💪\n✨ 每一个努力的瞬间，都会让你更接近成功！\n继续前进吧，开发者！未来由你创造！🌟`
);

const boxenOptions = {
  padding: 0.5,
  borderColor: "cyan",
  borderStyle: "round",
};

export function viteBuildInfo() {
  let config;
  let startTime;
  let endTime;
  let outDir;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = resolvedConfig.build?.outDir ?? "dist";
    },
    buildStart() {
      if (config.command === "build") {
        startTime = dayjs(new Date());
      } else {
        console.log(boxen(welcomeMessage, boxenOptions));
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(new Date());
        getPackageSize({
          folder: outDir,
          callback: size => {
            console.log(
              boxen(
                gradient(["cyan", "magenta"]).multiline(
                  `🎉 打包完成（总用时${dayjs
                    .duration(endTime.diff(startTime))
                    .format("mm分ss秒")}，打包后的大小为${size}）`
                ),
                boxenOptions
              )
            );
          },
        });
      }
    },
  };
}
