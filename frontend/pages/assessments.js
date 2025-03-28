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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      
      // Encontra perguntas não respondidas
      const unanswered = questions.filter(q => {
        const response = responses[q.id];
        return !response?.politica || !response?.pratica;
      });
  
      if (unanswered.length > 0) {
        
        // Cria mensagem detalhada
        let alertMessage = `Por favor, responda todas as perguntas antes de enviar.\n\nFaltam ${unanswered.length} perguntas:\n\n`;
        
        // Adiciona cada pergunta faltante à mensagem
        unanswered.forEach((q, index) => {
          const categoryName = getCategoryName(q.category.split('.')[0]);
          alertMessage += `${index + 1}. [${categoryName}] ${q.text}\n`;
          
          // Adiciona quais campos estão faltando
          const missingFields = [];
          if (!responses[q.id]?.politica) missingFields.push('Política');
          if (!responses[q.id]?.pratica) missingFields.push('Prática');
          
          alertMessage += `   (Faltando: ${missingFields.join(' e ')})\n\n`;
        });
  
        alert(alertMessage);
        return;
      }
  
      const token = getAuthToken();
      if (!token) {
        alert('Sua sessão expirou. Por favor, faça login novamente.');
        window.location.href = '/login';
        return;
      }

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
    } finally {
      setIsSubmitting(false);
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
    labels: categories.map(cat => {
      const nistMapping = {
        "GV": "Governança (GV)",
        "ID": "Identificar (ID)",
        "PR": "Proteger (PR)",
        "DE": "Detectar (DE)",
        "RS": "Responder (RS)",
        "RC": "Recuperar (RC)"
      };
      return nistMapping[cat] || cat;
    }),
    datasets: [
      {
        label: 'Objetivos',
        data: categories.map(cat => report?.scores[cat]?.objetivos || 0),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 159, 64, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Política',
        data: categories.map(cat => report?.scores[cat]?.politica || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Prática',
        data: categories.map(cat => report?.scores[cat]?.pratica || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)',
          lineWidth: 1
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: '#555',
          font: {
            size: 12,
            weight: 'bold'
          },
          callback: function(value) {
            const levelDescriptions = {
              1: 'Inicial',
              2: 'Repetido',
              3: 'Definido',
              4: 'Gerenciado',
              5: 'Otimizado'
            };
            return `${value} - ${levelDescriptions[value] || ''}`;
          }
        },
        grid: {
          circular: true,
          color: 'rgba(200, 200, 200, 0.5)',
          lineWidth: 1
        },
        pointLabels: {
          font: {
            size: 13,
            weight: 'bold'
          },
          color: '#333',
          padding: 15
        },
        startAngle: 0
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function(context) {
            const levelDescriptions = {
              1: 'Inicial',
              2: 'Repetido',
              3: 'Definido',
              4: 'Gerenciado',
              5: 'Otimizado'
            };
            return `${context.dataset.label}: ${context.raw} (${levelDescriptions[context.raw] || ''})`;
          },
          afterLabel: function(context) {
            const nistExplanations = {
              "GV": "Governança - Estabelecimento de políticas e procedimentos",
              "ID": "Identificar - Compreensão dos riscos à privacidade",
              "PR": "Proteger - Implementação de salvaguardas",
              "DE": "Detectar - Identificação de eventos de segurança",
              "RS": "Responder - Ações para incidentes de privacidade",
              "RC": "Recuperar - Restauração após violações"
            };
            const category = context.label.replace(/\(([^)]+)\)/, '$1').trim();
            return `\n${nistExplanations[category] || ''}`;
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.1
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
    <>
      {/* Barra de progresso fixa no topo */}
      <div className={styles.progressContainerFixed}>
        <div 
          className={styles.progressBarFixed} 
          style={{ width: `${progress}%` }}
        ></div>
        <span className={styles.progressTextFixed}>
          {progress}% completo ({Object.keys(responses).filter(
            qId => responses[qId]?.politica && responses[qId]?.pratica
          ).length}/{questions.length} perguntas)
        </span>
      </div>

      {/* Container principal */}
      <div className={styles.container}>
        <h1 className={styles.title}>Avaliação de Maturidade em LGPD</h1>
        
        {!showReport ? (
          <>
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Salvar Respostas'}
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
              <div style={{ height: '500px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <Radar data={radarData} options={radarOptions} />
              </div>
              
              <div className={styles.legendContainer}>
                <h3>Legenda do Nível de Maturidade:</h3>
                <ul className={styles.maturityLevels}>
                  <li><strong>5 - Otimizado:</strong> Processos continuamente melhorados</li>
                  <li><strong>4 - Gerenciado:</strong> Processos medidos e controlados</li>
                  <li><strong>3 - Definido:</strong> Processos documentados e padronizados</li>
                  <li><strong>2 - Repetido:</strong> Processos informais e ad hoc</li>
                  <li><strong>1 - Inicial:</strong> Processos não existentes ou caóticos</li>
                </ul>
                
                <h3>Domínios NIST:</h3>
                <ul className={styles.nistDomains}>
                  <li><strong>GV - Governança:</strong> Estrutura de privacidade organizacional</li>
                  <li><strong>ID - Identificar:</strong> Mapeamento de dados e riscos</li>
                  <li><strong>PR - Proteger:</strong> Controles de segurança de dados</li>
                  <li><strong>DE - Detectar:</strong> Monitoramento de eventos de privacidade</li>
                  <li><strong>RS - Responder:</strong> Plano de resposta a incidentes</li>
                  <li><strong>RC - Recuperar:</strong> Plano de recuperação pós-incidente</li>
                </ul>
              </div>
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
    </>
  );
};

export default Assessment;