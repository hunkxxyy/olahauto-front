///todo:A css-t az indexben kel beolvasni, mert csak ott mûködik
import { Component, OnInit  } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'app-fileupload-temp',
  templateUrl: './fileupload-temp.component.html',
  styleUrls: ['./fileupload-temp.component.css']
})
export class FileuploadTempComponent implements OnInit {




  ngOnInit() {

    jQuery('.flexslider').each(function(){
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
        nextText: "",

        start: function(){jQuery(".flex-caption").fadeIn();}
      });




    })

  }


}