"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pgS = __importStar(require("pg-connection-string"));
exports.default = ({ env }) => ({
    connection: {
        client: env('postgres'),
        connection: {
            host: pgS.parse(process.env.DATABASE_URL_APP).host,
            port: pgS.parse(process.env.DATABASE_URL_APP).port,
            database: pgS.parse(process.env.DATABASE_URL_APP).database,
            user: pgS.parse(process.env.DATABASE_URL_APP).user,
            password: pgS.parse(process.env.DATABASE_URL_APP).password,
            ssl: {
                rejectUnauthorized: false,
            },
        },
    },
});
