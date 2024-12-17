import fs from 'fs/promises';
import yaml from 'js-yaml';

// Logger utility
const logger = {
    DEBUG: (msg) => console.debug(`[DEBUG] ${msg}`),
    INFO: (msg) => console.info(`[INFO] ${msg}`),
    ERROR: (msg) => console.error(`[ERROR] ${msg}`),
};

// Load configuration dynamically from YAML
async function loadConfig(configPath) {
    try {
        const configData = await fs.readFile(configPath, 'utf8');
        return yaml.load(configData); // Parse YAML
    } catch (err) {
        console.error(`Failed to load config: ${err.message}`);
        process.exit(1);
    }
}

// Dynamically load and execute functions
async function executeCommands(commands) {
    for (const [name, details] of Object.entries(commands)) {
        try {
            // Dynamically import the module
            const module = await import(details.file);
            const func = module[details.function];

            if (typeof func === 'function') {
                const result = func(Math.PI / 4); // Example input: π/4
                console.log(`${name}(${Math.PI / 4}) = ${result}`);
            } else {
                console.error(`Function '${details.function}' not found in ${details.file}`);
            }
        } catch (err) {
            console.error(`Error loading function '${name}': ${err.message}`);
        }
    }
}

// Main function
async function main() {
    const config = await loadConfig('./config.yaml');

    // Set logging level
    const logLevel = config.loggingLevel;
    if (logger[logLevel]) {
        logger[logLevel](`Configuration loaded. Logging level set to ${logLevel}`);
    }

    // Execute commands
    await executeCommands(config.commands);
}

main();
