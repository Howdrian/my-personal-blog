import { createClient } from "tinacms/dist/client";
import { queries } from "./__generated__/types";
export const client = createClient({ queries });
export default client;
