import { EnquiryFormProps } from "../interface";
import { AxiosInstance } from "../utils";

class EnquiryServices {
     public async MakeEnquiry({ checkIn, checkOut, dataId, email, fullName, phone, body }: EnquiryFormProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/enquiry`, {
               checkIn,
               checkOut,
               dataId,
               email,
               fullName,
               phone,
               body,
          });
     }
}

const EnquiryService = new EnquiryServices();

export default EnquiryService;
