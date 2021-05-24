import User from "./User";

interface NewSong {
  title: string;
  artist: string;
  user?: User;
}

export default NewSong;
