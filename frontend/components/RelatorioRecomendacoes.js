import React from 'react';
import { getCategoryName } from '../services/recomendacoes';
import styles from '../styles/Relatorio.module.css';

const RelatorioRecomendacoes = ({ report }) => {
  const { scores, recomendacoes, nivelGeral, resumo } = report;

  return (
    <div className={styles.relatorioContainer}>
      <div className={styles.cabecalho}>
        <h2>Relatório de Maturidade LGPD</h2>
        <div className={styles.nivelGeral}>
          Nível Geral: <span>{nivelGeral} - {getNivelDescricao(nivelGeral)}</span>
        </div>
      </div>

      <div className={styles.resumoExecutivo}>
        <h3>Resumo Executivo</h3>
        <p>{resumo}</p>
      </div>

      <div className={styles.quadroScores}>
        <h3>Desempenho por Dimensão</h3>
        <div className={styles.scoresGrid}>
          {Object.entries(scores).map(([categoria, score]) => (
            <div key={categoria} className={styles.scoreItem}>
              <h4>{getCategoryName(categoria)}</h4>
              <div className={styles.scoreBar}>
                <div 
                  className={styles.scoreFill} 
                  style={{ width: `${score.total * 20}%` }}
                ></div>
                <span>{score.total.toFixed(1)}</span>
              </div>
              <div className={styles.scoreDetails}>
                <span>Política: {score.politica}</span>
                <span>Prática: {score.pratica}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {recomendacoes.pontosFracos.length > 0 && (
        <div className={styles.areaMelhoria}>
          <h3>Áreas Prioritárias para Melhoria</h3>
          {recomendacoes.pontosFracos.map((item, index) => (
            <div key={index} className={styles.melhoriaItem}>
              <div className={styles.melhoriaHeader}>
                <h4>{getCategoryName(item.categoria)}</h4>
                <span className={styles.nivelTag}>{item.nivel === 'baixo' ? 'Crítico' : 'Necessita melhoria'}</span>
              </div>
              <div className={styles.scoreContainer}>
                <div className={styles.scoreMeter}>
                  <div 
                    className={styles.meterFill} 
                    style={{ width: `${item.score.total * 20}%` }}
                  ></div>
                </div>
                <span className={styles.scoreValue}>{item.score.total.toFixed(1)}</span>
              </div>
              <ul className={styles.recomendacoesList}>
                {item.recomendacoes.map((recomendacao, i) => (
                  <li key={i}>
                    <input type="checkbox" id={`rec-${index}-${i}`} />
                    <label htmlFor={`rec-${index}-${i}`}>{recomendacao}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {recomendacoes.pontosFortes.length > 0 && (
        <div className={styles.areaForte}>
          <h3>Áreas de Excelência</h3>
          <div className={styles.pontosFortesGrid}>
            {recomendacoes.pontosFortes.map((item, index) => (
              <div key={index} className={styles.forteItem}>
                <h4>{getCategoryName(item.categoria)}</h4>
                <div className={styles.forteScore}>{item.score.total.toFixed(1)}</div>
                <p className={styles.forteDescricao}>
                  {getFeedbackPositivo(item.categoria, item.score)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.planoAcao}>
        <h3>Plano de Ação Prioritário</h3>
        <ol className={styles.prioridadesList}>
          {recomendacoes.prioridades.map((item, index) => (
            <li key={index}>
              <span className={styles.prioridadeIndex}>{index + 1}</span>
              <span className={styles.prioridadeText}>{item}</span>
            </li>
          ))}
        </ol>

        <h4>Investimentos Recomendados em Tecnologia</h4>
        <div className={styles.equipamentosGrid}>
          {recomendacoes.equipamentos.map((item, index) => (
            <div key={index} className={styles.equipamentoItem}>
              <input 
                type="checkbox" 
                id={`equip-${index}`} 
                className={styles.equipamentoCheckbox}
              />
              <label htmlFor={`equip-${index}`} className={styles.equipamentoLabel}>
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Funções auxiliares do componente
function getNivelDescricao(nivel) {
  const descricoes = {
    1: "Inicial - Processos não existentes ou ad hoc",
    2: "Repetido - Processos executados informalmente",
    3: "Definido - Processos documentados e padronizados",
    4: "Gerenciado - Processos medidos e controlados",
    5: "Otimizado - Melhoria contínua baseada em métricas"
  };
  return descricoes[nivel] || "";
}

function getFeedbackPositivo(categoria, score) {
  const feedbacks = {
    GV: "Excelente estrutura de governança de dados, com políticas bem definidas e implementadas.",
    ID: "Mapeamento completo dos dados pessoais e sistemas relacionados, com classificação adequada.",
    PR: "Controles robustos de proteção de dados implementados em toda a organização.",
    DE: "Sistema eficiente de detecção de incidentes e monitoramento contínuo.",
    RS: "Processos bem estabelecidos para resposta a incidentes de privacidade.",
    RC: "Capacidade comprovada de recuperação após violações de dados."
  };

  let feedback = feedbacks[categoria] || "Desempenho exemplar nesta dimensão.";
  
  if (score.politica - score.pratica > 0.5) {
    feedback += " Pode melhorar ainda mais com maior implementação prática das políticas.";
  } else if (score.pratica - score.politica > 0.5) {
    feedback += " Considere documentar melhor as práticas existentes em políticas formais.";
  }

  return feedback;
}

export default RelatorioRecomendacoes;