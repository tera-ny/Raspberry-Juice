import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { Storage } from "@google-cloud/storage"

dayjs.extend(utc)

export interface Policy {
  url: string
  fields: { [key: string]: string }
}

export const generatePolicy = async (id: string): Promise<Policy> => {
  if (process.env.ENVIRONMENT === "development") {
    return {
      url: "http://localhost:3000/api/hoge",
      fields: {
        key: `contents/test/${id}.mp4`,
        expiration: "11111111",
        yyyymmdd: "YYYYMMDD",
        goog_date: "YYYYMMDDTHHmmssZ",
        credential: "test@service.com",
        algorithm: "GOOG4-RSA-SHA256",
        signature: "111111111111111111",
        encoded: "fdssjkdfsdkjfjdksk",
      },
    }
  } else {
    const key = `contents/video/${id}.mp4`
    const storage = new Storage()
    const file = storage.bucket("raspberry-juice-origin").file(key)

    const today = dayjs.utc()
    const todayToFormatYYYYMMDD = today.format("YYYYMMDD")
    const todayToFormatGoog_date = today.format("YYYYMMDDTHHmmss[Z]")
    const algorithm = "GOOG4-RSA-SHA256"
    const account = "raspberryjuice@appspot.gserviceaccount.com"
    const credential = `${account}/${todayToFormatYYYYMMDD}/auto/storage/goog4_request`
    const expiration = today.add(1, "minutes")
    const [response] = await file.generateSignedPostPolicyV4({
      expires: expiration.toDate(),
      conditions: [
        ["eq", "$key", key],
        { bucket: "raspberry-juice-origin" },
        ["content-length-range", 0, 4 * 1000 ** 3],
        ["eq", "$Content-Type", "video/mp4"],
        { "x-goog-algorithm": algorithm },
        { "x-goog-date": todayToFormatGoog_date },
        {
          "x-goog-credential": credential,
        },
        ["eq", "$Expires", expiration.toISOString()],
      ],
      fields: {
        key,
        "Content-Type": "video/mp4",
        Expires: expiration.toISOString(),
      },
    })
    return {
      url: response.url,
      fields: response.fields,
    }
  }
}
