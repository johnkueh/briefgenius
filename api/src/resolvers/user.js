import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';
import { UserInputError, AuthenticationError } from 'apollo-server';
import sendEmail from '../services/sendgrid';
import { validateUser } from '../validators/user';

export default {
  Query: {
    async Me(parent, args, { user, prisma }, info) {
      return prisma.user({ id: user.id });
    }
  },
  Mutation: {
    async Signup(parent, { input }, { prisma }, info) {
      await validateUser(input);

      const { name, email, password } = input;
      const existingUser = await prisma.user({ email });

      if (existingUser) {
        throw new UserInputError('Email is already taken');
      } else {
        const user = await prisma.createUser({
          name,
          email,
          password: hashedPassword(password)
        });

        return {
          user,
          jwt: getJwt({
            id: user.id,
            email: user.email
          })
        };
      }
    },
    async Login(
      parent,
      {
        input: { email, password }
      },
      { prisma },
      info
    ) {
      const user = await prisma.user({ email });

      if (user && bcrypt.compareSync(password, user.password)) {
        return {
          user,
          jwt: getJwt({
            id: user.id,
            email: user.email
          })
        };
      }

      throw new UserInputError('Authentication error', {
        errors: {
          auth: 'Please check your credentials and try again.'
        }
      });
    },
    async ForgotPassword(
      parent,
      {
        input: { email }
      },
      { prisma },
      info
    ) {
      const user = await prisma.user({ email });

      if (user) {
        const { email: userEmail } = user;
        const token = uuidv4();

        await prisma.updateUser({
          where: { email },
          data: { resetPasswordToken: token }
        });

        sendEmail({
          template_id: process.env.FORGOT_PASSWORD_TEMPLATE_ID,
          to: userEmail,
          from: process.env.SUPPORT_EMAIL_ADDRESS,
          dynamic_template_data: {
            email: userEmail,
            resetPasswordLink: `https://app.zapcms.com/reset-password?token=${token}`
          }
        });
      }

      return {
        message: 'A link to reset your password will be sent to your registered email.'
      };
    },
    async ResetPassword(
      parent,
      {
        input: { password, token }
      },
      { prisma },
      info
    ) {
      const dbUser = await prisma.user({ resetPasswordToken: token });

      if (dbUser) {
        await prisma.updateUser({
          where: { resetPasswordToken: token },
          data: {
            password: hashedPassword(password),
            resetPasswordToken: null
          }
        });

        return {
          message: 'Password updated successfully.'
        };
      }

      throw new AuthenticationError('Password reset token is invalid.');
    },
    async UpdateUser(parent, { input }, { user, prisma }, info) {
      await validateUser(input);

      const { name, email, password } = input;

      if (password) {
        return prisma.updateUser({
          where: { id: user.id },
          data: {
            name,
            email,
            password: hashedPassword(password)
          }
        });
      }

      return prisma.updateUser({
        where: { id: user.id },
        data: {
          name,
          email
        }
      });
    },
    async DeleteUser(
      parent,
      args,
      {
        user: { id },
        prisma
      },
      info
    ) {
      return prisma.deleteUser({ id });
    }
  }
};

const hashedPassword = password => bcrypt.hashSync(password, 10);
const getJwt = ({ id, email }) => jsonwebtoken.sign({ id, email }, process.env.JWT_SECRET);
