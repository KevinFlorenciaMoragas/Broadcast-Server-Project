import { Command } from "commander";
import { startServer } from "./server";
import { connectToServer } from "./client";

const program = new Command();

program
    .command("start")
    .description("Inicia el servidor")
    .option("-p, --port <number>", "Puerto en el que escuchar", "3000") 
    .action((options: { port: string }) => {
        const port = parseInt(options.port, 10);
        startServer(port);
    });

program
    .command("connect")
    .description("Conecta un cliente al servidor")
    .option("-u, --url <string>", "URL del servidor", "ws://localhost:3000") 
    .action((options: { url: string }) => {
        connectToServer(options.url);
    });

program.parse(process.argv);