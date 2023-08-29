function calculateLoan(loanAmount, yearlyInterest, months, partPaymentFrequency = "off", partPayment = 0, startDate = new Date(), customPartPaymentSchedule = []) {
  // calculate the monthly interest rate
  const monthlyInterestRate = yearlyInterest / (12 * 100);
  // calculate the monthly payment using the loan payment formula
  //   const monthlyPayment = Math.round((loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months)));
  const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months));

  // remaining loan amount, starting with the initial full loan amount
  let remainingLoanAmount = loanAmount;
  // total interest paid, starting at 0
  let totalInterestPaid = 0;
  // total part payment, starting at 0
  let totalPartPayment = 0;
  // the date of the first installment
  let installmentDate = new Date(startDate);

  let totalPaymentToBePaid = 0;

  // array to hold the schedule
  let schedule = [];

  // loop through each month
  for (let installmentNumber = 1; installmentNumber <= months; installmentNumber++) {
    // calculate the interest for the current month
    let monthlyInterest = remainingLoanAmount * monthlyInterestRate;
    // calculate the principal for the current month
    let principal = monthlyPayment - monthlyInterest;
    // opening balance for the current month
    let openingBalance = remainingLoanAmount;
    // initialize part payment made in the current month
    let partPaymentMade = 0;

    totalPaymentToBePaid += monthlyPayment;

    // check the part payment frequency
    if (partPaymentFrequency !== "off") {
      if (partPaymentFrequency === "monthly" || (partPaymentFrequency === "quarterly" && installmentNumber % 3 === 0) || (partPaymentFrequency === "yearly" && installmentNumber % 12 === 0)) {
        partPaymentMade = partPayment;
      } else if (partPaymentFrequency === "custom") {
        // find if there is a custom part payment for the current installment
        let customPartPayment = customPartPaymentSchedule.find((x) => x.installmentNumber === installmentNumber);
        if (customPartPayment) {
          // convert the part payment amount to number
          partPaymentMade = Number(customPartPayment.partPayment.replace(/[^0-9.-]+/g, ""));
        }
      }
    }

    // check if a part payment was made in the current month
    if (partPaymentMade) {
      // increase the principal by the part payment
      principal += partPaymentMade;
      // reduce the remaining loan amount by the part payment
      remainingLoanAmount -= partPaymentMade;
      // increase the total part payment by the part payment
      totalPartPayment += partPaymentMade;
    }

    // reduce the remaining loan amount by the principal
    remainingLoanAmount -= principal;

    // if the remaining loan amount is less than or equal to 0, make adjustments
    if (remainingLoanAmount <= 0) {
      // adjust the principal by adding the negative remaining loan amount
      principal += remainingLoanAmount;
      // increase the total interest paid by the monthly interest
      //   totalInterestPaid += monthlyInterest;
      // set the remaining loan amount to 0
      remainingLoanAmount = 0;
    }

    // increase the total interest paid by the monthly interest
    totalInterestPaid += monthlyInterest;

    // create an object for the current installment
    let installment = {
      installmentNumber: installmentNumber,
      installmentDate: installmentDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      openingBalance: toAmount(openingBalance),
      principal: toAmount(principal),
      monthlyInterest: toAmount(monthlyInterest),
      monthlyPayment: toAmount(monthlyPayment),
      partPaymentMade: toAmount(partPaymentMade),
      monthlyPaymentWithPartPayment: toAmount(monthlyPayment + partPaymentMade),
      remainingLoanAmount: toAmount(remainingLoanAmount),
      loanPaid: (((loanAmount - remainingLoanAmount) / loanAmount) * 100).toFixed(2),
    };

    // add the current installment to the schedule
    schedule.push(installment);
    // move the installment date to the next month
    installmentDate.setMonth(installmentDate.getMonth() + 1);

    // if the remaining loan amount is 0 or less, break the loop
    if (remainingLoanAmount <= 0) {
      break;
    }
  }

  // return the schedule and calculated totals
  return {
    schedule: schedule,
    totalPartPayment: totalPartPayment,
    totalInterestPaid: totalInterestPaid,
    moneySaved: monthlyPayment * months - (loanAmount + totalInterestPaid),
    monthlyPayment: monthlyPayment,
    totalAmount: loanAmount + totalInterestPaid + totalPartPayment,
  };
}

module.exports={ calculateLoan}