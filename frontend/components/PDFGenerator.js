import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { getCategoryName } from '../services/recomendacoes';

const styles = StyleSheet.create({
  // ... (mantenha os estilos existentes)
  answerSection: {
    marginBottom: 15
  },
  answerRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  answerLabel: {
    width: '30%',
    fontSize: 10,
    fontWeight: 'bold'
  },
  answerValue: {
    width: '70%',
    fontSize: 10
  }
});

const PDFGenerator = ({ report, radarImage, questions, responses }) => {
  // ... (mantenha as funções existentes)

  // Função para obter a descrição da resposta
  const getRespostaDescricao = (valor) => {
    const descricoes = {
      1: "1 - Inicial",
      2: "2 - Repetido",
      3: "3 - Definido",
      4: "4 - Gerenciado",
      5: "5 - Otimizado"
    };
    return descricoes[valor] || valor;
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
        {/* ... (mantenha as seções existentes) */}

        {/* Nova seção para as respostas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Respostas Detalhadas</Text>
          
          {Object.entries(perguntasPorCategoria).map(([categoria, perguntas]) => (
            <View key={categoria} style={styles.answerSection}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>
                {getCategoryName(categoria)}
              </Text>
              
              {perguntas.map((question) => {
                const resposta = responses[question.id];
                return (
                  <View key={question.id} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, marginBottom: 3 }}>
                      {question.text}
                    </Text>
                    <View style={styles.answerRow}>
                      <Text style={styles.answerLabel}>Política:</Text>
                      <Text style={styles.answerValue}>
                        {resposta ? getRespostaDescricao(resposta.politica) : 'Não respondida'}
                      </Text>
                    </View>
                    <View style={styles.answerRow}>
                      <Text style={styles.answerLabel}>Prática:</Text>
                      <Text style={styles.answerValue}>
                        {resposta ? getRespostaDescricao(resposta.pratica) : 'Não respondida'}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;