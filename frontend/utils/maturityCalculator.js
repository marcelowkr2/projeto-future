export const calculateMaturity = (responses, questions) => {
    const maturityByControl = {};
  
    questions.forEach((q) => {
      if (!maturityByControl[q.control_id]) {
        maturityByControl[q.control_id] = { total: 0, count: 0 };
      }
      if (responses[q.id]) {
        maturityByControl[q.control_id].total += responses[q.id];
        maturityByControl[q.control_id].count += 1;
      }
    });
  
    const results = Object.keys(maturityByControl).map((controlId) => ({
      control_id: controlId,
      average_maturity: maturityByControl[controlId].total / maturityByControl[controlId].count,
    }));
  
    return results;
  };