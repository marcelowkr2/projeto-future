export default function handler(req, res) {
    if (req.method === "GET") {
      const assessments = [
        {
          id: 1,
          title: "Avaliação 1",
          status: "completed",
          score: 85,
          category: "security",
          question: {
            text: "Como você avalia a segurança do sistema?",
            id: 101,
          },
        },
        {
          id: 2,
          title: "Avaliação 2",
          status: "in_progress",
          score: 70,
          category: "privacy",
          question: {
            text: "Como você avalia a privacidade dos dados?",
            id: 102,
          },
        },
        {
          id: 3,
          title: "Avaliação 3",
          status: "completed",
          score: 90,
          category: "compliance",
          question: {
            text: "A conformidade com as regulamentações está sendo seguida?",
            id: 103,
          },
        },
      ];
  
      const { status, date_from, date_to, category } = req.query;
  
      console.log("Parâmetros recebidos:", { status, date_from, date_to, category });
  
      // Filtrando as avaliações com base nos parâmetros fornecidos
      const filteredAssessments = assessments.filter((assessment) => {
        let matches = true;
  
        if (status && assessment.status !== status) {
          matches = false;
        }
        if (category && assessment.category !== category) {
          matches = false;
        }
  
        // Filtro de data (caso os dados de data sejam fornecidos)
        if (date_from && new Date(assessment.date) < new Date(date_from)) {
          matches = false;
        }
        if (date_to && new Date(assessment.date) > new Date(date_to)) {
          matches = false;
        }
  
        return matches;
      });
  
      console.log("Avaliações filtradas:", filteredAssessments);  // Verifique os dados filtrados
  
      res.status(200).json(filteredAssessments);
    } else {
      res.status(405).json({ message: "Método não permitido" });
    }
  }
  
  