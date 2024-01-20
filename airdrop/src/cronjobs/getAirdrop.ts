import {cronJob, CronJob} from "@loopback/cron";
import {Provider, ValueOrPromise} from "@loopback/core";
import {ACCOUNTS, CONFIG_TYPE_NAME, CRONJOB_ENABLE, CRONJOB_TIME, NETWORK} from "../utils/config";
import {convertToUTCTime, delay, logger} from "../utils/utils";
import {Connection, PublicKey} from "@solana/web3.js";
@cronJob()
export class CronJobGetAirdrop implements Provider<CronJob> {
    constructor() {}

    value(): ValueOrPromise<CronJob> {
        return new CronJob({
            cronTime: CRONJOB_TIME.GET_AIRDROP,
            name: CONFIG_TYPE_NAME.GET_AIRDROP,
            onTick: async () => {
                try {
                    const currentTime = convertToUTCTime(new Date());
                    if (CRONJOB_ENABLE.GET_AIRDROP) {
                        logger.info(`${CONFIG_TYPE_NAME.GET_AIRDROP} - Run now: ${currentTime}`);

                        const connection = new Connection(NETWORK.SOLANA_RPC);
                        const amount = 5e9;
                        for (const account of ACCOUNTS.solana) {
                            try {
                                const airdropTrx = await connection.requestAirdrop(new PublicKey(account), amount);
                                logger.info(`Request airdrop for ${account} with ${amount} SOL, airdropTrx: ${airdropTrx}`);
                                await delay(10000);
                            } catch (e) {
                                logger.error(`${CONFIG_TYPE_NAME.GET_AIRDROP} - ERROR: ${e.message}`);
                            }
                        }
                    }
                } catch (e) {
                    console.log(e);
                    logger.error(`${CONFIG_TYPE_NAME.GET_AIRDROP} - ERROR: ${e.message}`);
                }
            },
            start: true
        });
    }

}