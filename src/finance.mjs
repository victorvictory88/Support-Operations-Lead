// Illustrative exercise inputs. Public list prices are references, not OpenAI rates.
export const FINANCE_ASSUMPTIONS=Object.freeze({
  weeksPerYear:52,
  casesPerVendorRepYear:3000,
  vendorEligibleShare:0.90,
  onshoreVendorShare:0.30,
  offshoreVendorShare:0.70,
  onshoreHourlyBill:45,
  onshoreHoursPerYear:2080,
  offshoreMonthlyBill:1950,
  existingAutomationRate:0.60,
  years:[
    {year:1,weeklyIssues:220000,automationRate:0.70,contractRealization:0.40,programCost:4000000},
    {year:2,weeklyIssues:330000,automationRate:0.82,contractRealization:0.75,programCost:6000000},
    {year:3,weeklyIssues:500000,automationRate:0.90,contractRealization:0.90,programCost:10000000}
  ]
});

export function calculateFinance(assumptions=FINANCE_ASSUMPTIONS,overrides={}){
  const annualOnshore=assumptions.onshoreHourlyBill*assumptions.onshoreHoursPerYear;
  const annualOffshore=assumptions.offshoreMonthlyBill*12;
  const blendedAnnual=annualOnshore*assumptions.onshoreVendorShare+annualOffshore*assumptions.offshoreVendorShare;
  const vendorEligibleShare=overrides.vendorEligibleShare??assumptions.vendorEligibleShare;
  const casesPerVendorRepYear=overrides.casesPerVendorRepYear??assumptions.casesPerVendorRepYear;
  const years=assumptions.years.map((input,index)=>{
    const weeklyIssues=overrides.weeklyIssues?.[index]??input.weeklyIssues;
    const automationRate=overrides.automationRates?.[index]??input.automationRate;
    const comparisonAutomationRate=overrides.comparisonAutomationRates?.[index]??assumptions.existingAutomationRate;
    const contractRealization=overrides.contractRealization?.[index]??input.contractRealization;
    const programCost=overrides.programCosts?.[index]??input.programCost;
    const savedWeeklyCases=weeklyIssues*(automationRate-comparisonAutomationRate);
    const vendorRepYears=savedWeeklyCases*assumptions.weeksPerYear*vendorEligibleShare/casesPerVendorRepYear;
    const potentialVendorSavings=vendorRepYears*blendedAnnual;
    const vendorSavingsInBudget=potentialVendorSavings*contractRealization;
    return {year:input.year,weeklyIssues,automationRate,comparisonAutomationRate,savedWeeklyCases,vendorRepYears,potentialVendorSavings,contractRealization,vendorSavingsInBudget,programCost,net:vendorSavingsInBudget-programCost};
  });
  const totals=years.reduce((sum,row)=>({potentialVendorSavings:sum.potentialVendorSavings+row.potentialVendorSavings,vendorSavingsInBudget:sum.vendorSavingsInBudget+row.vendorSavingsInBudget,programCost:sum.programCost+row.programCost,net:sum.net+row.net}),{potentialVendorSavings:0,vendorSavingsInBudget:0,programCost:0,net:0});
  return {annualOnshore,annualOffshore,blendedAnnual,vendorEligibleShare,casesPerVendorRepYear,years,totals};
}

export const HIGH_FINANCE=calculateFinance();
export const MEDIUM_FINANCE=calculateFinance(FINANCE_ASSUMPTIONS,{vendorEligibleShare:0.70,casesPerVendorRepYear:4000,contractRealization:[0.25,0.50,0.75]});
export const LOW_FINANCE=calculateFinance(FINANCE_ASSUMPTIONS,{automationRates:[0.65,0.75,0.82],vendorEligibleShare:0.70,casesPerVendorRepYear:4000,contractRealization:[0.10,0.10,0.10]});
export const HIGH_DOUBLE_THROUGHPUT=calculateFinance(FINANCE_ASSUMPTIONS,{casesPerVendorRepYear:6000});
export const HIGH_RISING_BASELINE=calculateFinance(FINANCE_ASSUMPTIONS,{comparisonAutomationRates:[0.65,0.68,0.70]});
