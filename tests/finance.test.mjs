import test from 'node:test';
import assert from 'node:assert/strict';
import {FINANCE_ASSUMPTIONS,HIGH_FINANCE,MEDIUM_FINANCE,LOW_FINANCE,LOWER_DEMAND_FINANCE,HIGH_DOUBLE_THROUGHPUT,HIGH_RISING_BASELINE,calculateFinance} from '../src/finance.mjs';

test('public vendor prices and the blended location mix reconcile',()=>{
  assert.equal(HIGH_FINANCE.annualOnshore,93600);
  assert.equal(HIGH_FINANCE.annualOffshore,23400);
  assert.equal(HIGH_FINANCE.blendedAnnual,44460);
  assert.equal((HIGH_FINANCE.annualOnshore-HIGH_FINANCE.annualOffshore)*100,7020000);
});

test('all financial cases use the same hypergrowth demand path',()=>{
  for(const model of [HIGH_FINANCE,MEDIUM_FINANCE,LOW_FINANCE]){
    assert.deepEqual(model.years.map(row=>row.weeklyIssues),[220000,330000,500000]);
    assert.equal(model.totals.programCost,20000000);
  }
});

test('high case includes only budget savings and subtracts rollout spend',()=>{
  assert.deepEqual(HIGH_FINANCE.years.map(row=>row.automationRate),[0.70,0.80,0.90]);
  assert.equal(Math.round(HIGH_FINANCE.totals.vendorSavingsInBudget),130947149);
  assert.equal(Math.round(HIGH_FINANCE.totals.net),110947149);
  assert.equal(Math.round(HIGH_FINANCE.years[2].weeklyIssues*(1-HIGH_FINANCE.years[2].automationRate)),50000);
  assert.deepEqual(HIGH_FINANCE.years.map(row=>Math.round(row.plannedVendorSeats)),[1030,936,780]);
  assert.deepEqual(HIGH_FINANCE.years.map(row=>row.casesPerVendorRepYear),[3000,3300,3000]);
  assert.equal(Math.round(150000*0.40*52*FINANCE_ASSUMPTIONS.vendorCaseShare/FINANCE_ASSUMPTIONS.casesPerVendorRepYear),936);
});

test('medium and high use one vendor baseline so AI progress explains the gap',()=>{
  assert.equal(MEDIUM_FINANCE.vendorCaseShare,HIGH_FINANCE.vendorCaseShare);
  assert.deepEqual(MEDIUM_FINANCE.years.map(row=>row.casesPerVendorRepYear),HIGH_FINANCE.years.map(row=>row.casesPerVendorRepYear));
  assert.deepEqual(MEDIUM_FINANCE.years.map(row=>row.budgetSavingsRate),HIGH_FINANCE.years.map(row=>row.budgetSavingsRate));
  assert.deepEqual(MEDIUM_FINANCE.years.map(row=>row.automationRate),[0.70,0.75,0.80]);
  assert.equal(Math.round(MEDIUM_FINANCE.totals.net),71933499);
  assert.equal(Math.round(MEDIUM_FINANCE.years[2].plannedVendorSeats),1560);
  assert.equal(Math.round(MEDIUM_FINANCE.years[2].comparisonVendorSeats),3120);
});

test('low case shows loss if AI and vendor savings underperform',()=>{
  assert.deepEqual(LOW_FINANCE.years.map(row=>row.automationRate),[0.65,0.70,0.75]);
  assert.equal(LOW_FINANCE.vendorCaseShare,HIGH_FINANCE.vendorCaseShare);
  assert.equal(Math.round(LOW_FINANCE.totals.net),-11954518);
  assert.equal(Math.round(LOW_FINANCE.years[2].weeklyIssues*(1-LOW_FINANCE.years[2].automationRate)),125000);
  assert.equal(Math.round(LOW_FINANCE.years[2].plannedVendorSeats),1950);
});

test('product improvement sensitivity lowers demand and the modeled savings',()=>{
  assert.deepEqual(LOWER_DEMAND_FINANCE.years.map(row=>row.weeklyIssues),[175000,200000,250000]);
  assert.equal(Math.round(LOWER_DEMAND_FINANCE.totals.net),50587121);
  assert.equal(Math.round(LOWER_DEMAND_FINANCE.years[2].plannedVendorSeats),390);
});

test('smaller vendor ownership lowers savings without changing case count',()=>{
  const half=calculateFinance(FINANCE_ASSUMPTIONS,{vendorCaseShare:0.50});
  assert.ok(half.totals.net<HIGH_FINANCE.totals.net);
  assert.deepEqual(half.years.map(row=>row.weeklyIssues),HIGH_FINANCE.years.map(row=>row.weeklyIssues));
});

test('higher vendor throughput and rising baseline narrow the high case',()=>{
  assert.equal(Math.round(HIGH_DOUBLE_THROUGHPUT.totals.net),47034120);
  assert.deepEqual(HIGH_RISING_BASELINE.years.map(row=>row.comparisonAutomationRate),[0.65,0.68,0.70]);
  assert.equal(Math.round(HIGH_RISING_BASELINE.totals.net),64200126);
});

test('break-even footer matches the assumed spend and high-case savings',()=>{
  const fraction=HIGH_FINANCE.totals.programCost/HIGH_FINANCE.totals.vendorSavingsInBudget;
  assert.ok(fraction>0.15&&fraction<0.16);
  const automationRates=FINANCE_ASSUMPTIONS.years.map(year=>
    FINANCE_ASSUMPTIONS.existingAutomationRate+(year.automationRate-FINANCE_ASSUMPTIONS.existingAutomationRate)*fraction
  );
  const breakEven=calculateFinance(FINANCE_ASSUMPTIONS,{automationRates});
  assert.ok(Math.abs(breakEven.totals.net)<0.01);
  const roundedExample=calculateFinance(FINANCE_ASSUMPTIONS,{automationRates:[0.62,0.63,0.65]});
  assert.equal(Math.round(roundedExample.years[2].plannedVendorSeats),2730);
  assert.equal(Math.round(roundedExample.years[2].comparisonVendorSeats),3120);
  assert.equal(Math.round(roundedExample.years[2].weeklyIssues*(1-roundedExample.years[2].automationRate)),175000);
  assert.ok(roundedExample.totals.vendorSavingsInBudget>21000000);
  assert.ok(roundedExample.totals.vendorSavingsInBudget<22000000);
});
