export function buildPrompt({ message, history, context }) {

  const historyText = history
    ?.map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  let dataText = "";

  if (context.summary) {
    dataText += `
Summary:
Total Spending: ₹${context.summary.total}
Transactions: ${context.summary.count}
Highest Expense: ₹${context.summary.highestExpense}
Top Category: ${context.summary.topCategory}
`;
  }

  if (context.breakdown) {
    dataText += `

Category Breakdown:
`;

    context.breakdown.forEach((c) => {
      dataText += `${c.label}: ₹${c.total}\n`;
    });
  }

  if (context.trend) {
    dataText += `

Spending Trend:
`;

    context.trend.slice(-12).forEach((t) => {
      dataText += `${t.period}: ₹${t.total}\n`;
    });
  }

  return `
You are MoNNI AI, a financial assistant.

You analyze user expenses and provide insights.

Rules:
- Use only the financial data provided.
- If data is missing say you cannot determine.

Conversation History:
${historyText}

Financial Data:
${dataText}

User Question:
${message}

Provide a short financial insight.
Also suggest 3 follow-up questions.
`;
}