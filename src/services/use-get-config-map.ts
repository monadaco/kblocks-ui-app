import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useGetConfigMap = () => {
    const getConfigMap = async (name: string): Promise<any> => {
    const { data } = await axios.get(`${SERVER_URL}/configmaps/${name}`);
    return data;
  };

  return { getConfigMap };
}