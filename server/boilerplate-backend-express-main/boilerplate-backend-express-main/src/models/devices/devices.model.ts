import { DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../../db/sequelize";
import { DeviceAttributes } from "./devices.entity";
import UserModel from "../users/users.model";

type DeviceCreationAttributes = Optional<DeviceAttributes, "deviceId">;

class DeviceModel extends Model<DeviceAttributes, DeviceCreationAttributes> {
    declare deviceId: string;
    declare userId: string;
    declare deviceName: string;
    declare description: string;
    declare category: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

DeviceModel.init(
    {
        deviceId: {
            type: DataTypes.STRING,
            defaultValue: uuidv4, // Automatically generate UUIDs
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deviceName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: "Device",
        tableName: "Devices",
    }
);
UserModel.hasMany(DeviceModel, { foreignKey: "userId", constraints: true, as: "devices" });
DeviceModel.belongsTo(UserModel, { foreignKey: "userId", constraints: false, as: "user" });
export default DeviceModel;
