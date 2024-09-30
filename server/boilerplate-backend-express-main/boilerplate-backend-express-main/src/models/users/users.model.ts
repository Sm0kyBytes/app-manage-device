import { DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import sequelize from "../../db/sequelize";
import { UserAttributes } from "./users.entity";

type UserCreationAttributes = Optional<UserAttributes, 'userId'>;

class UserModel extends Model<UserAttributes, UserCreationAttributes>  {
    declare userId: string;
    declare firstName: string;
    declare lastName: string;
    declare phone: string;
    declare country: string;
    declare email: string;
    declare username: string;
    declare password: string;
    declare isDeleted: boolean;
    declare deletedAt: Date;
    declare createdAt: Date;
    declare updatedAt: Date;
}

UserModel.init(
    {
        userId: {
            type: DataTypes.STRING,
            defaultValue: uuidv4, // Automatically generate UUIDs
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "th",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
);
// User.associate = function (models) {
//     Customer.hasMany(models.CustomerTrans, { foreignKey: "customerId", constraints: false, as: "trans" });
//     Customer.hasOne(models.CustomerCredential, { foreignKey: "customerId", constraints: false, as: "credential" });
//     Customer.hasOne(models.CustomerCredit, { foreignKey: "customerId", constraints: false, as: "credit" });
// };
export default  UserModel