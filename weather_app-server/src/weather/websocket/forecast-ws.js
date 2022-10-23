/* eslint-disable consistent-return */
const WebSocket = require("ws");
const url = require("url-parse");
const forecastWsService = require("./forecast-ws-service");

module.exports = (server, db) => {
    const wss = new WebSocket.Server({ server, path: "/ws/forecast" });
    const userRepository = require("../../users/user-repository")(db);

    wss.on("connection", async (ws, req) => {
        const { token } = url(req.url, true).query;

        let interval;
        let user;

        ws.on("error", error => {
            return ws.close(1013, error.message);
        });

        ws.on("close", () => {
            clearInterval(interval);
            console.log("Client disconected");
        });

        ws.on("message", async message => {
            const { type } = JSON.parse(message);

            clearInterval(interval);
            try {
                interval = await forecastWsService.sendToClientforecast(
                    ws,
                    user,
                    type
                );
            } catch (error) {
                ws.close(3000, error.message);
            }
        });

        try {
            user = await forecastWsService.verifyUserWithToken(
                token,
                userRepository
            );
        } catch (error) {
            return ws.close(3000, error.message);
        }

        console.log("Client connected");
    });
};
