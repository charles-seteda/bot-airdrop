import dotenv from "dotenv";
dotenv.config();

export const EACH_15_SECONDS = '*/15 * * * * *';

export const CRONJOB_TIME = {
    GET_AIRDROP: process.env.CRONJOB_TIME_GET_AIRDROP ?? EACH_15_SECONDS,
}

export const CONFIG_TYPE_NAME = {
    GET_AIRDROP: "CronJobGetAirdrop"
};

export const CRONJOB_ENABLE = {
    GET_AIRDROP: (process.env.IS_ENABLE_JOB_GET_AIRDROP === "true"),
}

export const NETWORK = {
    SOLANA_RPC: process.env.SOLANA_RPC ?? "https://api.devnet.solana.com",
}

export const ACCOUNTS = {
    solana: [
        "CharkDuBJruC5pMehKR2sPbD8DR36MS8C7GAi8pag72b",
    ],
    bsc: [],
    ethereum: [],
    polkadot: [],
};