interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  verified: boolean;
  profilePic: string | null;
  identityProvider: string | null;
  idpId: string | null;
  createdAt: string;
  updatedAt: string;
}

export default User;
