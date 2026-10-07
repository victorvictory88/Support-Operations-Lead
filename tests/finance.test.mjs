import test from 'node:test';
import assert from 'node:assert/strict';
import {BASE_FINANCE,UPSIDE_FINANCE,HYPERGROWTH_FINANCE,HYPERGROWTH_DOWNSIDE_FINANCE,SLOW_FINANCE,calculateFinance} from '../src/finance.mjs';

test('published vendor rates and seat mix reconcile with the annual cost model',()=>{
  assert.equal(BASE_FINANCE.annualOnshore,93600);
  assert.equal(BASE_FINANCE.annualOffshore,23400);
  assert.equal(BASE_FINANCE.blendedAnnual,44460);
});

test('three-year financial bridge counts vendor-eligible avoided cases once',()=>{
  assert.equal(Math.round(BASE_FINANCE.years[0].avoidedWeeklyCases),18600);
  assert.equal(Math.round(BASE_FINANCE.years[1].avoidedWeeklyCases),46000);
  assert.equal(Math.round(BASE_FINANCE.years[2].avoidedWeeklyCases),78680);
  assert.equal(Math.round(BASE_FINANCE.totals.avoidableVendorSpend),38646055);
  assert.equal(Math.round(BASE_FINANCE.totals.cashableSavings),19258833);
  assert.equal(Math.round(BASE_FINANCE.totals.net),10258833);
});

test('upside exceeds the base only through stated vendor share and contract timing',()=>{
  assert.equal(UPSIDE_FINANCE.vendorEligibleShare,0.90);
  assert.deepEqual(UPSIDE_FINANCE.years.map(row=>row.contractRealization),[0.40,0.75,0.90]);
  assert.deepEqual(UPSIDE_FINANCE.years.map(row=>row.automationRate),BASE_FINANCE.years.map(row=>row.automationRate));
  assert.equal(Math.round(UPSIDE_FINANCE.totals.cashableSavings),39101041);
  assert.equal(Math.round(UPSIDE_FINANCE.totals.net),30101041);
});

test('hypergrowth sensitivity exceeds $100M only under its explicit demand and throughput inputs',()=>{
  assert.deepEqual(HYPERGROWTH_FINANCE.years.map(row=>row.weeklyIssues),[220000,330000,500000]);
  assert.deepEqual(HYPERGROWTH_FINANCE.years.map(row=>row.automationRate),[0.70,0.82,0.90]);
  assert.equal(HYPERGROWTH_FINANCE.casesPerVendorRepYear,3000);
  assert.equal(HYPERGROWTH_FINANCE.totals.programCost,20000000);
  assert.equal(Math.round(HYPERGROWTH_FINANCE.totals.net),117501442);
  assert.equal(Math.round(HYPERGROWTH_FINANCE.years[2].weeklyIssues*(1-HYPERGROWTH_FINANCE.years[2].automationRate)),50000);
});

test('hypergrowth downside exposes the full-spend risk if progress stalls',()=>{
  assert.deepEqual(HYPERGROWTH_DOWNSIDE_FINANCE.years.map(row=>row.automationRate),[0.65,0.75,0.82]);
  assert.equal(HYPERGROWTH_DOWNSIDE_FINANCE.casesPerVendorRepYear,4000);
  assert.equal(Math.round(HYPERGROWTH_DOWNSIDE_FINANCE.totals.net),-13101809);
  assert.equal(Math.round(HYPERGROWTH_DOWNSIDE_FINANCE.years[2].weeklyIssues*(1-HYPERGROWTH_DOWNSIDE_FINANCE.years[2].automationRate)),90000);
});

test('slower automation and limited contract conversion create a downside',()=>{
  assert.equal(Math.round(SLOW_FINANCE.totals.net),-3979762);
  assert.ok(SLOW_FINANCE.totals.cashableSavings<BASE_FINANCE.totals.cashableSavings);
});

test('fewer vendor-eligible cases reduce the financial upside',()=>{
  const halfVendor=calculateFinance(undefined,{vendorEligibleShare:0.50});
  assert.equal(Math.round(halfVendor.totals.net),4756309);
});
