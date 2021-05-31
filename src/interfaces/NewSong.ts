import User from "./User";

interface NewSong {
  title: string;
  alternateTitle: string | null;
  artist: string;
  user?: User;
}

export default NewSong;
