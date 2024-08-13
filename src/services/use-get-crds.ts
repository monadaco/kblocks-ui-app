import axios from "axios";
import { CRDData } from "../types/crd.ts";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useGetCRDs = () => {
  const getCRDs = async (): Promise<CRDData[]> => {
    const { data } = await axios.get(`${SERVER_URL}/crds`);
    return data;
  };

  return { getCRDs };
};
