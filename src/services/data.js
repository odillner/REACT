/* service used to upload data to central storage */

import axios from "axios";

import { API_URL } from "../utils/config";
import logger from "../utils/logger";

const baseUrl = API_URL;
const extension = "api/data"

const dataService = {
  upload: async (data) => {
    try {
      console.log(extension, "Uploading data", data);

      const res = await axios.post(baseUrl, data);

      console.log(extension, "Data uploaded", res);

      return res.data;
    } catch (err) {
      console.log(extension, err);
    }
  }
};

export default dataService;
