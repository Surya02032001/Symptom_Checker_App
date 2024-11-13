import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class PythonService {

    async callPythonScript(query: string): Promise<any> {
        try {
            const { stdout } = await execAsync(`python3 ./run.py "${query}"`);
            return JSON.parse(stdout);
        } catch (error) {
            throw new Error(`Error calling Python script: ${error.message}`);
        }
    }
}
