import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionsService } from './exceptions.service';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('ExceptionsService', () => {
  let service: ExceptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionsService],
    }).compile();

    service = module.get<ExceptionsService>(ExceptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException', () => {
    expect(() =>
      service.badRequestException({ message: 'Bad request' }),
    ).toThrow(BadRequestException);
  });

  it('should throw ForbiddenException', () => {
    expect(() => service.forbiddenException({ message: 'Forbidden' })).toThrow(
      ForbiddenException,
    );
  });

  it('should throw NotFoundException', () => {
    expect(() => service.notFoundException({ message: 'Not found' })).toThrow(
      NotFoundException,
    );
  });

  it('should throw InternalServerErrorException', () => {
    expect(() =>
      service.internalServerErrorException({
        message: 'Internal server error',
      }),
    ).toThrow(InternalServerErrorException);
  });
});
