import { insertCustomer } from "../models/customerModel";
import { promoMap } from "../utils/promoMap";

export const handleCustomerSubmit = async ({
  name,
  mobile,
  bakeryid,
}) => {
  if (!name || !mobile) {
    throw new Error("All fields required");
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    throw new Error("Enter valid 10-digit mobile number");
  }

  if (!bakeryid || !promoMap[bakeryid]) {
    throw new Error("Invalid QR Code");
  }

  const payload = {
    bakeryid,
    name,
    mobile_number: mobile,
    promocode: promoMap[bakeryid],
  };

  return await insertCustomer(payload);
};