const LoanOffer = require('../models/loanOffers');

exports.createLoanOffer = async (req, res) => {
  try {
    const { name, loanInterest, loanAmount, loanDuration, offerType } = req.body;
    console.log("Received data:", req.body); // Log the incoming data

    // Create a new loan offer
    const loanOffer = new LoanOffer({
      name,
      loanInterest,
      loanAmount,
      loanDuration,
      offerType,
    });
    console.log("Loan offer created:", loanOffer); // Log the created loan offer (before saving)

    await loanOffer.save();
    console.log("Loan offer saved successfully"); // Log if saving was successful

    res.status(201).json(loanOffer);
  } catch (error) {
    console.error("Error in createLoanOffer:", error); // Log the exact error
    res.status(500).json({ message: 'Error creating loan offer', error: error.message });
  }
};

exports.repayLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loanOffer = await LoanOffer.findById(loanId);
    if (!loanOffer) return res.status(404).json({ message: 'Loan offer not found' });
    loanOffer.loanStatus = 'repaid';
    await loanOffer.save();
    res.status(200).json({ message: 'Loan status updated to repaid' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error repaying loan' });
  }
};

exports.rateBorrower = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { borrowerRating } = req.body;
    const loanOffer = await LoanOffer.findById(loanId);
    if (!loanOffer) return res.status(404).json({ message: 'Loan offer not found' });
    if (loanOffer.loanStatus !== 'repaid') return res.status(400).json({ message: 'Loan must be repaid before rating' });
    loanOffer.borrowerRating = borrowerRating;
    await loanOffer.save();
    res.status(200).json({ message: 'Rating successfully added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rating borrower' });
  }
};
