///todo:A css-t az indexben kel beolvasni, mert csak ott m�k�dik
import { Component, OnInit  } from '@angular/core';
import { ApiRequest, APIService  } from '../../globals/services/API.service';
import {globals  } from '../../globals/global.constats';

declare var jQuery:any;

@Component({
  selector: 'app-flex-slider',
  templateUrl: './flex-slider.component.html',
  styleUrls: ['./flex-slider.component.css']
})
export class FlexSliderComponent implements OnInit{


    pictures:any[]=[];
  constructor(private _APIService:APIService){

  }
  imageList:any[]=[];
  ngOnInit() {
      this.getImageList();
  }
  loadlist() {

  jQuery('.flexslider').each(function () {

      var sliderInstance = jQuery(this);

      sliderInstance.flexslider({
        animation: true,
        easing: "swing",
        direction: 'horizontal',
        slideshow: true,
        slideshowSpeed: 5000,
        animationSpeed: 600,
        initDelay: 0,
        randomize: false,
        pauseOnHover: false,
        controlNav: true,
        directionNav: true,
        prevText: "",
        nextText: ""

        /*start: function () {
          jQuery(".flex-caption").fadeIn();
        }*/
      });


    })

  }
   getImageList() {

          /* console.log(this.search);*/
           let connection:ApiRequest = {
              link: 'api/ckeditor/images/list/',
              params: {index:"banner-images"},
               methode: 'PUT',
               microservice: globals.MS_SERVER
           };
           this._APIService.getResponseFromMicroService(connection)
               .subscribe(
                   data=> {
                       console.log(data);
                     this.imageList=data;
                    // this.sliderInit();
                       data.forEach((obj, index)=> {
                            this.pictures.push(globals.MS_SERVER+obj.file);
                            });
                       setTimeout(()=>{ this.loadlist();}, 100);

               },
                   error=> {
                   console.log(error);
               }
           )
       }
}


