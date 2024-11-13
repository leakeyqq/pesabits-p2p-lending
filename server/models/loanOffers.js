const mongoose = require('mongoose');

const LoanOfferSchema = new mongoose.Schema({
  name: { type: String, required: true },
  loanInterest: { type: Number, required: true },
  loanAmount: { type: Number, required: true },
  loanDuration: { type: String, required: true }, 
  loanStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'repaid', 'defaulted'], 
    default: 'pending', 
  },
  borrowerRating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    default: null, 
  }, 
  lenderReputation: { 
    type: Number, 
    default: 3, 
  },
  offerType: { 
    type: String, 
    required: true, 
    enum: ['borrower', 'lender'], 
  },
});

LoanOfferSchema.methods.updateRating = async function (borrowerRating) {
  this.borrowerRating = borrowerRating;

  if (this.loanStatus === 'repaid') {
    this.lenderReputation = (this.lenderReputation + borrowerRating) / 2; 
  }
  
  await this.save();
};

module.exports = mongoose.model('LoanOffer', LoanOfferSchema);
