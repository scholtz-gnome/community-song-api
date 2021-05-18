interface SongUser {
  id: number;
  title: string;
  alternateTitle: string | null;
  artist: string;
  addedBy: {
    username: string;
    profilePic: string | null;
    email: string;
  };
}
