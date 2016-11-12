export interface HunkInputType {
    value :string;
    placeHolder: string;
    label? : string;
    clear?:() => void;
    showDropArrow?:boolean;



}
export class HunkInputClass {
    value :string='';
    placeHolder: string;
    label : string;
    error:string='';
    fixList:boolean=false;
    constructor(placeHolder: string) {
        this.placeHolder = placeHolder || '';
      this.error='';
    }



}

