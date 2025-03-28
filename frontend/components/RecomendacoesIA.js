import { useState, useEffect } from 'react';
import styles from '../styles/Relatorio.module.css';

const RecomendacoesIA = ({ nivel, scores }) => {
  const [recomendacoesIA, setRecomendacoesIA] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const gerarRecomendacoesIA = async () => {
      setLoading(true);
      
      try {
        // Simulação de chamada à API de IA
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const categoriasBaixas = Object.entries(scores)
          .filter(([_, score]) => score.total < nivel)
          .map(([cat]) => cat);
        
        if (categoriasBaixas.length > 0) {
          setRecomendacoesIA(`Baseado na sua avaliação, recomendamos focar especialmente nas áreas de: 
          ${categoriasBaixas.join(", ")}. Estas categorias estão abaixo do seu nível médio 
          de maturidade e representam oportunidades significativas de melhoria.`);
        } else {
          setRecomendacoesIA("Sua organização demonstra maturidade equilibrada em todas as categorias. Recomendamos focar em iniciativas de otimização contínua e benchmarking com melhores práticas do setor.");
        }
      } catch (error) {
        setRecomendacoesIA("Não foi possível gerar recomendações personalizadas no momento.");
      }
      
      setLoading(false);
    };

    gerarRecomendacoesIA();
  }, [nivel, scores]);

  return (
    <div className={styles.iaContainer}>
      {loading ? (
        <div className={styles.loadingIA}>
          <div className={styles.spinner}></div>
          <p>Analisando dados e gerando recomendações personalizadas...</p>
        </div>
      ) : (
        <div className={styles.iaContent}>
          <h4>Análise Inteligente:</h4>
          <p>{recomendacoesIA}</p>
          {recomendacoesIA.includes("recomendamos focar") && (
            <div className={styles.iaTips}>
              <p><strong>Dica:</strong> Priorize as áreas com maior defasagem para obter ganhos rápidos de maturidade.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecomendacoesIA;