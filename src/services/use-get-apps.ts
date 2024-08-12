import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
export const useGetApps = () => {
    const getArgoApps = async () => {
        const { data } = await axios.get(`${SERVER_URL}:${SERVER_PORT}/api/argo-apps`);
        return data;
    }

    return { getArgoApps };
}