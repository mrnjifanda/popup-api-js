class Validation {
    constructor(api_key, password) {
      this.api_key = api_key;
      this.password = password;

      this.WindowObjectReference = null;
      this.body = document.body;
    }

    verify() {}

    openPopup (width = 500, height = 600) {

        if (this.WindowObjectReference == null || this.WindowObjectReference.closed) {
    
            let left = (document.body.clientWidth-width)/2;
            let top = (document.body.clientHeight-height)/2;
    
            if(window.innerWidth){
                left = (window.innerWidth-width)/2;
                top = (window.innerHeight-height)/2;
            }

            this.WindowObjectReference = window.open(
                "http://www.njifanda.com/",
                "Face verification",
                "resizable=no, dialog=yes, scrollbars=auto, menubar=no, toolbar=no, directories=no, location=no, status=no, top="+top+", left="+left+", width="+width+", height="+height
            );
    
            this.hideBody();

            const checkPopup = setInterval(() => {
                if(this.WindowObjectReference === null || this.WindowObjectReference.closed){
                    this.showBody();
                    clearInterval(checkPopup);
                }
            }, 1000);

            // const currentInstance = this;
            // this.WindowObjectReference.onbeforeunload = function(){
            //     currentInstance.showBody();
            // }
        }

        this.focusPopup();
    }

    closePopup() {
        if(this.WindowObjectReference !== null && !this.WindowObjectReference.closed){

            if (confirm("Voulez vous vraiment fermer cette fenetre ?")) {
                this.WindowObjectReference.window.close();
                this.showBody();
                return true;
            }

            this.focusPopup();
        }
    }

    focusPopup() {
        this.WindowObjectReference.focus();
    }

    hideBody () {
        const div = document.createElement('div');
        div.setAttribute('id', 'popup-validation-face');
        div.setAttribute('onclick', 'closePopup()');
        div.setAttribute('onFocus', 'closePopup()');

        div.style.position = 'absolute';
        div.style.top = 0;
        div.style.left = 0;
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.background = 'rgb(0 0 0 / 60%)';
        div.style.zIndex = 9999;

        this.body.prepend(div);
    }

    showBody () {
        const div = this.body.querySelector("div#popup-validation-face");
        if (div) {
            div.removeAttribute('onclick');
            div.removeAttribute('onFocus');
            this.body.removeChild(div);
        }
    }
}