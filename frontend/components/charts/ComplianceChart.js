import React from "react";

const ComplianceChart = ({ data }) => {
  return (
    <div>
      <h3>Gráfico de Conformidade</h3>
      {/* Renderize o gráfico aqui com a biblioteca que você deseja */}
      {/* Exemplo de como acessar e exibir os dados */}
      {data && data.map((item, index) => (
        <div key={index}>
          <p>Controle ID: {item.control_id}</p>
          <p>Average Maturity: {item.average_maturity}</p>
        </div>
      ))}
    </div>
  );
};

export default ComplianceChart;
