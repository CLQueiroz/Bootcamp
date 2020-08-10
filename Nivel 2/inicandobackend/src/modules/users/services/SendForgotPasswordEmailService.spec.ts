import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositoy';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let SendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();

    SendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'jonh',
      email: 'jonho@hotmail.com',
      password: '123456',
    });

    await SendForgotPasswordEmail.execute({
      email: 'jonho@hotmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to recover a non-existing user password', async () => {
    await expect(
      SendForgotPasswordEmail.execute({
        email: 'jonho@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'jonh',
      email: 'jonho@hotmail.com',
      password: '123456',
    });

    await SendForgotPasswordEmail.execute({
      email: 'jonho@hotmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
