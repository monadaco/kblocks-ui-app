import axios from "axios";
import { CRDData } from "../types/crd.ts";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export const useGetCRDs = () => {
  const getCRDs = async (): Promise<CRDData[]> => {
    const { data } = await axios.get(
      `${SERVER_URL}:${SERVER_PORT}/kblocksapi/crds`,
    );
    return data;
  };

  return { getCRDs };
};
