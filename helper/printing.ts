import Policy from "@models/policy.model";
import { InsurancePolicy, PolicyTypes, DynamicField } from "@typedefs/policy";
import Jimp from "jimp";
import fs from "fs/promises"; // Import the fs module
import path from "path";
const moment = require("moment");
let now = moment();
export const getPolicy = async (policyId: string) => {
  try {
    const policy: InsurancePolicy = (await Policy.findById(policyId)) as any;
    console.log("policy: ", policy);
    const filename = `${policyId}-soa.png`;
    // Get the directory of the current module's file
    const currentDir = path.resolve(__dirname, "../../../../helper");
    // Generate the full image path using path.join
    const imagePath = path.join(currentDir, "images", "layout.png"); // Adjust the path as needed
    // Read the image using fs
    const imageBuffer = await fs.readFile(imagePath);
    const jimpImage = await Jimp.read(imageBuffer);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    const font_insurer = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    const dateToday = moment(new Date());
    console.log(dateToday);
    jimpImage.background(0x00000000);
    jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, function (x, y, idx) {
      this.bitmap.data[idx + 3] = 0;
    });
    jimpImage.print(font_insurer, 1000, 980, policy.assured);
    jimpImage.print(font_insurer, 905, 1100, policy.mailingAddress);
    jimpImage.print(font_insurer, 4900, 1400, policy.soaNo);
    jimpImage.print(font_insurer, 1000, 1400, policy.insurer);
    jimpImage.print(font_insurer, 3500, 1400, policy.line);
    jimpImage.print(font_insurer, 4600, 1100, now.format("ll"));
    const dynamicPolicy: [DynamicField] = policyBuilder(policy);
    console.log("dynamicPolicy: ", dynamicPolicy);
    const imagePathResult = path.join(process.cwd(), "public", "static", "images", "printing", filename);
    // 1433,2113
    let headerStartX = 1433;
    let headerStartY = 2113;
    //3252,2161
    let particularX = 3252;
    let particularY = 2113;
    // 4891,2119
    let premiumX = 4891;
    let premiumY = 2113;
    let totalPremium = 0;
    let totalParticular = 0;
    dynamicPolicy.map((e: DynamicField) => {
      console.log("e.premium", parseFloat(e.premium));
      totalPremium = totalPremium + parseFloat(e.premium.replaceAll(",", ""));
      console.log("e.particular", parseFloat(e.particular));
      totalParticular = totalParticular + parseFloat(e.particular.replaceAll(",", ""));
    });

    for (let entries of dynamicPolicy) {
      const { particularHeaderName, particular, premium } = entries;
      jimpImage.print(font, headerStartX, headerStartY, particularHeaderName);
      jimpImage.print(font, particularX, particularY, particular);
      jimpImage.print(font, premiumX, premiumY, premium);
      headerStartY += 80;
      particularY += 80;
      premiumY += 80;
    }
    let textLine = "__________";
    particularY -= 60;
    jimpImage.print(font, particularX, particularY, textLine);
    particularY += 90;
    jimpImage.print(font, particularX, particularY, String(totalParticular));
    premiumY -= 60;
    jimpImage.print(font, premiumX, premiumY, textLine);
    premiumY += 90;
    jimpImage.print(font, premiumX, premiumY, String(totalPremium));
    jimpImage.resize(1056, 816, Jimp.RESIZE_BEZIER);
    const buffAsync = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
    await fs.writeFile(imagePathResult, buffAsync);
    return filename;
  } catch (e) {
    console.log("error in printing", e);
  }
};

const policyBuilder = (defaultData: InsurancePolicy) => {
  const { type: policyType } = defaultData;
  if (policyType !== PolicyTypes.MOTOR) {
    return defaultData[policyType?.toLowerCase() as keyof InsurancePolicy] as any;
  } else {
    return [];
  }
};
