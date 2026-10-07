// Illustrative scenario inputs. Public prices are references, not OpenAI contract rates.
export const FINANCE_ASSUMPTIONS=Object.freeze({
  weeksPerYear:52,
  casesPerVendorRepYear:6000,
  vendorEligibleShare:0.70,
  onshoreVendorShare:0.30,
  offshoreVendorShare:0.70,
  onshoreHourlyBill:45,
  onshoreHoursPerYear:2080,
  offshoreMonthlyBill:1950,
  existingAutomationRate:0.60,
  years:[
    {year:1,weeklyIssues:186000,automationRate:0.70,contractRealization:0.10,programCost:2000000},
    {year:2,weeklyIssues:230000,automationRate:0.80,contractRealization:0.40,programCost:3000000},
    {year:3,weeklyIssues:281000,automationRate:0.88,contractRealization:0.65,programCost:4000000}
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
    const contractRealization=overrides.contractRealization?.[index]??input.contractRealization;
    const programCost=overrides.programCosts?.[index]??input.programCost;
    const avoidedWeeklyCases=weeklyIssues*(automationRate-assumptions.existingAutomationRate);
    const vendorRepYears=avoidedWeeklyCases*assumptions.weeksPerYear*vendorEligibleShare/casesPerVendorRepYear;
    const avoidableVendorSpend=vendorRepYears*blendedAnnual;
    const cashableSavings=avoidableVendorSpend*contractRealization;
    return {year:input.year,weeklyIssues,automationRate,avoidedWeeklyCases,vendorRepYears,avoidableVendorSpend,contractRealization,cashableSavings,programCost,net:cashableSavings-programCost};
  });
  const totals=years.reduce((sum,row)=>({avoidableVendorSpend:sum.avoidableVendorSpend+row.avoidableVendorSpend,cashableSavings:sum.cashableSavings+row.cashableSavings,programCost:sum.programCost+row.programCost,net:sum.net+row.net}),{avoidableVendorSpend:0,cashableSavings:0,programCost:0,net:0});
  return {annualOnshore,annualOffshore,blendedAnnual,vendorEligibleShare,casesPerVendorRepYear,years,totals};
}

export const BASE_FINANCE=calculateFinance();
export const UPSIDE_FINANCE=calculateFinance(FINANCE_ASSUMPTIONS,{vendorEligibleShare:0.90,contractRealization:[0.40,0.75,0.90]});
export const HYPERGROWTH_FINANCE=calculateFinance(FINANCE_ASSUMPTIONS,{weeklyIssues:[220000,330000,500000],automationRates:[0.70,0.82,0.90],vendorEligibleShare:0.90,casesPerVendorRepYear:3000,contractRealization:[0.40,0.75,0.90],programCosts:[4000000,6000000,10000000]});
export const HYPERGROWTH_DOWNSIDE_FINANCE=calculateFinance(FINANCE_ASSUMPTIONS,{weeklyIssues:[220000,330000,500000],automationRates:[0.65,0.75,0.82],vendorEligibleShare:0.70,casesPerVendorRepYear:4000,contractRealization:[0.10,0.10,0.10],programCosts:[4000000,6000000,10000000]});
export const SLOW_FINANCE=calculateFinance(FINANCE_ASSUMPTIONS,{automationRates:[0.65,0.70,0.75],contractRealization:[0.25,0.25,0.25]});
