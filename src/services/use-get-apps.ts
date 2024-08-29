import { ArgoApplication } from "@/types/argo";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const useGetApps = () => {
  const getArgoApps = async () => {
    const { data } = await axios.get(`${SERVER_URL}/argo-apps`);

    const apps: ArgoApplication[] = data?.body?.items;
    if (!Array.isArray(apps)) {
      return {};
    }

    const map: Record<string, ArgoApplication> = {};
    for (const app of apps) {
      map[app.metadata.name] = app;
    }
    
    return map;
  };

  return { getArgoApps };
}