import { Component, OnInit , NgZone} from '@angular/core';
import {ErrorService} from "../../../globals/services/error.service";
import {APIService,ApiRequest} from "../../../globals/services/API.service";
import {AuthService} from "../../../globals/services/auth.service";
import {MultipartItem} from "../../../utils/multipart-upload/multipart-item";
import {MultipartUploader} from "../../../utils/multipart-upload/multipart-uploader";
import {globals} from "../../../globals/global.constats";

interface ImgParam {

    width?:number;
    subdir?:string;

}
@Component({

    selector: 'app-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.css'],
    inputs: ['PATH', 'INDEX', 'imgParams','exactSizeLabel','usePosition','disbleNameInput','disbleSizeInput'],


})

export class FileUploaderComponent implements OnInit {
    private zone:NgZone;
    private basicOptions:Object;

    private progress:number = 0;
    private response:any = {};
    imageList:any[] = [];
    disbleNameInput:boolean=false;
    disbleSizeInput:boolean=false;
    host:any;
    exactSizeLabel='';
    PATH:string = ''; //A szerverena kép gyökér utvonala
    INDEX:string = '';//a képlista indexe, ezek töltődnek be
    filename:string; //a file neve ha nem adja meg akkor eredeti marad
    imgParams:ImgParam[] = [];
    usePosition=false; //set true if you wabt to use order by os
    ngOnInit() {
        this.loadImageList();
        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url:globals.MS_SERVER+'api/ckeditor/fileupload',
            sajatadat: 'hunk',
            data: {
                PATH: this.PATH,
                INDEX: this.INDEX,
                filename: this.filename,
                params: JSON.stringify(this.imgParams)
            },
            customHeaders: {

                'Authorization': 'Bearer ' + this._AuthService.user.access_token
            }
        };
    }

    handleUpload(data: any): void {


        this.zone.run(() => {
            console.log(data);
            this.response = data;
            this.progress = data.progress.percent ;
            if (data.done){
                this.progress=0;
                this.loadImageList();
            }
        });
    }

    uploadCallback:(data) => void;

    constructor(private _ErrorService:ErrorService,
                private _ApiService:APIService,
                private _AuthService:AuthService) {
        this.host = globals.MS_SERVER;
        this.uploadCallback = (data) => {

            console.log(data);
            if (data) {
                this.loadImageList();
                // console.debug("home.ts & uploadCallback() upload file success.");
            } else {
                console.error("home.ts & uploadCallback() upload file false.");
            }
        }

    }


    loadImageList() {


        /* console.log(this.search);*/
        let connection:ApiRequest = {
            link: 'api/ckeditor/images/list',
            methode: 'PUT',
            params: {"index": this.INDEX},
            microservice: globals.MS_SERVER
        };

        this._ApiService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                console.log(data);
                this.imageList = data;

            },
                error=> {
                console.log(error);
            }
        )

    }

    deletePicture(pic) {
        var txt;
        var r = confirm("Biztosan törlöd a képet?");
        if (r == true) {

            let connection:ApiRequest = {
                link: 'api/ckeditor/filedelete/' + pic.id,
                methode: 'PUT',

                microservice: globals.MS_SERVER
            };
            this._ApiService.getResponseFromMicroService(connection)
                .subscribe(
                    data=> {
                    console.log(data);
                    this.loadImageList();

                },
                    error=> {
                    console.log(error);
                }
            )
        }

    }
    setPosition(image){


                console.log(image);
                let connection:ApiRequest = {
                   link: 'api/ckeditor/update/'+image.id,
                    params: {"pos": image.pos},
                    methode: 'PUT',
                    microservice: globals.MS_SERVER
                };

        this._ApiService.getResponseFromMicroService(connection)
            .subscribe(
                data=> {
                console.log(data);
               this.loadImageList();

            },
                error=> {
                console.log(error);
            }
        )
    }
}

