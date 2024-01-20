import dotenv from "dotenv";
dotenv.config();
import {ApplicationConfig, AirdropApplication} from './application';
import {createBindingFromClass} from "@loopback/core";
import {CRONJOB_ENABLE} from "./utils/config";
import {CronJobGetAirdrop} from "./cronjobs/getAirdrop";

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new AirdropApplication(options);
  if (CRONJOB_ENABLE.GET_AIRDROP) {
    const cronJobGetAirdrop = createBindingFromClass(CronJobGetAirdrop);
    app.add(cronJobGetAirdrop);
    app.configure(cronJobGetAirdrop.key);
  }
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3007),
      host: process.env.HOST,
      gracePeriodForClose: 5000,
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
