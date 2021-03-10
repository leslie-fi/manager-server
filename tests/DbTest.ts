import { UserCredentialsDBAccess } from "../src/Authorization/UserCredentialsDBAccess";
import { WorkingPosition } from "../src/shared/Model";
import { UsersDBAccess } from '../src/User/UsersDBAccess';


class DbTest {
  public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
  public userDbAccess: UsersDBAccess = new UsersDBAccess();
}

new DbTest().dbAccess.putUserCredentials({
  username: 'yoni1',
  password: 'password1',
  accessRights: [0,1,2,3]
})

// new DbTest().userDbAccess.putUser({
  // name: 'frank',
  // age: 25,
  // id: '1',
  // email: 'frank@example.com',
  // workingPosition: 2

// })

// new DbTest().userDbAccess.getUserById('1')