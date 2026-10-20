import {articles,vendors,seedConditions,organisations} from '../mock/data';
import {matches,protect,validate} from '../business/rules';
import type {Repository,Filters,FilterKey,Condition} from '../models/types';
export class MockRepository implements Repository {
 constructor(private storage:Pick<Storage,'getItem'|'setItem'>=localStorage){}
 async articles(f:Filters){return structuredClone(articles.filter(a=>matches(a,f)));}
 async purchasingOrganisations(id:string){const a=articles.find(a=>a.id===id);return organisations.filter(o=>a?.orgs.includes(o[0])).map(([code,description,minimumQuantity],i)=>({code,description,minimumQuantity,remainingShelfLife:90+i*30,plannedDeliveryTime:3+i,unit:'ST'}));}
 async values(k:FilterKey){return [...new Set(articles.flatMap(a=>k==='orgs'?a.orgs:[a[k]]))].map(key=>({key,text:k==='vendor'?vendors.find(v=>v[0]===key)?.[1]||key:k==='orgs'?organisations.find(o=>o[0]===key)?.[1]||key:k==='article'||k==='aid'?articles.find(a=>a[k]===key)?.text||key:key}));}
 async conditions(id:string){const a=articles.find(a=>a.id===id);if(!a)throw Error('Display Article not found.');const saved=this.storage.getItem('condition-cockpit:v1:'+id);return saved?JSON.parse(saved) as Condition[]:seedConditions(a);}
 async save(id:string,cs:Condition[]){protect(await this.conditions(id),cs);const errors=validate(cs);if(errors.length)throw Error(errors[0]);this.storage.setItem('condition-cockpit:v1:'+id,JSON.stringify(cs));}
}

