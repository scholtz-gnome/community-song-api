interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  profilePic: string | null;
  identityProvider: string | null;
  idpId: string | null;
  createdAt: string;
  updatedAt: string;
}

export default User;
