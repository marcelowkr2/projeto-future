// Mapeamento de nomes de categorias
const categoryNames = {
  "GV": "Governança",
  "ID": "Identificar",
  "PR": "Proteger",
  "DE": "Detectar",
  "RS": "Responder",
  "RC": "Recuperar"
};

export const getCategoryName = (code) => categoryNames[code] || code;

// Recomendações baseadas em critérios específicos
const recomendacoesPorCategoria = {
  GV: {
    baixo: [
      "Criar política formal de governança de dados",
      "Designar um Encarregado de Dados (DPO)",
      "Estabelecer comitê de privacidade"
    ],
    medio: [
      "Atualizar política de governança",
      "Realizar treinamentos regulares para o comitê",
      "Implementar sistema de monitoramento de conformidade"
    ],
    alto: [
      "Implementar governança como parte da estratégia organizacional",
      "Realizar benchmarking com melhores práticas do setor",
      "Automatizar processos de monitoramento de conformidade"
    ]
  },
  ID: {
    baixo: [
      "Mapear todos os fluxos de dados pessoais",
      "Identificar sistemas que processam dados pessoais",
      "Criar inventário de dados pessoais"
    ],
    medio: [
      "Atualizar mapeamento de fluxos de dados trimestralmente",
      "Classificar dados por nível de sensibilidade",
      "Implementar ferramenta de descoberta de dados"
    ],
    alto: [
      "Automatizar descoberta e classificação de dados",
      "Integrar inventário de dados com sistemas de segurança",
      "Implementar análise contínua de riscos à privacidade"
    ]
  },
  // [...] (adicionar outras categorias seguindo o mesmo padrão)
};

// Gerador de recomendações personalizadas
export const getRecomendacoesPersonalizadas = (responses, questions) => {
  // 1. Calcular scores por categoria
  const scores = {};
  const categorias = {};

  // Agrupar perguntas por categoria
  questions.forEach(question => {
    const categoria = question.category.split('.')[0];
    if (!categorias[categoria]) {
      categorias[categoria] = [];
    }
    categorias[categoria].push(question);
  });

  // Calcular médias para cada categoria
  Object.entries(categorias).forEach(([categoria, perguntas]) => {
    let sumPolitica = 0;
    let sumPratica = 0;
    let count = 0;

    perguntas.forEach(pergunta => {
      if (responses[pergunta.id]) {
        sumPolitica += responses[pergunta.id].politica;
        sumPratica += responses[pergunta.id].pratica;
        count++;
      }
    });

    const avgPolitica = count > 0 ? sumPolitica / count : 0;
    const avgPratica = count > 0 ? sumPratica / count : 0;
    const total = (avgPolitica + avgPratica) / 2;

    scores[categoria] = {
      politica: parseFloat(avgPolitica.toFixed(1)),
      pratica: parseFloat(avgPratica.toFixed(1)),
      total: parseFloat(total.toFixed(1))
    };
  });

  // 2. Identificar pontos fortes e fracos
  const pontosFracos = [];
  const pontosFortes = [];
  const prioridades = [];

  Object.entries(scores).forEach(([categoria, score]) => {
    if (score.total < 2.5) {
      const nivel = 'baixo';
      pontosFracos.push({
        categoria,
        score,
        recomendacoes: recomendacoesPorCategoria[categoria]?.[nivel] || [],
        nivel
      });
      prioridades.push(`Prioridade máxima: ${getCategoryName(categoria)}`);
    } else if (score.total < 3.5) {
      const nivel = 'medio';
      pontosFracos.push({
        categoria,
        score,
        recomendacoes: recomendacoesPorCategoria[categoria]?.[nivel] || [],
        nivel
      });
      prioridades.push(`Melhorar: ${getCategoryName(categoria)}`);
    } else {
      pontosFortes.push({
        categoria,
        score,
        nivel: 'alto'
      });
    }
  });

  // 3. Sugerir equipamentos baseado no nível geral
  const nivelGeral = calcularNivelGeral(scores);
  const equipamentos = sugerirEquipamentos(nivelGeral, pontosFracos);

  // 4. Gerar resumo executivo
  const resumo = gerarResumoExecutivo(scores, pontosFracos, pontosFortes);

  return {
    scores,
    recomendacoes: {
      pontosFracos,
      pontosFortes,
      prioridades,
      equipamentos
    },
    nivelGeral,
    resumo
  };
};

// Funções auxiliares
function calcularNivelGeral(scores) {
  const valores = Object.values(scores).map(s => s.total);
  const media = valores.reduce((a, b) => a + b, 0) / valores.length;
  
  if (media < 2) return 1;
  if (media < 3) return 2;
  if (media < 4) return 3;
  if (media < 4.5) return 4;
  return 5;
}

function sugerirEquipamentos(nivelGeral, pontosFracos) {
  const equipamentosBase = {
    1: [
      "Firewall básico",
      "Antivírus corporativo",
      "Sistema de backup local"
    ],
    2: [
      "Firewall de próxima geração",
      "Sistema de detecção de intrusões (IDS)",
      "Ferramentas de criptografia"
    ],
    3: [
      "Plataforma integrada de governança de dados",
      "Ferramentas de DLP (Data Loss Prevention)",
      "Sistema SIEM básico"
    ],
    4: [
      "Sistema SIEM avançado",
      "Ferramentas de análise comportamental (UEBA)",
      "Plataforma de gestão de identidade e acesso"
    ],
    5: [
      "Solução completa de governança de dados",
      "Ferramentas de IA para proteção de dados",
      "Sistema de orquestração de segurança"
    ]
  };

  // Adicionar equipamentos específicos para pontos fracos
  const extras = [];
  pontosFracos.forEach(ponto => {
    if (ponto.categoria === 'PR' && ponto.nivel === 'baixo') {
      extras.push("Solução avançada de proteção de endpoints");
    }
    if (ponto.categoria === 'DE') {
      extras.push("Ferramentas de monitoramento contínuo");
    }
  });

  return [...equipamentosBase[nivelGeral], ...new Set(extras)];
}

function gerarResumoExecutivo(scores, pontosFracos, pontosFortes) {
  const piorCategoria = pontosFracos.reduce((prev, current) => 
    (prev.score.total < current.score.total) ? prev : current, pontosFracos[0]);
  
  const melhorCategoria = pontosFortes.reduce((prev, current) => 
    (prev.score.total > current.score.total) ? prev : current, pontosFortes[0]);

  return `Sua organização demonstra ${melhorCategoria ? `boa capacidade em ${getCategoryName(melhorCategoria.categoria)}` : 'algumas áreas bem desenvolvidas'}, 
  porém apresenta ${piorCategoria ? `deficiências críticas em ${getCategoryName(piorCategoria.categoria)}` : 'áreas que necessitam de atenção imediata'}. 
  Recomendamos priorizar ${piorCategoria ? piorCategoria.recomendacoes[0] : 'a criação de políticas básicas'} para alcançar conformidade plena com a LGPD.`;
}