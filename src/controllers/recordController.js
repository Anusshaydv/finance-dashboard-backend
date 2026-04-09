const prisma = require("../utils/prisma");

// CREATE RECORD (ADMIN ONLY)
const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    // Validation
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
     if (isNaN(new Date(date))) {
      return res.status(400).json({ error: "Invalid date" });
    }
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const record = await prisma.record.create({
      data: {
        amount: parseFloat(amount),
        type,
        category,
        date: new Date(date),
        notes,
        userId: req.user.id
      }
    });

    res.status(201).json({ message: "Record created", record });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};



// GET RECORDS (ALL AUTH USERS)
const getRecords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { type, category, from, to } = req.query;
    if (type && !["income", "expense"].includes(type)) {
  return res.status(400).json({ error: "Invalid type filter" });
}
     if (from && isNaN(new Date(from))) {
      return res.status(400).json({ error: "Invalid 'from' date" });
    }

    if (to && isNaN(new Date(to))) {
      return res.status(400).json({ error: "Invalid 'to' date" });
    }
    const records = await prisma.record.findMany({
      where: {
        userId: req.user.id,
        ...(type && { type }),
        ...(category && { category }),
        ...(from && to && {
          date: {
            gte: new Date(from),
            lte: new Date(to)
          }
        })
      },
      orderBy: {date: "desc"},
      skip: (page - 1) * limit,
      take: limit,
    });

    res.json({
      page,
      limit,
      count: records.length,
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};



// UPDATE RECORD (ADMIN ONLY)
const updateRecord = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existing = await prisma.record.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ error: "Record not found" });
    }
     // ❌ prevent restricted updates
delete req.body.userId;
delete req.body.id;

// ✅ allow only specific fields
const allowedFields = ["amount", "type", "category", "date", "notes"];
const updates = {};

for (let key of allowedFields) {
  if (req.body[key] !== undefined) {
    updates[key] = req.body[key];
  }
}

// ✅ validations
if (updates.type && !["income", "expense"].includes(updates.type)) {
  return res.status(400).json({ error: "Invalid type" });
}

if (updates.date && isNaN(new Date(updates.date))) {
  return res.status(400).json({ error: "Invalid date" });
}

if (updates.amount !== undefined) {
  const parsed = parseFloat(updates.amount);

  if (isNaN(parsed)) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  updates.amount = parsed;
}
    const updated = await prisma.record.update({
      where: { id },
      data:updates
    });

    res.json({
      message: "Record updated",
      record: updated
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};



// DELETE RECORD (ADMIN ONLY)
const deleteRecord = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existing = await prisma.record.findUnique({
      where: { id }
    });

    if (!existing) {
      return res.status(404).json({ error: "Record not found" });
    }

    await prisma.record.delete({
      where: { id }
    });

    res.json({ message: "Record deleted" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
};