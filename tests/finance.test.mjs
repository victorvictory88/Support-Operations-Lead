import test from 'node:test';
import assert from 'node:assert/strict';
import {FINANCE_ASSUMPTIONS,HIGH_FINANCE,MEDIUM_FINANCE,LOW_FINANCE,calculateFinance} from '../src/finance.mjs';

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
  assert.deepEqual(HIGH_FINANCE.years.map(row=>row.automationRate),[0.70,0.82,0.90]);
  assert.equal(Math.round(HIGH_FINANCE.totals.vendorSavingsInBudget),137501442);
  assert.equal(Math.round(HIGH_FINANCE.totals.net),117501442);
  assert.equal(Math.round(HIGH_FINANCE.years[2].weeklyIssues*(1-HIGH_FINANCE.years[2].automationRate)),50000);
});

test('medium case exposes the contract and vendor handling sensitivity',()=>{
  assert.equal(MEDIUM_FINANCE.vendorEligibleShare,0.70);
  assert.equal(MEDIUM_FINANCE.casesPerVendorRepYear,4000);
  assert.deepEqual(MEDIUM_FINANCE.years.map(row=>row.contractRealization),[0.25,0.50,0.75]);
  assert.equal(Math.round(MEDIUM_FINANCE.totals.net),42427620);
});

test('low case shows loss if AI and vendor savings underperform',()=>{
  assert.deepEqual(LOW_FINANCE.years.map(row=>row.automationRate),[0.65,0.75,0.82]);
  assert.equal(Math.round(LOW_FINANCE.totals.net),-13101809);
  assert.equal(Math.round(LOW_FINANCE.years[2].weeklyIssues*(1-LOW_FINANCE.years[2].automationRate)),90000);
});

test('smaller vendor ownership lowers savings without changing case count',()=>{
  const half=calculateFinance(FINANCE_ASSUMPTIONS,{vendorEligibleShare:0.50});
  assert.ok(half.totals.net<HIGH_FINANCE.totals.net);
  assert.deepEqual(half.years.map(row=>row.weeklyIssues),HIGH_FINANCE.years.map(row=>row.weeklyIssues));
});
