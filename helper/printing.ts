import Policy from "@models/policy.model";
import { InsurancePolicy, PolicyTypes, DynamicField, MotorLabels } from "@typedefs/policy";
import Jimp from "jimp";
import fs from "fs/promises"; // Import the fs module
import path from "path";
const moment = require("moment");
let now = moment();
export const getPolicy = async (policyId: string) => {
  try {
    const policy: InsurancePolicy = (await Policy.findById(policyId)) as any;
    // console.log("policy: ", policy);
    const filename = `${policyId}-soa.png`;
    // Get the directory of the current module's file
    const currentDir = path.resolve(__dirname, "../../../../helper");
    // Generate the full image path using path.join
    const imagePath = path.join(currentDir, "images", "layout.png"); // Adjust the path as needed
    // Read the image using fs
    const imageBuffer = await fs.readFile(imagePath);
    const jimpImage = await Jimp.read(imageBuffer);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_10_BLACK);
    const font_insurer = await Jimp.loadFont(Jimp.FONT_SANS_10_BLACK);
    const dateToday = moment(new Date());
    console.log(dateToday);
    jimpImage.background(0x00000000);
    // jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, function (x, y, idx) {
    //   this.bitmap.data[idx + 3] = 0;
    // });
    jimpImage.print(
      font_insurer,
      70,
      420,
      policy.inception.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) ?? ""
    );
    jimpImage.print(
      font_insurer,
      170,
      420,
      policy.expiry.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) ?? ""
    );
    //BASIC INFO
    jimpImage.print(font_insurer, 250, 200, policy.assured);
    jimpImage.print(font_insurer, 250, 220, policy.mailingAddress);
    jimpImage.print(font_insurer, 70, 280, policy.insurer);
    jimpImage.print(font_insurer, 800, 280, policy.line);
    jimpImage.print(font_insurer, 1000, 280, policy.soaNo);
    jimpImage.print(font_insurer, 950, 220, now.format("ll"));
    jimpImage.print(font_insurer, 800, 810, "ADRIAN MOGUL");

    // console.log("dynamicPolicy: ", dynamicPolicy);
    const imagePathResult = path.join(process.cwd(), "public", "static", "images", "printing", filename);
    //PARTICULARS
    // 1433,2113
    let headerStartX = 300;
    let headerStartY = 420;
    //3252,2161
    let particularX = 750;
    let particularY = 420;
    // 4891,2119
    let premiumX = 1000;
    let premiumY = 420;
    let totalPremium = 0;
    let totalParticular = 0;
    let textLine = "__________";
    const dynamicPolicy: any = policyBuilder(policy);
    if (policy.type !== PolicyTypes.MOTOR) {
      // console.log("Policy Type: ", policy.type);
      dynamicPolicy.map((e: DynamicField) => {
        // console.log("e.premium", parseFloat(e.premium));
        totalPremium = totalPremium + parseFloat(e.premium.replaceAll(",", ""));
        // console.log("e.particular", parseFloat(e.particular));
        totalParticular = totalParticular + parseFloat(e.particular.replaceAll(",", ""));
      });
      //DYNAMIC POLILCY
      for (let entries of dynamicPolicy) {
        const { particularHeaderName, particular, premium } = entries;
        jimpImage.print(font, headerStartX, headerStartY, particularHeaderName);
        jimpImage.print(font, particularX, particularY, { text: particular, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
        jimpImage.print(font, premiumX, premiumY, { text: premium, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
        headerStartY += 20;
        particularY += 20;
        premiumY += 20;
      }
      //TOTALS
      particularY -= 20;
      jimpImage.print(font, particularX, particularY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularY += 20;
      jimpImage.print(font, particularX, particularY, { text: String(totalParticular), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      premiumY -= 20;
      jimpImage.print(font, premiumX, premiumY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      premiumY += 20;
      jimpImage.print(font, premiumX, premiumY, { text: String(totalPremium), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
    } else {
      var selectedKeys = ["od", "theft", "vbi", "vpd", "autoPa", "aog", "vat", "govtTax"];
      var selectedKeysValues = ["odP", "theftP", "vbiP", "vpdP", "autoPaP", "aogP"];
      for (const [key, value] of Object.entries(dynamicPolicy._doc)) {
        //console.log(`${key}: ${value}`);
        if (selectedKeys.includes(key)) {
          const selectedValue = dynamicPolicy._doc[key];
          console.log(`${key}: ${selectedValue}`);
          if (MotorLabels[key as keyof typeof MotorLabels] ? true : false) {
            jimpImage.print(font, particularX, particularY, { text: MotorLabels[key as keyof typeof MotorLabels], alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
            particularY += 10;
          }
        }
      }
      jimpImage.print(font, headerStartX, headerStartY, { text: policy?.motor?.modelMakeRisk ?? "", alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      jimpImage.print(font, particularX, particularY, { text: policy?.motor?.od ?? "", alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      jimpImage.print(font, premiumX, premiumY, { text: policy?.motor?.odP ?? "", alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      // modelMakeRisk: 2017 SUBARU FORESTER
      // plate: TBA
      // motor: Y596926
      // mvFile: -
      // serial: JF1SJ5LCHG321720
      // od: 889200
      // odP: 6669
      // vbi: 200000
      // vbiP: 420
      // vpd: 200000
      // vpdP: 1245
      // theft: 889200
      // theftP: 4446
      // autoPa: 55000
      // autoPaP: 500
      // aog: 889200
      // aogP: 4446
      // docStamp: 887
      // vat: 66
      // others: 564
      // govtTax: 88
      headerStartY += 10;
      particularY += 10;
      premiumY += 10;
      //TOTALS
      particularY += 10;
      jimpImage.print(font, particularX, particularY, { text: "Premium", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularY += 10;
      jimpImage.print(font, particularX, particularY, { text: "Gov't Taxes", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularY += 10;
      jimpImage.print(font, particularX, particularY, { text: "Total Premium", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      premiumY -= 10;
      jimpImage.print(font, premiumX, premiumY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      premiumY += 10;
      jimpImage.print(font, premiumX, premiumY, { text: String(totalPremium), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
    }

    const buffAsync = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
    await fs.writeFile(imagePathResult, buffAsync);
    return filename;
  } catch (e) {
    console.log("error in printing", e);
  }
};

const policyBuilder = (defaultData: InsurancePolicy) => {
  const { type: policyType } = defaultData;
  return defaultData[policyType?.toLowerCase() as keyof InsurancePolicy] as any;
};
