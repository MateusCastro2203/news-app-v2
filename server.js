const express = require("express");
const { execSync } = require("child_process");
const app = express();
const port = process.env.PORT || 3000;

// Rota principal que exibe o QR Code
app.get("/", async (req, res) => {
  try {
    // Iniciar Expo em segundo plano e capturar a saída
    const result = execSync("npx expo start --tunnel --no-dev --minify", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });

    // Procurar pelo link Expo na saída
    const expUrlMatch = result.match(/exp:\/\/[a-zA-Z0-9.-]+\.exp\.host/);
    const expUrl = expUrlMatch ? expUrlMatch[0] : "Nenhum link encontrado";

    // Página HTML com o QR code e o link
    res.send(`
      <html>
        <head>
          <title>NewsApp Expo QR Code</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:Arial;">
          <h1>NewsApp - Escaneie para testar</h1>
          <div id="qrcode" style="margin:20px;"></div>
          <p>Link: <a href="${expUrl}">${expUrl}</a></p>
          
          <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
          <script>
            const qr = qrcode(0, 'L');
            qr.addData('${expUrl}');
            qr.make();
            document.getElementById('qrcode').innerHTML = qr.createImgTag(5);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`Erro ao iniciar Expo: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
