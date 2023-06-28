/* service used to upload data to central storage */

import axios from "axios";

import { API_URL } from "../utils/config";
import logger from "../utils/logger";

const baseUrl = API_URL;
const extension = "api/data"

const dataService = {
  upload: async (data) => {
    try {
      logger.info(extension, "Uploading data", data);

      const res = await axios.post(baseUrl, data);

      logger.info(extension, "Data uploaded", res);

      return res.data;
    } catch (err) {
      logger.error(extension, err);
    }
  }
};

export default dataService;
