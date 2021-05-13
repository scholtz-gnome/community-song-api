import { UploadedFile } from "express-fileupload";
import User from "./User";

interface NewSong {
  title: string;
  artist: string;
  user?: User;
  file: UploadedFile | undefined;
}

export default NewSong;
