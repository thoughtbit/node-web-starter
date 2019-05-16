import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  user_pass: string;

  @ApiModelProperty({
    required: true,
  })
  @IsEmail()
  @IsString()
  user_email: string;

  @ApiModelProperty({
    required: true,
  })
  @IsString()
  user_url: string;

  @ApiModelProperty({
    required: true,
  })
  @IsString()
  user_image: string;

  @ApiModelProperty({
    required: true,
  })
  @IsString()
  user_bio: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNumber()
  user_status: number;
}
