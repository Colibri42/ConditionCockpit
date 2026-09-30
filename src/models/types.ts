export interface ConditionType { code:string; description:string; module:'MM'|'REA'|'CCM'; editable:boolean }
export interface Article { id:string; vendor:string; article:string; aid:string; text:string; pir:string; contract:string; orgs:string[]; components:{article:string;text:string;quantity:number}[] }
export interface ConditionRow { article:string; text:string; from:string; to:string; value:number; currency:string; quantity:number; unit:string; description:string }
export interface Condition { id:string; type:string; rows:ConditionRow[] }
export type FilterKey = 'vendor'|'orgs'|'pir'|'article'|'aid'|'contract';
export type Filters = Record<FilterKey,string[]>;
export interface PurchasingOrganisation {code:string;description:string;minimumQuantity:number;unit:string}
export interface Repository { articles(filters:Filters):Promise<Article[]>; values(key:FilterKey):Promise<{key:string;text:string}[]>; purchasingOrganisations(id:string):Promise<PurchasingOrganisation[]>; conditions(id:string):Promise<Condition[]>; save(id:string,conditions:Condition[]):Promise<void> }
