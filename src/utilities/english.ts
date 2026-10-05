// Translate known demo descriptions at presentation time as well as for fresh
// mock data. Existing saved conditions remain unchanged, including locked rows.
const descriptions:Record<string,string>={
 'Ferrero Rondnoir Pralinen':'Ferrero Rondnoir Pralines',
 'Ferrero Rocher Pralinen':'Ferrero Rocher Pralines',
 'Ferrero Die Besten Classic':'Ferrero Finest Selection Classic'
};
export const englishDescription=(value:string)=>descriptions[value]??value;
