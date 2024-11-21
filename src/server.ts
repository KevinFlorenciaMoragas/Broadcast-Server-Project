import { WebSocket, WebSocketServer } from "ws";

export const startServer = (port: number): void => {
    console.log(`Iniciando servidor en el puerto ${port}...`);

    const wss = new WebSocketServer({ port });
    const clients: Set<WebSocket> = new Set();

    wss.on("connection", (ws) => {
        console.log("Nuevo cliente conectado");
        clients.add(ws);
        console.log(`Clientes conectados: ${clients.size}`);
        ws.on("message", (message) => {
            console.log(`Mensaje recibido: ${message}`);
            for (const client of clients) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            }
        });

        ws.on("close", () => {
            clients.delete(ws);
            console.log("Cliente desconectado");
        });

        ws.on("error", (err) => {
            console.error("Error en el cliente:", err);
        });
    });

    process.on("SIGINT", () => {
        console.log("Cerrando servidor...");
        if(clients.size > 0) {
            for (const client of clients) {
                client.close();
            }
        }
        wss.close(() => {
            console.log("Servidor cerrado");
            process.exit(0);
        });
    });

    console.log(`Servidor iniciado y escuchando en ws://localhost:${port}`);
};