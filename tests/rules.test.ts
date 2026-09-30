import {test} from 'node:test';
import assert from 'node:assert/strict';
import {MockRepository} from '../src/services/MockRepository';
import {validate} from '../src/business/rules';
import {conditionTypes} from '../src/config/conditions';
const empty={vendor:[],orgs:[],pir:[],article:[],aid:[],contract:[]};
function repository(){const data=new Map<string,string>();return new MockRepository({getItem:k=>data.get(k)||null,setItem:(k,v)=>{data.set(k,v);}});}
test('AND across filters and OR within each filter preserve leading zeros',async()=>{const r=repository();assert.equal((await r.articles(empty)).length,18);const found=await r.articles({...empty,vendor:['0000123456','0000234567'],orgs:['NL55','NL58'],article:['000000000000000092']});assert.equal(found.length,1);assert.equal(found[0].vendor,'0000123456');});
test('locked conditions reject deletion, mutation and creation',async()=>{const r=repository();for(const mutation of ['delete','edit','add']){const cs=await r.conditions('92');if(mutation==='delete')cs.shift();if(mutation==='edit')cs[0].rows[0].value=0;if(mutation==='add')cs.push({...structuredClone(cs[0]),id:'new'});await assert.rejects(()=>r.save('92',cs),/Read-only/);}});
test('editable save persists, dates/numbers validated, drafts isolated',async()=>{const r=repository(),cs=await r.conditions('92');cs[2].rows[0].value=7.5;assert.notEqual((await r.conditions('92'))[2].rows[0].value,7.5);await r.save('92',cs);assert.equal((await r.conditions('92'))[2].rows[0].value,7.5);cs[2].rows[0].to='2025-01-01';assert.ok(validate(cs).length);await assert.rejects(()=>r.save('92',cs));cs[2].rows[0].value=NaN;assert.ok(validate(cs).some(e=>e.includes('numeric')));});
test('complete catalogue and hierarchy',async()=>{assert.equal(conditionTypes.length,27);assert.deepEqual(conditionTypes.filter(c=>!c.editable).map(c=>c.code),['PB00','ZFR1']);const cs=await repository().conditions('92');assert.equal(cs.length,5);assert.equal(cs[0].rows[0].article,'000000000000000092');assert.equal(cs[0].rows.length,4);});
