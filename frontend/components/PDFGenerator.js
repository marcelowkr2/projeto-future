import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1px solid #1976d2'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#666666'
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: '1px solid #eeeeee'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333'
  },
  questionBlock: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5
  },
  questionText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5
  },
  answerText: {
    fontSize: 11,
    marginLeft: 10
  },
  chartContainer: {
    marginVertical: 15,
    alignItems: 'center'
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#999999'
  },
  table: { 
    display: "table", 
    width: "auto", 
    marginBottom: 15
  },
  tableRow: { 
    flexDirection: "row" 
  },
  tableColHeader: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: '#1976d2',
    borderBottomStyle: 'solid',
    padding: 5,
    backgroundColor: '#e3f2fd'
  },
  tableCol: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    borderBottomStyle: 'solid',
    padding: 5
  },
  tableCell: { 
    fontSize: 11,
    textAlign: 'center'
  }
});

const PDFGenerator = ({ questions, responses, radarImage, nivelGeral, scores }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNivelDescricao = (nivel) => {
    const descricoes = {
      1: "Inicial",
      2: "Repetido",
      3: "Definido",
      4: "Gerenciado",
      5: "Otimizado"
    };
    return descricoes[nivel] || "";
  };

  return (
    <Document>
      {/* Página de capa */}
      <Page size="A4" style={[styles.page, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={{ textAlign: 'center' }}>
          <Text style={[styles.title, { fontSize: 28, marginBottom: 20 }]}>Relatório de Maturidade LGPD</Text>
          <Text style={[styles.subtitle, { fontSize: 16, marginBottom: 5 }]}>
            Nível Geral: {nivelGeral} - {getNivelDescricao(nivelGeral)}
          </Text>
          <Text style={styles.subtitle}>Gerado em: {formatDate(new Date())}</Text>
        </View>
      </Page>

      {/* Página de conteúdo principal */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Análise Detalhada</Text>
        </View>

        {/* Gráfico Radar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desempenho por Categoria</Text>
          <View style={styles.chartContainer}>
            {radarImage && (
              <Image 
                src={radarImage} 
                style={{ width: '300px', height: '300px' }} 
              />
            )}
          </View>
        </View>

        {/* Tabela de Scores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pontuação por Dimensão</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>Categoria</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>Pontuação</Text>
              </View>
            </View>
            {Object.entries(scores).map(([categoria, score]) => (
              <View style={styles.tableRow} key={categoria}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{getCategoryName(categoria)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{score.total.toFixed(1)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Respostas Detalhadas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Respostas Completas</Text>
          {questions.map((question, index) => (
            <View key={question.id} style={styles.questionBlock} break={index % 15 === 0 && index !== 0}>
              <Text style={styles.questionText}>
                {index + 1}. {question.text} [{question.category}]
              </Text>
              {responses[question.id] && (
                <>
                  <Text style={styles.answerText}>
                    Política: {responses[question.id].politica} - {getNivelDescricao(responses[question.id].politica)}
                  </Text>
                  <Text style={styles.answerText}>
                    Prática: {responses[question.id].pratica} - {getNivelDescricao(responses[question.id].pratica)}
                  </Text>
                </>
              )}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Relatório gerado automaticamente - Sistema de Avaliação LGPD</Text>
        </View>
      </Page>
    </Document>
  );
};

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

export default PDFGenerator;