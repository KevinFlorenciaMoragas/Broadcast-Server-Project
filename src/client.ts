import WebSocket from "ws";

export const connectToServer = (url: string): void => {
    console.log(`Conectando al servidor en: ${url}`);
    const ws = new WebSocket(url);

    ws.on("open", () => {
        console.log("Conectado al servidor. Puedes enviar mensajes:");
        process.stdin.on("data", (data) => {
            ws.send(data.toString().trim());
        });
    });

    ws.on("message", (message) => {
        console.log(`Mensaje del servidor: ${message}`);
    });

    ws.on("close", () => {
        console.log("Conexión cerrada por el servidor.");
    });

    ws.on("error", (err) => {
        console.error("Error en el cliente:", err);
    });
};