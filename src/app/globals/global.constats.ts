/*THIS IS GITINGORED !!!!*/

export class globals {
      private manualHost='';
    public static get HOST(): string {
        return window.location.hostname;
        //  return 'global';
    }
    public static get MS_SERVER(): string {

        return (this.HOST=='localhost')?'http://olahauto-back/':'http://olahautoback.mycv-4u.com/';

    }

}
