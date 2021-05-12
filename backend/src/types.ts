
import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
    req: Request & { session: { userId : string | number } };
    redis: Redis;
    res: Response;
};