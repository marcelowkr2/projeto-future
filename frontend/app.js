const express = require("express");
const app = express();
const questionsRoutes = require("./routes/questions");

app.use("/api", questionsRoutes); // Isso permite acessar via /api/questions/

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});