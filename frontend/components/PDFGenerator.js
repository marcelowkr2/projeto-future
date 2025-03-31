// components/PDFGenerator.js
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { getCategoryName } from '../services/recomendacoes';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1pt solid #333',
    paddingBottom: 5
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  chartImage: {
    width: '80%',
    height: 'auto'
  },
  scoreItem: {
    marginBottom: 15
  },
  scoreTitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  scoreBar: {
    height: 10,
    backgroundColor: '#eee',
    marginTop: 5,
    marginBottom: 5,
    position: 'relative'
  },
  scoreFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    position: 'absolute',
    left: 0,
    top: 0
  },
  scoreValue: {
    fontSize: 10
  },
  recommendationItem: {
    marginBottom: 10,
    fontSize: 10
  },
  answerSection: {
    marginBottom: 15,
    border: '1pt solid #eee',
    padding: 10,
    borderRadius: 5
  },
  answerRow: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 10
  },
  answerLabel: {
    width: '30%',
    fontWeight: 'bold'
  },
  answerValue: {
    width: '70%'
  },
  questionText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 5
  }
});

const PDFGenerator = ({ report, radarImage, questions, responses }) => {
  const getNivelDescricao = (nivel) => {
    const descricoes = {
      1: "Inicial - Processos não existentes ou ad hoc",
      2: "Repetido - Processos executados informalmente",
      3: "Definido - Processos documentados e padronizados",
      4: "Gerenciado - Processos medidos e controlados",
      5: "Otimizado - Melhoria contínua baseada em métricas"
    };
    return descricoes[nivel] || "";
  };

  // Agrupar perguntas por categoria
  const perguntasPorCategoria = questions.reduce((acc, question) => {
    const categoria = question.category.split('.')[0];
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(question);
    return acc;
  }, {});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Relatório de Maturidade LGPD</Text>
          <Text style={styles.subtitle}>Nível Geral: {report.nivelGeral} - {getNivelDescricao(report.nivelGeral)}</Text>
        </View>

        {radarImage && (
          <View style={styles.chartContainer}>
            <Image src={radarImage} style={styles.chartImage} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Executivo</Text>
          <Text style={{ fontSize: 10 }}>{report.resumo}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desempenho por Dimensão</Text>
          {Object.entries(report.scores).map(([categoria, score]) => (
            <View key={categoria} style={styles.scoreItem}>
              <Text style={styles.scoreTitle}>
                {getCategoryName(categoria)}: {score.total.toFixed(1)}
              </Text>
              <View style={styles.scoreBar}>
                <View style={[styles.scoreFill, { width: `${score.total * 20}%` }]} />
              </View>
              <Text style={styles.scoreValue}>
                Política: {score.politica} | Prática: {score.pratica}
              </Text>
            </View>
          ))}
        </View>

        {report.recomendacoes.pontosFracos.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Áreas Prioritárias para Melhoria</Text>
            {report.recomendacoes.pontosFracos.map((item, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Text style={{ fontWeight: 'bold' }}>
                  {getCategoryName(item.categoria)} (Score: {item.score.total.toFixed(1)})
                </Text>
                {item.recomendacoes.map((rec, i) => (
                  <Text key={i}>• {rec}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Respostas Detalhadas</Text>
          
          {Object.entries(perguntasPorCategoria).map(([categoria, perguntas]) => (
            <View key={categoria} style={styles.answerSection}>
              <Text style={styles.categoryTitle}>
                {getCategoryName(categoria)}
              </Text>
              
              {perguntas.map((question) => {
                const resposta = responses[question.id];
                return (
                  <View key={question.id} style={{ marginBottom: 10 }}>
                    <Text style={styles.questionText}>
                      {question.text}
                    </Text>
                    <View style={styles.answerRow}>
                      <Text style={styles.answerLabel}>Política:</Text>
                      <Text style={styles.answerValue}>
                        {resposta ? `${resposta.politica} - ${getNivelDescricao(resposta.politica).split('-')[1].trim()}` : 'Não respondida'}
                      </Text>
                    </View>
                    <View style={styles.answerRow}>
                      <Text style={styles.answerLabel}>Prática:</Text>
                      <Text style={styles.answerValue}>
                        {resposta ? `${resposta.pratica} - ${getNivelDescricao(resposta.pratica).split('-')[1].trim()}` : 'Não respondida'}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {report.recomendacoes.prioridades.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plano de Ação Prioritário</Text>
            {report.recomendacoes.prioridades.map((item, index) => (
              <Text key={index} style={{ marginBottom: 5, fontSize: 10 }}>
                {index + 1}. {item}
              </Text>
            ))}
          </View>
        )}

        {report.recomendacoes.equipamentos.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Investimentos Recomendados em Tecnologia</Text>
            {report.recomendacoes.equipamentos.map((item, index) => (
              <Text key={index} style={{ marginBottom: 5, fontSize: 10 }}>
                • {item}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFGenerator;