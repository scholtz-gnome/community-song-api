interface Song {
  id: number;
  title: string;
  artist: string;
  url: string | null;
  firstName: string;
  profilePic: string;
  file: string;
  email: string;
  userId: number | null;
}

export default Song;
