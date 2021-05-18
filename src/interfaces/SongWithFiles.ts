import File from "./File";

interface SongWithFiles {
  id: number;
  title: string;
  artist: string;
  files: Buffer[];
}

export default SongWithFiles;
