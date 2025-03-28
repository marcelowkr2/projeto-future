export const recomendacoesPorNivel = {
  1: {
    titulo: "Recomendações para Nível Inicial",
    politicas: [
      "Desenvolver políticas formais de proteção de dados alinhadas com a LGPD",
      "Criar um comitê de privacidade e proteção de dados",
      "Estabelecer um programa básico de conscientização sobre privacidade",
      "Definir responsáveis pelo tratamento de dados (DPO)"
    ],
    praticas: [
      "Mapear todos os fluxos de dados pessoais na organização",
      "Identificar e documentar os ativos de dados críticos",
      "Implementar controles básicos de segurança da informação",
      "Criar um registro de operações de dados pessoais"
    ],
    equipamentos: [
      "Firewalls básicos para proteção de rede",
      "Antivírus corporativo",
      "Sistema de backup inicial",
      "Ferramentas básicas de controle de acesso"
    ],
    investimento: "Baixo (até R$ 20.000)"
  },
  2: {
    titulo: "Recomendações para Nível Repetido",
    politicas: [
      "Atualizar políticas existentes conforme novas regulamentações",
      "Implementar processo formal de revisão anual de políticas",
      "Estabelecer diretrizes para tratamento de exceções",
      "Criar política de retenção e descarte de dados"
    ],
    praticas: [
      "Documentar processos existentes de proteção de dados",
      "Realizar avaliações periódicas de conformidade",
      "Implementar treinamentos regulares para colaboradores",
      "Estabelecer processo de notificação de incidentes"
    ],
    equipamentos: [
      "Soluções de criptografia para dados sensíveis",
      "Sistema de detecção básico de intrusões (IDS)",
      "Ferramentas de monitoramento de rede",
      "Sistema de gerenciamento de vulnerabilidades básico"
    ],
    investimento: "Moderado (R$ 20.000 - R$ 100.000)"
  },
  3: {
    titulo: "Recomendações para Nível Definido",
    politicas: [
      "Implementar sistema de gestão de privacidade documentado",
      "Estabelecer métricas para avaliação de políticas",
      "Criar procedimentos para tratamento de exceções",
      "Implementar política de avaliação de fornecedores"
    ],
    praticas: [
      "Automatizar partes do processo de conformidade",
      "Implementar sistema de gestão de consentimento",
      "Realizar avaliações de impacto regularmente",
      "Documentar evidências de conformidade de forma sistemática"
    ],
    equipamentos: [
      "Ferramentas de DLP (Prevenção de Perda de Dados)",
      "Sistemas de SIEM básicos",
      "Plataforma de gestão de consentimento",
      "Ferramentas de automação de conformidade"
    ],
    investimento: "Intermediário (R$ 100.000 - R$ 300.000)"
  },
  4: {
    titulo: "Recomendações para Nível Gerenciado",
    politicas: [
      "Integrar políticas de privacidade com estratégia de negócios",
      "Implementar revisões contínuas de políticas",
      "Estabelecer métricas avançadas de desempenho",
      "Criar políticas específicas por departamento"
    ],
    praticas: [
      "Implementar monitoramento contínuo de conformidade",
      "Automatizar coleta de evidências de conformidade",
      "Realizar benchmarking com melhores práticas do setor",
      "Implementar programa avançado de treinamentos"
    ],
    equipamentos: [
      "Sistemas de SIEM avançados",
      "Plataformas integradas de governança de dados",
      "Ferramentas de análise de comportamento do usuário (UEBA)",
      "Soluções de orquestração de segurança"
    ],
    investimento: "Alto (R$ 300.000 - R$ 500.000)"
  },
  5: {
    titulo: "Recomendações para Nível Otimizado",
    politicas: [
      "Manter processo contínuo de melhoria de políticas",
      "Implementar análise preditiva de riscos à privacidade",
      "Integrar políticas de privacidade com estratégia de negócios",
      "Estabelecer políticas proativas baseadas em inteligência de ameaças"
    ],
    praticas: [
      "Automatizar completamente a coleta de evidências de conformidade",
      "Implementar análise avançada de métricas de privacidade",
      "Manter programa contínuo de inovação em privacidade",
      "Implementar processos de autorremediação"
    ],
    equipamentos: [
      "Soluções avançadas de IA para proteção de dados",
      "Sistemas de prevenção de perda de dados (DLP) com machine learning",
      "Plataforma integrada de governança de dados",
      "Ferramentas de threat intelligence integradas"
    ],
    investimento: "Muito Alto (acima de R$ 500.000)"
  }
};

export const getExpectativaPolitica = (nivel) => {
  const expectativas = [
    "A política ou o padrão NÃO existe ou NÃO é formalmente aprovada",
    "A política existe, mas NÃO é revisada há mais de 2 anos",
    "Política existe com aprovação formal, exceções <5%",
    "Política formal com exceções <3% documentadas",
    "Política formal com exceções <0,5% documentadas"
  ];
  return expectativas[nivel - 1] || expectativas[0];
};

export const getExpectativaPratica = (nivel) => {
  const expectativas = [
    "O processo padrão NÃO existe",
    "Processo existe mas é executado informalmente",
    "Processo formal documentado, exceções <10%",
    "Processo com métricas, exceções <5%",
    "Processo com métricas detalhadas, exceções <1%"
  ];
  return expectativas[nivel - 1] || expectativas[0];
};