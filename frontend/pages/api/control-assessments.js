export default function handler(req, res) {
    if (req.method === "GET") {
      res.status(200).json([
        { id: 1, title: "Avaliação 1" },
        { id: 2, title: "Avaliação 2" },
      ]);
    } else {
      res.status(405).json({ message: "Método não permitido" });
    }
  }
  