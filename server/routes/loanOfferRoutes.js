const express = require('express');
const { createLoanOffer, repayLoan, rateBorrower } = require('../controllers/loanOfferController');

const router = express.Router();

router.post('/loanOffer', createLoanOffer);
router.post('/repayLoan/:loanId', repayLoan);
router.post('/rateBorrower/:loanId', rateBorrower);

module.exports = router;
