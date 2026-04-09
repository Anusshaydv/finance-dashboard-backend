const prisma = require("../utils/prisma");

const getSummary = async (req, res) => {
  try {
    const records = await prisma.record.findMany({
      where: {
        userId: req.user.id
      }
    });

    let income = 0;
    let expense = 0;

    records.forEach(r => {
      if (r.type === "income") income += r.amount;
      else expense += r.amount;
    });

    res.json({
       totalIncome: Number(income.toFixed(2)),
  totalExpense: Number(expense.toFixed(2)),
  netBalance: Number((income - expense).toFixed(2))
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

const categoryBreakdown = async (req, res) => {
  try {
    const records = await prisma.record.findMany({
      where: { userId: req.user.id }
    });

    const map = {};

    records.forEach(r => {
      map[r.category] = (map[r.category] || 0) + r.amount;
    });

    res.json(map);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

const monthlyTrends = async (req, res) => {
  try {
    const records = await prisma.record.findMany({
      where: { userId: req.user.id }
    });

    const map = {};

    records.forEach(r => {
      const month = r.date.toISOString().slice(0, 7);

      if (!map[month]) {
        map[month] = { income: 0, expense: 0 };
      }

      if (r.type === "income") {
        map[month].income += r.amount;
      } else {
        map[month].expense += r.amount;
      }
    });

    const result = Object.keys(map).map(month => ({
      month,
      ...map[month]
    }));
    result.sort((a, b) => a.month.localeCompare(b.month));
    res.json(result);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getSummary, categoryBreakdown,monthlyTrends };