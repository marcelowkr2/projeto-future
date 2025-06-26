import React, { useState, useEffect, useRef } from 'react';
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
import { PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import RelatorioRecomendacoes from '../components/RelatorioRecomendacoes';
import PDFGenerator from '../components/PDFGenerator';
import { getRecomendacoesPersonalizadas } from '../services/recomendacoes';
import styles from '../styles/Assessment.module.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [radarImage, setRadarImage] = useState(null);
  const radarChartRef = useRef();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();

        if (!token) {
          throw new Error('Autenticação necessária');
        }

        const response = await API.get('/assessments/questions/', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!response.data) {
          throw new Error('Dados inválidos da API');
        }

        setQuestions(response.data);

        const uniqueCategories = [...new Set(
          response.data.map(q => q.category.split('.')[0])
        )];
        setCategories(uniqueCategories);

        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0]);
        }
      } catch (err) {
        console.error('Erro ao carregar questões:', err);
        setError(err.message || 'Erro ao carregar avaliação');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length) {
      const randomResponses = {};
      questions.forEach(q => {
        randomResponses[q.id] = {
          politica: Math.floor(Math.random() * 5) + 1,
          pratica: Math.floor(Math.random() * 5) + 1,
        };
      });
      setResponses(randomResponses);
    }
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0) {
      const answered = Object.keys(responses).filter(
        qId => responses[qId]?.politica && responses[qId]?.pratica
      ).length;
      setProgress(Math.round((answered / questions.length) * 100));
    }
  }, [responses, questions]);

  const handleResponseChange = (questionId, type, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [type]: parseInt(value, 10)
      }
    }));
    setUnansweredQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const unanswered = questions.filter(q => {
        const response = responses[q.id];
        return !response?.politica || !response?.pratica;
      });

      if (unanswered.length > 0) {
        setUnansweredQuestions(unanswered);
        window.scrollTo(0, 0);

        let alertMessage = `Faltam responder ${unanswered.length} pergunta(s):\n\n`;
        unanswered.forEach((q, index) => {
          const missing = [];
          if (!responses[q.id]?.politica) missing.push('Política');
          if (!responses[q.id]?.pratica) missing.push('Prática');

          alertMessage += `${index + 1}. ${q.text} [${getCategoryName(q.category.split('.')[0])}]\n(Faltando: ${missing.join(' e ')})\n\n`;
        });

        alert(alertMessage);
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

      await API.post('/assessments/submit/', formattedResponses, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-CSRFToken': csrfToken
        }
      });

      alert('Respostas salvas com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar respostas:', err);
      alert('Erro ao salvar respostas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateReport = async () => {
    try {
      const unanswered = questions.filter(q => {
        const response = responses[q.id];
        return !response?.politica || !response?.pratica;
      });

      if (unanswered.length > 0) {
        setUnansweredQuestions(unanswered);
        window.scrollTo(0, 0);
        alert(`Existem ${unanswered.length} pergunta(s) não respondidas.`);
        return;
      }

      const reportData = getRecomendacoesPersonalizadas(responses, questions);
      setReport(reportData);
      setShowReport(true);

      // Captura do gráfico após o relatório ser renderizado
      setTimeout(async () => {
        try {
          const canvas = await html2canvas(radarChartRef.current, {
            scale: 2,
            logging: false,
            useCORS: true
          });
          setRadarImage(canvas.toDataURL('image/png'));
        } catch (err) {
          console.error('Erro ao capturar gráfico:', err);
        }
      }, 500);

    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
      alert('Erro ao gerar relatório. Verifique o console para mais detalhes.');
    }
  };

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
        label: 'Política',
        data: categories.map(cat => report?.scores[cat]?.politica || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(209, 20, 20)',
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
      }
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
          callback: function (value) {
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
        <p>Carregando avaliação...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Erro ao carregar avaliação</h3>
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

      <div className={styles.container}>
        {unansweredQuestions.length > 0 && (
          <div className={styles.unansweredAlert}>
            <h3>Perguntas pendentes</h3>
            <ul>
              {unansweredQuestions.map((q, index) => (
                <li key={index}>
                  <strong>{q.text} [{getCategoryName(q.category.split('.')[0])}]</strong>
                  <div className={styles.missingFields}>
                    {!responses[q.id]?.politica && <span>Política</span>}
                    {!responses[q.id]?.pratica && <span>Prática</span>}
                  </div>
                  <button
                    onClick={() => {
                      document.getElementById(`question-${q.id}`)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                    className={styles.jumpToButton}
                  >
                    Ir para pergunta
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setUnansweredQuestions([])}
              className={styles.closeButton}
            >
              Fechar
            </button>
          </div>
        )}

        {!showReport ? (
          <>
            <h1 className={styles.title}>Avaliação de Maturidade LGPD</h1>

            <div className={styles.categoryMenu}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''
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
                  <div
                    key={question.id}
                    id={`question-${question.id}`}
                    className={styles.questionCard}
                  >
                    <h3 className={styles.questionText}>{question.text}</h3>
                    <p className={styles.questionCategory}>
                      Categoria: {getCategoryName(question.category.split('.')[0])} ({question.category})
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
                        <option value="">Selecione...</option>
                        {[1, 2, 3, 4, 5].map(opt => (
                          <option key={`pol-${opt}`} value={opt}>
                            {opt} - {getNivelDescricao(opt)}
                          </option>
                        ))}
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
                        <option value="">Selecione...</option>
                        {[1, 2, 3, 4, 5].map(opt => (
                          <option key={`prat-${opt}`} value={opt}>
                            {opt} - {getNivelDescricao(opt)}
                          </option>
                        ))}
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
                {isSubmitting ? 'Salvando...' : 'Salvar Respostas'}
              </button>

              <button
                onClick={generateReport}
                className={styles.reportButton}
                disabled={progress < 100}
              >
                Gerar Relatório Completo
              </button>
            </div>
          </>
        ) : (
          <div className={styles.reportContainer}>
            <button
              onClick={() => setShowReport(false)}
              className={styles.backButton}
            >
              Voltar para avaliação
            </button>

            {/* Adicione esta div com a imagem acima do gráfico radar */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src="/assets/logo_future.png"
                alt="Logo Future"
                style={{ maxWidth: '300px', height: 'auto' }}
              />
            </div>
            <div>
              
            </div>

            <div ref={radarChartRef} style={{ height: '500px', marginBottom: '40px' }}>
              <Radar data={radarData} options={radarOptions} />
            </div>

            <RelatorioRecomendacoes report={report} />

            {radarImage && (
              <PDFDownloadLink
                document={
                  <PDFGenerator
                    report={report}
                    radarImage={radarImage}
                    questions={questions}
                    responses={responses}
                  />
                }
                fileName={`relatorio_lgpd_${new Date().toISOString().slice(0, 10)}.pdf`}
                className={styles.pdfLink}
              >
                {({ loading }) => (
                  <button className={styles.pdfButton}>
                    {loading ? 'Preparando PDF...' : 'Baixar Relatório PDF'}
                  </button>
                )}
              </PDFDownloadLink>
            )}
          </div>
        )}
      </div>
    </>
  );
};

function getNivelDescricao(nivel) {
  const descricoes = {
    1: "Inicial",
    2: "Repetido",
    3: "Definido",
    4: "Gerenciado",
    5: "Otimizado"
  };
  return descricoes[nivel] || "";
}

function getCategoryName(code) {
  const names = {
    "GV": "Governança",
    "ID": "Identificar",
    "PR": "Proteger",
    "DE": "Detectar",
    "RS": "Responder",
    "RC": "Recuperar"
  };
  return names[code] || code;
}

export default Assessment;