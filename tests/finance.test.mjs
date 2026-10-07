import test from 'node:test';
import assert from 'node:assert/strict';
import {FINANCE_ASSUMPTIONS,HIGH_FINANCE,MEDIUM_FINANCE,LOW_FINANCE,HIGH_DOUBLE_THROUGHPUT,HIGH_RISING_BASELINE,calculateFinance} from '../src/finance.mjs';

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

test('medium case exposes the budget and vendor handling sensitivity',()=>{
  assert.equal(MEDIUM_FINANCE.vendorCaseShare,0.70);
  assert.equal(MEDIUM_FINANCE.casesPerVendorRepYear,4000);
  assert.deepEqual(MEDIUM_FINANCE.years.map(row=>row.budgetSavingsRate),[0.25,0.50,0.75]);
  assert.equal(Math.round(MEDIUM_FINANCE.totals.net),41092486);
});

test('low case shows loss if AI and vendor savings underperform',()=>{
  assert.deepEqual(LOW_FINANCE.years.map(row=>row.automationRate),[0.65,0.75,0.80]);
  assert.equal(Math.round(LOW_FINANCE.totals.net),-13506395);
  assert.equal(Math.round(LOW_FINANCE.years[2].weeklyIssues*(1-LOW_FINANCE.years[2].automationRate)),100000);
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
});
