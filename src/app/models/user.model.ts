export class User {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  refreshToken: string;

  // displayName?: string;
  // email?: string;
  // expiresIn?: string;
  // idToken: string;
  // kind?: string;
  // localId?: string;
  // refreshToken: string;
  // registered: boolean;

  // constructor(
  //   UNP: string,
  //   companyName: string,
  //   companyTypeId: string,
  //   _id?: string,
  // ) {
  //   this.UNP = UNP;
  //   this.companyName = companyName;
  //   this.companyTypeId = companyTypeId;
  // }
}
