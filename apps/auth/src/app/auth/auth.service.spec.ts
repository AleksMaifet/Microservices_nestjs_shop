import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

const email = 'test@example.com';
const expectedAccessToken = 'mocked-access-token';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(expectedAccessToken),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return an object with an access token', async () => {
      const result = await service.login(email);

      expect(result).toEqual({ access_token: expectedAccessToken });
      expect(jwtService.signAsync).toHaveBeenCalledWith({ email });
    });
  });
});
