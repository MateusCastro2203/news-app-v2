const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>NewsApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial; text-align: center; margin: 20px; }
          .container { max-width: 600px; margin: 0 auto; }
          .btn { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 10px; text-decoration: none; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>NewsApp - Servidor de Teste</h1>
          <p>Este servidor está funcionando corretamente no Render!</p>
          <p>Para testar o aplicativo, você precisa:</p>
          <ol style="text-align: left;">
            <li>Fazer o download da APK do Android</li>
            <li>Ou usar o link QR code do Expo para iOS</li>
          </ol>
          <a href="https://link-para-seu-apk.apk" class="btn">Download APK para Android</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${port}`);
});
