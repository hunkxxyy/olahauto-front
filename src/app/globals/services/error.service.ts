import {ErrorType} from '../TYPES';
export enum MessageTypes {

    mtSuccess,
    mtInfo,
    mtWarning,
    mtDanger


}
export interface ErrorMsg{
    type:MessageTypes,
    msg:string
}

export class ErrorService {
    public _errors:ErrorType;
    public messageType:MessageTypes;
    private _debugMsg = new Array<String>();
    private _errorMsg = new Array<String>();
    public debuggerVisible=false;


    getErrorMsg(){
        return this._errorMsg;

    }
    setErrorMsg(msg:ErrorMsg) {
        // this.errorClear();
        //if (succesError!=this.errorSucces) this.errorClear();
        this.messageType=msg.type;
        this.errorClear() ;

        this._errorMsg.push(msg.msg);
      /*  console.log('error service msg:');
        console.log(msg);*/


    }
    getdDebugMsg() {
        return this._debugMsg;
    }

    setDebugmSG(msg) {
        this._debugMsg.push(msg)

    }

    debugClear() {
        this._debugMsg = [];
    }
    errorClear() {
        this._errorMsg = [];
    }



}
