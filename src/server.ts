import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('database connected successfully')
        app.listen(config.port, () => {
            console.log(`university app is listening on port ${config.port}`)
          })
    } catch (error) {
        console.log(`failed to connect ${error}`)
    }
}
main()