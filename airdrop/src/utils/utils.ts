import winston from "winston";
import {ethers} from "ethers";

export const logger = winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "logs/airdrop_error.log", level: "error"}),
        new winston.transports.File({filename: "logs/airdrop_info.log", level: "info"}),
        new winston.transports.File({filename: "logs/airdrop_warn.log", level: "warn"}),
        new winston.transports.File({filename: "logs/airdrop.log"}),
    ],
});

export function convertToUTCTime(date: Date) {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function delay(timeout: number) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}