import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export const useGetConfigMap = () => {
    const getConfigMap = async (name: string): Promise<any> => {
    const { data } = await axios.get(`${SERVER_URL}:${SERVER_PORT}/api/configmaps/${name}`);
    return data;
  };

  return { getConfigMap };
}