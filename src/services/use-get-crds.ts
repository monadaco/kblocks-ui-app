import axios from "axios";
import { CRDData } from "../types/crd.ts";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useGetCRDs = () => {
  const getCRDs = async (): Promise<Record<string, CRDData>> => {
    const { data } = await axios.get(`${SERVER_URL}/crds`);

    if (!Array.isArray(data)) {
      return {};
    }

    const map: Record<string, CRDData> = {};
    for (const crd of data) {
      map[crd.kind.toLowerCase()] = crd;
    }

    return map;
  };

  return { getCRDs };
};
