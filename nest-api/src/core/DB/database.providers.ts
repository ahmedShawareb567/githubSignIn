import { file } from './../../_common/upload/models/upload.model';
import { Sequelize } from 'sequelize-typescript';

import { dbConfig } from './database.config';
import { User } from 'src/modules/Auth/model/user.model';
import { SocialAccount } from 'src/modules/Auth/model/social-account.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(dbConfig);
      sequelize.addModels([User, SocialAccount, file]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
