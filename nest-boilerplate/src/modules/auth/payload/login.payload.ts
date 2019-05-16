import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginPayload {
  // @ApiModelProperty({
  //   required: true,
  // })
  // @IsEmail()
  // user_email: string;

  @ApiModelProperty({
    required: true,
  })
  @IsString()
  readonly user_name: string;

  @ApiModelProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly user_pass: string;
}