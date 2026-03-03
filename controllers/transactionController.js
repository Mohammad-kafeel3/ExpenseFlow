const transactionModel = require('../models/transactionModel');

const getAllTransaction = async (req, res) => {
    try {
        const { frequency, selectedDate, userid } = req.body;
        let dateFilter = {};

        if (frequency === 'custom' && selectedDate?.length === 2) {
            const [start, end] = selectedDate;
            dateFilter.date = {
                $gte: new Date(start),
                $lte: new Date(end),
            };
        } else {
            dateFilter.date = {
                $gt: new Date(Date.now() - Number(frequency) * 24 * 60 * 60 * 1000),
            };
        }

        const transactions = await transactionModel.find({
            ...dateFilter,
            userid,
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.log('Error fetching transactions:', error);
        res.status(500).json(error);
    }
};

const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send('Transaction created');
    } catch (error) {
        console.log('Error adding transaction:', error);
        res.status(500).json(error);
    }
};

module.exports = { getAllTransaction, addTransaction };
