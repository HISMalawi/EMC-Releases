import { toSentenceCase } from "./Strs";

export function parseMalawiNationalIDQRCode(code: any) {
  const temp = code.split('<')?.at(-1)?.split('~');
  if (temp && temp.length >= 6) {
    return {
      gender: temp[5],
      birthdate: temp[6],
      nationalIDStatus: "true",
      malawiNationalID: temp[2],
      'given_name': toSentenceCase(temp[3]),
      'family_name': toSentenceCase(temp[1])
    }
  }
}