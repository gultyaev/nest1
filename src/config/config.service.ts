import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
@Injectable()
export class ConfigService {
    private readonly config: {[key: string]: string};

    constructor(filePath: string) {
        this.config = dotenv.parse(fs.readFileSync(filePath));
    }

    get(key: string): string {
        return this.config[key];
    }
}
