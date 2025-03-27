import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { getAuthToken } from '../utils/auth';
import { Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';
import styles from '../styles/Assessment.module.css';

// Registra os componentes do Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [categories, setCategories] = useState([]);

  // Função para traduzir códigos de categoria
  const getCategoryName = (code) => {
    const names = {
      "GV": "Governança",
      "ID": "Identificar",
      "PR": "Proteger",
      "DE": "Detectar",
      "RS": "Responder",
      "RC": "Recuperar"
    };
    return names[code] || code;
  };

  // Carrega as questões da API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = getAuthToken();
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await API.get('/assessments/questions/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Formato de dados inválido da API');
        }

        setQuestions(response.data);
        
        // Extrai e define as categorias únicas
        const uniqueCategories = [...new Set(
          response.data.map(q => q.category.split('.')[0])
        )];
        setCategories(uniqueCategories);
        
        // Define a primeira categoria como ativa
        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0]);
        }
      } catch (err) {
        console.error('Erro ao carregar questões:', err);
        setError(err.message || 'Erro ao carregar as questões. Tente recarregar a página.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Calcula o progresso das respostas
  useEffect(() => {
    if (questions.length > 0) {
      const answered = Object.keys(responses).filter(
        qId => responses[qId]?.politica && responses[qId]?.pratica
      ).length;
      setProgress(Math.round((answered / questions.length) * 100));
    }
  }, [responses, questions]);

  // Manipula mudanças nas respostas
  const handleResponseChange = (questionId, type, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [type]: parseInt(value, 10)
      }
    }));
  };

  // Valida e envia as respostas
  const handleSubmit = async () => {
    try {
      const unanswered = questions.filter(
        q => !responses[q.id]?.politica || !responses[q.id]?.pratica
      );
      
      if (unanswered.length > 0) {
        alert(`Por favor, responda todas as perguntas antes de enviar. Faltam ${unanswered.length} perguntas.`);
        return;
      }
  
      const token = getAuthToken();
      const csrfToken = document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
  
      const formattedResponses = Object.entries(responses).map(([questionId, values]) => ({
        question: questionId,
        ...values
      }));
  
      const response = await API.post('/assessments/submit/', formattedResponses, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'X-CSRFToken': csrfToken 
        }
      });
      
      if (response.status === 200) {
        alert('Respostas enviadas com sucesso!');
      }
    } catch (err) {
      console.error('Erro ao enviar respostas:', err);
      alert('Erro ao enviar respostas. Por favor, tente novamente.');
    }
  };

  // Gera o relatório de conformidade
  const generateReport = async () => {
    try {
      const token = getAuthToken();
      const response = await API.get('/assessments/reports/lgpd_score/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.data) {
        throw new Error('Dados do relatório não recebidos');
      }
      
      setReport(response.data);
      setShowReport(true);
    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
      alert('Erro ao gerar relatório. Verifique se todas as perguntas foram respondidas.');
    }
  };

  // Configuração do gráfico radar
  const radarData = {
    labels: categories.map(getCategoryName),
    datasets: [
      {
        label: 'Pontuação por Categoria',
        data: categories.map(cat => report?.scores[cat]?.total || 0),
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(52, 152, 219, 1)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Score: ${context.raw}/5`;
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando questões...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Erro ao carregar a avaliação</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Avaliação de Maturidade em LGPD</h1>
      
      {!showReport ? (
        <>
          <div className={styles.progressContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progress}%` }}
            ></div>
            <span className={styles.progressText}>
              {progress}% completo ({Object.keys(responses).filter(
                qId => responses[qId]?.politica && responses[qId]?.pratica
              ).length}/{questions.length} perguntas)
            </span>
          </div>
          
          <div className={styles.categoryMenu}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.active : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>
          
          <div className={styles.questionsContainer}>
            {questions
              .filter(q => q.category.startsWith(activeCategory))
              .map(question => (
                <div key={question.id} className={styles.questionCard}>
                  <h3 className={styles.questionText}>{question.text}</h3>
                  <p className={styles.questionCategory}>
                    {question.category}
                  </p>
                  
                  <div className={styles.responseSection}>
                    <h4>Política</h4>
                    <select
                      value={responses[question.id]?.politica || ''}
                      onChange={(e) => handleResponseChange(
                        question.id, 
                        'politica', 
                        e.target.value
                      )}
                      className={styles.responseSelect}
                    >
                      <option value="">Selecione o nível</option>
                      <option value="1">1 - Inicial</option>
                      <option value="2">2 - Repetido</option>
                      <option value="3">3 - Definido</option>
                      <option value="4">4 - Gerenciado</option>
                      <option value="5">5 - Otimizado</option>
                    </select>
                  </div>
                  
                  <div className={styles.responseSection}>
                    <h4>Prática</h4>
                    <select
                      value={responses[question.id]?.pratica || ''}
                      onChange={(e) => handleResponseChange(
                        question.id, 
                        'pratica', 
                        e.target.value
                      )}
                      className={styles.responseSelect}
                    >
                      <option value="">Selecione o nível</option>
                      <option value="1">1 - Inicial</option>
                      <option value="2">2 - Repetido</option>
                      <option value="3">3 - Definido</option>
                      <option value="4">4 - Gerenciado</option>
                      <option value="5">5 - Otimizado</option>
                    </select>
                  </div>
                </div>
              ))}
          </div>
          
          <div className={styles.buttonsContainer}>
            <button 
              onClick={handleSubmit}
              className={styles.submitButton}
            >
              Salvar Respostas
            </button>
            
            <button 
              onClick={generateReport}
              className={styles.reportButton}
              disabled={progress < 100}
              title={progress < 100 ? 'Responda todas as perguntas para gerar o relatório' : ''}
            >
              Gerar Relatório LGPD
            </button>
          </div>
        </>
      ) : (
        <div className={styles.reportContainer}>
          <h2 className={styles.reportTitle}>
            Relatório de Conformidade com a LGPD
          </h2>
          
          <div className={styles.scoreSummary}>
            <Radar data={radarData} options={radarOptions} height={400} />
          </div>
          
          <button 
            onClick={() => setShowReport(false)} 
            className={styles.backButton}
          >
            Voltar para a avaliação
          </button>
        </div>
      )}
    </div>
  );
};

export default Assessment;
