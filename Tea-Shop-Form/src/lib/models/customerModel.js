import { supabase } from "../services/supabaseClient";

export const insertCustomer = async (payload) => {
  const { data, error } = await supabase
    .from("customertable")
    .insert([payload]);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to submit. Try again.");
  }

  return data;
};