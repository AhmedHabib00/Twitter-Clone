import signUpInfo, { signUpCode, signUpUsername } from '../accountServices';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

describe('test post name, email, and birthdate', () => {
  it('test post user info', async () => {
    await signUpInfo({
      name: 'ahmed',
      email: 'ahmed@gmail.com',
      birthdate: '22-5-2022',
    }).then((response) => {
      expect(response.status).toBe(201);
    });
  });
});
describe('test verfication code', () => {
  it('test post verification code', async () => {
    await signUpCode({
      code: '123456',
      email: 'ahmed@gmail.com',
    }).then((response) => {
      expect(response.status).toBe(201);
    });
  });
});

describe('test username ', () => {
  it('test post username', async () => {
    await signUpUsername({
      username: '@ahmed',
      email: 'ahmed@gmail.com',
    }).then((response) => {
      expect(response.status).toBe(201);
    });
  });
});
