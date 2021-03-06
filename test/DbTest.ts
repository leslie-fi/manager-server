import { UserCredentialsDBAccess } from "../src/Authorization/UserCredentialsDBAccess";


class DbTest {
  public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}

new DbTest().dbAccess.putUserCredentials({
  username: 'user1',
  password: 'password1',
  accessRights: [1,2,3]
})