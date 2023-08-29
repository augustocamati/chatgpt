const { calculateLoan } = require("../../calculateLoan")
const bankConfig = {
    bai: {
        'efectiveInterest': 20.9,
        'mountComission': 1.40,
        'IVA': 14,
        'moraInterest': 4,
        'taxSeal': 0.20
    },

}

module.exports  = {
    async calculator(req, res) {

        const { loanType, bankName, loanAmount, months, monthlyInterestRate } = req.body
        const bank = bankConfig.bai

        const monthlyPayment = 133// (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months));

        console.log('bank', monthlyPayment)

        res.send({
            bank,
            monthlyPayment
        })
    }
}