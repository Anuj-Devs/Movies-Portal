import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string) {
    const exists = await this.userModel.findOne({ email }).exec();
    if (exists) throw new BadRequestException('User exists');
    const hashed = await bcrypt.hash(password, 10);
    const created = new this.userModel({ email, password: hashed });
    await created.save();
    const userObj = created.toObject();
    delete userObj.password;
    return userObj;
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && await bcrypt.compare(pass, user.password)) {
      const obj = user.toObject();
      delete obj.password;
      return obj;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return { token: this.jwtService.sign(payload) };
  }
}
