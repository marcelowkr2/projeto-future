import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { getCategoryName } from '../services/recomendacoes';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1px solid #1976d2'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: '#666'
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
  chartContainer: {
    marginVertical: 15,
    alignItems: 'center'
  },
  chartImage: {
    width: '300px',
    height: '300px'
  },
  table: { 
    width: '100%',
    marginBottom: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dddddd'
  },
  tableRow: { 
    flexDirection: 'row' 
  },
  tableColHeader: {
    width: '100%',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dddddd'
  },
  tableCol: {
    width: '100%',
    padding: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dddddd'
  },
  tableCell: {
    fontSize: 10,
    textAlign: 'left'
  },
  recommendationItem: {
    marginBottom: 5,
    fontSize: 10,
    lineHeight: 1.4
  },
  nivelGeral: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2'
  }
});

const PDFGenerator = ({ report, radarImage }) => {
  const formatDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
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
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Relatório de Maturidade LGPD</Text>
          <Text style={styles.subtitle}>Gerado em: {formatDate()}</Text>
          <Text style={styles.nivelGeral}>
            Nível Geral: {report.nivelGeral} - {getNivelDescricao(report.nivelGeral)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Executivo</Text>
          <Text style={styles.recommendationItem}>{report.resumo}</Text>
        </View>

        {radarImage && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Desempenho por Dimensão</Text>
            <View style={styles.chartContainer}>
              <Image src={radarImage} style={styles.chartImage} />
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pontuação por Categoria</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Categoria</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Pontuação</Text>
              </View>
            </View>
            {Object.entries(report.scores).map(([categoria, score]) => (
              <View key={categoria} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{getCategoryName(categoria)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    Total: {score.total.toFixed(1)} | Política: {score.politica} | Prática: {score.pratica}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendações Prioritárias</Text>
          {report.recomendacoes.pontosFracos.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>
                {getCategoryName(item.categoria)} (Pontuação: {item.score.total.toFixed(1)})
              </Text>
              {item.recomendacoes.map((rec, i) => (
                <Text key={i} style={styles.recommendationItem}>• {rec}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plano de Ação</Text>
          <View style={{ marginLeft: 10 }}>
            {report.recomendacoes.prioridades.map((item, index) => (
              <Text key={index} style={styles.recommendationItem}>
                {index + 1}. {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investimentos Recomendados</Text>
          <View style={{ marginLeft: 10 }}>
            {report.recomendacoes.equipamentos.map((item, index) => (
              <Text key={index} style={styles.recommendationItem}>
                • {item}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;