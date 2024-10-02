import { Dialect, Sequelize } from "sequelize";
const database: string = String(process.env.SQL_DATABASE);
const username: string = String(process.env.SQL_USERNAME);
const password: string = String(process.env.SQL_PASSWORD);
const host: string = String(process.env.SQL_HOST);
const dialect: Dialect = process.env.SQL_DIALECT as Dialect;
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
});
export async function initSequelize() {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synced!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
export default sequelize;
