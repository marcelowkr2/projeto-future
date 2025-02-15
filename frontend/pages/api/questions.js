export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json([
      { id: 1, text: "Pergunta 1" },
      { id: 2, text: "Pergunta 2" },
    ]);
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
