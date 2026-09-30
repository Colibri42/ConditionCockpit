import type {ConditionType} from '../models/types';
const entries:[string,string,ConditionType['module']][] = [
['PB00','Gross Price','MM'],['ZFR1','Freight Cost','MM'],['ZRET','Return Rebate %','MM'],['ZFRC','Freight Cost Broker','MM'],
['ZPWM','Pkg waste Mgt-Aldi','REA'],['ZBAT','Battery fee-Aldi','REA'],['ZEWM','E-waste fee-Aldi','REA'],['ZPCL','Pvt cpy levy-Aldi','REA'],['ZCPF','PRN fee-Aldi','REA'],['ZMF0','Mattress fee-Aldi','REA'],
['ZC01','Packaging waste management fee','CCM'],['ZC02','Battery fee','CCM'],['ZC03','E-waste management fee','CCM'],['ZC04','Private Copying Levy','CCM'],['ZC05','Fee for paper/carton (non-packaging)','CCM'],['ZC07','Fee for mattresses','CCM'],['ZC08','Textile Management Fee','CCM'],['ZC19','Excise duty (beverages)','CCM'],['ZC20','Excise duty (alcohol)','CCM'],['ZC21','Excise duty (tobacco)','CCM'],['ZC22','Excise duty (non-alcohol)','CCM'],['ZC40','Meadow milk surcharge','CCM'],['ZC42','PlanetProof label','CCM'],['ZC43','Producer fee for deposit articles','CCM'],['ZC51','1-star Better Life label','CCM'],['ZC55','2-stars Better Life label','CCM'],['ZC60','3-stars Better Life label','CCM']];
export const conditionTypes:ConditionType[]=entries.map(([code,description,module])=>({code,description,module,editable:!['PB00','ZFR1'].includes(code)}));
export const typeOf=(code:string)=>conditionTypes.find(t=>t.code===code);
