import Policy from "@models/policy.model";
import { InsurancePolicy, PolicyTypes, DynamicField, MotorLabels } from "@typedefs/policy";
import Jimp from "jimp";
import fs from "fs/promises"; // Import the fs module,{}
import path from "path";
const moment = require("moment");
let now = moment();
const formatNumber = (value: any) => {
  if (value != null) {
    if (typeof value === "string") {
      const sanitizedInput = value.replace(/,/g, "");
      const parsedFloat = parseFloat(sanitizedInput);
      if (!isNaN(parsedFloat)) {
        const formattedValue = Number(parsedFloat).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        return formattedValue;
      }
    } else {
      return parseFloat(Number(value).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }));
    }
  }
  return "";
};
function parseStringNumber(input: any): number {
  if (input === "") {
    return 0;
  }
  if (typeof input === "string") {
    const sanitizedInput = input.replace(/,/g, "");
    const parsedFloat = parseFloat(sanitizedInput);
    if (isNaN(parsedFloat)) {
      return 0;
    }
  }
  return parseFloat(input);
}
export const getPolicy = async (policyId: string) => {
  try {
    console.log("Policy ID: ", policyId);
    const policy: InsurancePolicy = (await Policy.findById(policyId)) as any;
    // console.log("policy: ", policy);
    const filename = `${policyId}-soa.png`;
    // Get the directory of the current module's file
    const currentDir = path.resolve(__dirname, "../../../../helper");
    // Generate the full image path using path.join
    const imagePath = path.join(currentDir, "images", "layout_88cmx112cm_HD.png"); // Adjust the path as needed
    // Read the image using fs
    const imageBuffer = await fs.readFile(imagePath);
    const jimpImage = await Jimp.read(imageBuffer);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK);
    const font_insurer = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK);
    const dateToday = moment(new Date());
    jimpImage.background(0x00000000);
    // jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, function (x, y, idx) {
    //   this.bitmap.data[idx + 3] = 0;
    // });

    //BASIC INFO
    jimpImage.print(font_insurer, 250, 210, policy.assured ?? "");
    jimpImage.print(font_insurer, 250, 230, policy.mailingAddress ?? "");
    jimpImage.print(font_insurer, 70, 290, policy.insurer ?? "");
    jimpImage.print(font_insurer, 70, 320, "WITHHOLDING TAX (BIR 2307) SHOULD BE IN FAVOR OF THE INSURANCE COMPANY");
    jimpImage.print(font_insurer, 800, 290, policy.line ?? "");
    jimpImage.print(font_insurer, 1000, 290, policy.policyNo ?? "");
    jimpImage.print(font_insurer, 950, 230, now.format("LL"));
    jimpImage.print(font_insurer, 800, 860, "ADRIAN MOGUL");
    jimpImage.print(font_insurer, 250, 800, policy.producer ?? "");

    // console.log("dynamicPolicy: ", dynamicPolicy);
    const imagePathResult = path.join(process.cwd(), "public", "static", "images", "printing", filename);
    console.log("Policy Image: ", imagePathResult);
    //PARTICULARS
    // 1433,2113
    let headerStartX = 350;
    let headerStartY = 430;
    //3252,2161
    let particularX = 700;
    let particularY = 430;

    let cardetailsX = 320;
    let cardetailsY = 430;
    // 4891,2119
    let premiumX = 700;
    let premiumY = 430;
    let totalPremium = 0;
    let totalParticular = 0;
    let textLine = "________________";
    jimpImage.print(
      font_insurer,
      70,
      430,
      {
        text:
          policy.inception.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) ?? "",
        alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP,
      },
      50,
      50
    );
    jimpImage.print(
      font_insurer,
      180,
      430,
      {
        text:
          policy.expiry.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) ?? "",
        alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP,
      },
      50,
      50
    );
    const dynamicPolicy: any = policyBuilder(policy);
    const totalGovt = parseStringNumber(policy?.govtTax) + parseStringNumber(policy?.docStamp) + parseStringNumber(policy?.vat) + parseStringNumber(policy?.others);
    if (policy.type !== PolicyTypes.MOTOR) {
      // console.log("Policy Type: ", policy.type);
      dynamicPolicy.map((e: DynamicField) => {
        // console.log("e.premium", parseFloat(e.premium));
        totalPremium = totalPremium + parseFloat(e?.premium?.replaceAll(",", "") ?? 0);
        // console.log("e.particular", parseFloat(e.particular));
        totalParticular = totalParticular + parseFloat(e?.particular?.replaceAll(",", "") ?? 0);
      });
      //DYNAMIC POLILCY
      for (let entries of dynamicPolicy) {
        const { particularHeaderName, particular, premium } = entries;
        jimpImage.print(font, headerStartX, headerStartY, particularHeaderName ?? "Unknown");
        particularX -= 100;
        jimpImage.print(font, particularX, particularY, { text: "PHP", alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
        particularX += 100;
        premiumX += 100;
        jimpImage.print(font, premiumX, premiumY, { text: String(formatNumber(particular)), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
        premiumX -= 100;
        // jimpImage.print(font, premiumX, premiumY, { text: formatNumber(premium?.replaceAll(",", "") ?? 0), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
        headerStartY += 20;
        particularY += 20;
        premiumY += 20;
      }
      //TOTALS
      console.log("Dynmc : ", policy);
      const totalPremiumGvt: Number = Number(policy?.govtTax ?? 0) + (totalPremium ?? 0);
      // headerStartY += 20;
      particularY -= 20;
      // premiumY += 20;
      //TOTALS

      jimpImage.print(font, particularX + 260, particularY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularY += 20;
      jimpImage.print(font, particularX, particularY, { text: "Premium", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX += 280;
      jimpImage.print(font, particularX, particularY, { text: String(formatNumber(totalPremium ?? "0.00")), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX -= 280;
      particularY += 20;
      jimpImage.print(font, particularX, particularY, { text: "Gov't Taxes", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX += 280;
      jimpImage.print(font, particularX, particularY, { text: String(totalGovt), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX -= 280;
      jimpImage.print(font, particularX + 260, particularY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularY += 20;
      jimpImage.print(font, particularX, particularY, { text: "Total Premium", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX += 280;
      jimpImage.print(font, particularX, particularY, { text: String(formatNumber(totalPremiumGvt ?? 0)), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX -= 280;
      jimpImage.print(font, particularX + 260, particularY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      premiumY -= 20;
    } else {
      particularX -= 380;
      jimpImage.print(font, particularX, particularY, { text: dynamicPolicy?._doc["modelMakeRisk"], alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 200, 200);
      cardetailsY += 20;
      jimpImage.print(font, cardetailsX, cardetailsY, { text: dynamicPolicy?._doc["plate"], alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 200, 200);
      cardetailsY += 40;
      jimpImage.print(font, cardetailsX, cardetailsY, { text: "SERIAL NO: " + dynamicPolicy?._doc["serial"], alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 200, 200);
      cardetailsY += 20;
      jimpImage.print(font, cardetailsX, cardetailsY, { text: "MOTOR NO: " + dynamicPolicy?._doc["motor"], alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 200, 200);
      particularX += 380;
      var selectedKeys = ["od", "theft", "vbi", "vpd", "autoPa", "aog", "lu", "ld"];
      var selectedKeysValues = ["odP", "theftP", "vbiP", "vpdP", "autoPaP", "aogP", "luP", "ldP"];
      for (const [key, value] of Object.entries(dynamicPolicy._doc)) {
        if (dynamicPolicy._doc[key] != 0) {
          if (selectedKeys.includes(key)) {
            const selectedValue = dynamicPolicy._doc[key];
            if (MotorLabels[key as keyof typeof MotorLabels] ? true : false) {
              jimpImage.print(font, particularX, particularY, { text: MotorLabels[key as keyof typeof MotorLabels], alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
              particularX += 100;
              jimpImage.print(font, particularX, particularY, { text: String(formatNumber(selectedValue)), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
              particularX -= 100;
            }
          }

          if (selectedKeysValues.includes(key)) {
            particularX += 280;
            const selectedValue = dynamicPolicy._doc[key];
            jimpImage.print(font, particularX, particularY, { text: String(formatNumber(selectedValue)), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
            totalPremium = totalPremium + parseFloat(selectedValue.replaceAll(",", ""));
            particularX -= 280;
            particularY += 20;
          }
        }
      }
      const totalPremiumGvt: Number = (Number(dynamicPolicy?._doc["govtTax"]) ?? 0) + (totalPremium ?? 0);
      // headerStartY += 20;
      particularY -= 20;
      // premiumY += 20;
      //TOTALS

      jimpImage.print(font, particularX + 260, particularY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularY += 20;
      jimpImage.print(font, particularX, particularY, { text: "Premium", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX += 280;
      jimpImage.print(font, particularX, particularY, { text: String(formatNumber(totalPremium)) ?? "0", alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX -= 280;
      particularY += 20;
      jimpImage.print(font, particularX, particularY, { text: "Gov't Taxes", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX += 280;
      jimpImage.print(font, particularX, particularY, { text: String(totalGovt), alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX -= 280;
      jimpImage.print(font, particularX + 260, particularY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularY += 20;
      cardetailsY += 40;
      cardetailsX = 70;
      jimpImage.print(font, cardetailsX, particularY, { text: "DEDUCTIBLE ", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 200, 200);
      jimpImage.print(font, particularX, particularY, { text: "Total Premium", alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX += 280;
      jimpImage.print(font, particularX, particularY, { text: String(formatNumber(totalPremiumGvt)) ?? "0", alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      particularX -= 280;
      jimpImage.print(font, particularX + 260, particularY, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      jimpImage.print(font, particularX + 260, particularY + 1, { text: textLine, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP }, 150, 150);
      premiumY -= 20;
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
