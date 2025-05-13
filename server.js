const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  // Link do seu projeto (substitua pelo link real obtido do EAS update)
  const expoGoUrl =
    "https://expo.dev/preview/update?message=Vers%C3%A3o%20de%20teste&updateRuntimeVersion=1.0.0&createdAt=2025-05-13T02%3A56%3A12.082Z&slug=exp&projectId=14a2bba4-9aef-4706-a1bd-4d69ec61cf4a&group=18da4859-a58c-47f1-bd4c-3921ab4ab087";

  res.send(`
    <html>
      <head>
        <title>NewsApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial; text-align: center; margin: 20px; }
          .container { max-width: 600px; margin: 0 auto; }
          .btn { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 10px; text-decoration: none; display: inline-block; }
          .qr-section { margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>NewsApp - Servidor de Teste</h1>
          <p>Este servidor está funcionando corretamente no Render!</p>
          
          <div class="qr-section">
            <h2>Para iOS (Expo Go)</h2>
            <p>Escaneie este QR code com o aplicativo Expo Go:</p>
            <div id="qrcode-expo"></div>
            <p><small>Link: ${expoGoUrl}</small></p>
          </div>
          
          <div class="android-section">
            <h2>Para Android</h2>
            <a href="https://link-para-seu-apk.apk" class="btn">Download APK para Android</a>
          </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
        <script>
          const qr = qrcode(0, 'L');
          qr.addData('${expoGoUrl}');
          qr.make();
          document.getElementById('qrcode-expo').innerHTML = qr.createImgTag(8);
        </script>
      </body>
    </html>
  `);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${port}`);
});
