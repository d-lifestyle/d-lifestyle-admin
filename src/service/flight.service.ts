import axios from "axios";
import { AxiosInstance } from "../utils";

class FlightServices {
     public async GetFlightQuery() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/flight`);
     }
}

const FlightService = new FlightServices();

export default FlightService;
