import {Injectable} from '@angular/core';
import {DateType} from '../TYPES';
import {HunkInputClass} from '../../components/hunkInput/HunkInputType';

@Injectable()
export class Functions {
    public compairStrings(str1, str2) {
        if (str1 == null || str2 == null) return false;
        var str1Lover = this.hugarianToEnglish(str1.toLowerCase());
        var str2Lover = this.hugarianToEnglish(str2.toLowerCase());
        return (str1Lover == str2Lover);

    }

    //public orderByMatchIndex()
    public matchAccent(inThis, searchThis) {
        if (inThis == null || searchThis == null) {
            console.log('matchAccent arror:' + inThis + ', ' + searchThis);
            return false;
        }
        inThis = this.hugarianToEnglish(inThis.toLowerCase());
        searchThis = this.hugarianToEnglish(searchThis.toLowerCase());

        var index = inThis.indexOf(searchThis);
        //console.log(inThis+'=='+searchThis+':'+index);
        return (index !== -1);
    }

    public markSubstring(string, subString, style, faultReturn) {

        if (!string || !subString) return '';

        var stringLover = this.hugarianToEnglish(string.toLowerCase());
        var subStringLover = this.hugarianToEnglish(subString.toLowerCase());

        var index = stringLover.indexOf(subStringLover);

        var indexObj = {
            start: index,
            length: subString.length

        };
        var part1 = string.substr(0, indexObj.start);
        var part2 = string.substr(indexObj.start, indexObj.length);
        var part3 = string.substr(indexObj.start + indexObj.length);
        if (indexObj.start == -1 && faultReturn) return string;
        else
            return (indexObj.start == -1) ? '' : part1 + '<span class="'+style+'">' + part2 + '</span>' + part3;

    }

    public hugarianToEnglish(hunChar) {
        var hun = ['á', 'é', 'í', 'ó', 'ö', 'ő', 'ú', 'ü', 'ű'];
        var eng = ['a', 'e', 'i', 'o', 'o', 'o', 'u', 'u', 'u'];
        for (var c = 0; c < hunChar.length; c++) {
            for (var i = 0; i < hun.length; i++) {
                //hunChar[c] = hunChar[c].replace(hun[i], eng[i]);

                if (hunChar[c] == hun[i]) {
                    hunChar = hunChar.replace(hun[i], eng[i]);

                }

            }

        }

        return hunChar;
    }

    public getDecimalsCount(stringNunbersArr, max) {
        let length = 0;

        for (var i = 0; i < stringNunbersArr.length; i++) {
            if (stringNunbersArr[i] != null && stringNunbersArr[i] != '') {
                let item:string = stringNunbersArr[i].toString();
                if (item != null && item != '') {
                    if (item.indexOf(".") != -1) {
                        let parts = item.split(".");
                        if (parts[1].length > length) length = parts[1].length;
                    }
                    if (item.indexOf(",") != -1) {
                        let parts = item.split(".");
                        if (parts[1].length > length) length = parts[1].length;
                    }


                }

            }
        }

        return (length > max) ? max : length;
    }

    //---------------DATE-----------------------------------------------
    public dateObjectToDate(date:DateType) {


        const y = date.Year;
        const m = (date.Month > 10) ? date.Month : '0' + date.Month;
        const d = (date.Day > 10) ? date.Day : '' + date.Day;

        return y + '.' + m + '.' + d;
    }

    public compressRequest(request) {
        var copy = Object.assign({}, request)
        for (var key in copy) {

            var value = copy[key];
            if (value instanceof Array) {
                let container = [];
                for (var item of copy[key]) {
                    container.push(this.compressRequest(item));

                }
                copy[key] = container;
            }
            else {
                var compressed = this.compressValue(copy[key])
                if (compressed)
                    copy[key] = compressed;
/*                else delete copy[key];*/

            }


        }
        return copy;
    }

    private compressValue(value) {

        if (value instanceof HunkInputClass)
            return value.value;
        else if (value == null)
            return false;
        else if (value.id) {

            return value.id;

        }
        //else return false;
        //else if (value )  return value;
        else if (value instanceof Object)  return false;
        else return value;

    }

    public  removeOfWindows(str) {
        return str.replace(/[\x00-\x1f\x7f\x22\x2a\x2f\x3a\x3c\x3e\x3f\x5c\x7c]/g, "-");


    }
}
