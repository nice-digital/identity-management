const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT || 5000);
const buildDirectory = path.resolve(__dirname, "..", "..", "build");

app.disable("x-powered-by");

app.get("/health", (_request, response) => {
    response.status(200).send("OK");
});

app.use(
    "/static",
    express.static(path.join(buildDirectory, "static"), {
        immutable: true,
        maxAge: "1y"
    })
);

app.use(
    express.static(buildDirectory, {
        index: false,
        maxAge: 0
    })
);

// SPA fallback for /users, /roles, etc.
app.get("*", (_request, response) => {
    response.set(
        "Cache-Control",
        "no-cache, no-store, must-revalidate"
    );

    response.sendFile(
        path.join(buildDirectory, "index.html")
    );
});

app.listen(port, () => {
    console.log(
        `React SPA server listening on http://localhost:${port}`
    );
});