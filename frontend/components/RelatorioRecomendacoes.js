import { recomendacoesPorNivel, getExpectativaPolitica, getExpectativaPratica } from '../services/recomendacoes';
import RecomendacoesIA from './RecomendacoesIA';
import styles from '../styles/Relatorio.module.css';

const RelatorioRecomendacoes = ({ scores }) => {
  // Calcular nível médio de maturidade
  const nivelMedio = Math.round(
    Object.values(scores).reduce((sum, cat) => sum + cat.total, 0) / 
    Object.keys(scores).length
  );

  // Obter recomendações para o nível médio
  const recomendacoes = recomendacoesPorNivel[nivelMedio] || recomendacoesPorNivel[1];

  return (
    <div className={styles.relatorioContainer}>
      <h2>Relatório de Recomendações - Nível {nivelMedio}</h2>
      
      <div className={styles.nivelSection}>
        <h3>Diagnóstico Atual</h3>
        <div className={styles.nivelInfo}>
          <p><strong>Nível de Maturidade:</strong> {nivelMedio}</p>
          <p><strong>Expectativa para Políticas:</strong> {getExpectativaPolitica(nivelMedio)}</p>
          <p><strong>Expectativa para Práticas:</strong> {getExpectativaPratica(nivelMedio)}</p>
        </div>
      </div>
      
      <div className={styles.recomendacaoSection}>
        <h3>Recomendações Estratégicas</h3>
        
        <div className={styles.recomendacaoBox}>
          <h4>Para Melhorar suas Políticas:</h4>
          <ul>
            {recomendacoes.politicas.map((item, index) => (
              <li key={index}>
                <span className={styles.recomendacaoNumber}>{index + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.recomendacaoBox}>
          <h4>Para Melhorar suas Práticas:</h4>
          <ul>
            {recomendacoes.praticas.map((item, index) => (
              <li key={index}>
                <span className={styles.recomendacaoNumber}>{index + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.recomendacaoBox}>
          <h4>Investimentos em Tecnologia Recomendados:</h4>
          <ul>
            {recomendacoes.equipamentos.map((item, index) => (
              <li key={index}>
                <span className={styles.recomendacaoNumber}>{index + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.investimentoBox}>
          <h4>Nível de Investimento Estimado:</h4>
          <p>{recomendacoes.investimento}</p>
          <p className={styles.investimentoDetail}>
            * Valores estimados para implementação básica em organizações médias
          </p>
        </div>
      </div>
      
      <div className={styles.iaSection}>
        <RecomendacoesIA nivel={nivelMedio} scores={scores} />
      </div>
    </div>
  );
};

export default RelatorioRecomendacoes;