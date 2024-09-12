import axios, { AxiosResponse } from "axios";
import { IPlayer } from "../type/Player";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const PlayerServices = {
  getPlayers: async (): Promise<IPlayer[]> => {
    try {
      const response: AxiosResponse<IPlayer[]> = await axios.get(
        `${baseURL}/api/players`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  },

  createPlayer: async (playerData: IPlayer): Promise<IPlayer> => {
    try {
      const response: AxiosResponse<IPlayer> = await axios.post(
        `${baseURL}/api/players`,
        playerData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating player:", error);
      throw error;
    }
  },
};

export default PlayerServices;
