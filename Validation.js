class Validation {
    constructor(api_key, password) {
      this.api_key = api_key;
      this.password = password;
      this.WindowObjectReference = null;
    }

    verify() {
        // return this.calcArea();
    }

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
                "resizable=no, dialog=yes, scrollbars=auto, menubar=no, toolbar=no, directories=no, location=no, status=no, top="+top+", left="+left+", width="+width+", height="+height+""
            );

            this.hideBody();
        }

        this.focusPopup();
    }

    closePopup() {
        if(this.WindowObjectReference !== null && !this.WindowObjectReference.closed){
            if (confirm("Voulez vous vraiment fermer cette fenetre ?")) {
                this.WindowObjectReference.window.close();
                // this.showBody();
                const body = document.body;

                // const div = document.querySelector('#popup-validation-face');
                body.removeAttribute('onclick');
                body.removeAttribute('onFocus');
            }
        } else {
            this.focusPopup();
        }


        // const WindowObjectReference = this.WindowObjectReference;
        // const showBody = this.showBody;

        // // window.onfocus = function() {
        // //     if (confirm("Voulez vous vraiment fermer cette fenetre ?")) {
        // //         WindowObjectReference.window.close();
        // //         showBody();
        // //     }
        // // }
    }

    focusPopup() {
        this.WindowObjectReference.focus();
        // if(this.WindowObjectReference && !this.WindowObjectReference.closed) {
        //     this.WindowObjectReference.focus();
        // }
    }

    hideBody () {
        // // const div = document.createElement('div');
        // const body = document.body;
        // // div.setAttribute('id', 'popup-validation-face');
        // // div.style.position = 'absolute';
        // // div.style.top = 0;
        // // div.style.left = 0;
        // // div.style.width = '100%';
        // // div.style.height = '100%';
        // // div.style.background = 'rgb(0 0 0 / 60%)';
        // // div.style.zIndex = 9999;

        // body.prepend(div);
    
        const body = document.body;

        body.setAttribute('onclick', 'closePopup()');
        body.setAttribute('onFocus', 'closePopup()');
    }

    showBody () {
        const div = document.getElementById("popup-validation-face");
        if (div) {
            document.body.removeChild(div);
        }
    }
}