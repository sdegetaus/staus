//
// ¯\_(ツ)_/¯
//

// NO IDEA WHY THIS IS NOT WORKING

// import fs from "fs";
// import path from "path";
// import build from "../build";
// import configUtil from "../utils/config-util";
// import fsUtil from "../utils/fs-util";

// let fsWait = false;
// let finished = false;

// fs.watch(
//   path.resolve(fsUtil.getRootPath(), "./src"),
//   {
//     recursive: true,
//   },
//   (event, filename) => {
//     if (filename && event === "change") {
//       if (fsWait) {
//         return;
//       }
//       fsWait = !!setTimeout(() => {
//         fsWait = false;
//       }, 100);
//       finished = false;
//       configUtil
//         .getConfig()
//         .then((CONFIG) => {
//           build(CONFIG)
//             .then(() => {
//               console.log("fullfilled");
//               finished = true;
//             })
//             .catch((e) => {
//               throw e;
//             });
//         })
//         .catch((e) => {
//           throw e;
//         });
//     }
//   }
// );
