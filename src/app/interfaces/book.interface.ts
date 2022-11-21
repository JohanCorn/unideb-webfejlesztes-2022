import {Publisher} from "./publisher.interface";
import {Author} from "./author.interface";

export interface Book {
  id?: number;
  name?: string;
  description?: string;
  image_link?: string;
  publish_year?: number;
  publisher_id?: number;
  publisher?: Publisher;
  pages_num?: number;
  authors?: Author[];
}
