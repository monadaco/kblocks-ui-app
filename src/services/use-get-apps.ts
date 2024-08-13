import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const useGetApps = () => {
    const getArgoApps = async () => {
        const { data } = await axios.get(`${SERVER_URL}/argo-apps`);
        return data;
    }

    return { getArgoApps };
}