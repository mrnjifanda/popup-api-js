(()=>{
    let base = {
        setCookie: (name, value, days = 7, path = '/') => {
			try {
				const expires = new Date(Date.now() + days * 864e5).toUTCString()
				document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
			} catch (e) {
			}
		},
		getCookie: (name) => {
			try {
				return document.cookie.split('; ').reduce((r, v) => {
					const parts = v.split('=')
					return parts[0] === name ? decodeURIComponent(parts[1]) : r
				}, '')
			} catch (e) {
				return '';
			}
		},
		deleteCookie: (name, path) => {
			setCookie(name, '', -1, path)
		},
        initialize:(key,password,callback,username=null)=>{
            // username null verify , else register 
        },
        getAttr: (script, attr) => {
            return (script.getAttribute('seven-' + attr) || script.getAttribute('data-' + attr));
        },
        verify:()=>{
            // attemps to verify
        },
        register:()=>{
            // attempt to register
        },
        initScript:()=>{
            var faceClickHandler = () => {
                // initalise api

                // open popup now
                base.openPopup();
            }
            
            document.getElementById('seven-face-btn').addEventListener('click',faceClickHandler)
        },
        openPopup:(url = "http://www.njifanda.com")=>{

            const width = 500;
            const height = 600;
    
            if (WindowObjectReference == null || WindowObjectReference.closed) {
    
                let left = (document.body.clientWidth - width) / 2;
                let top = (document.body.clientHeight - height) / 2;
    
                if (window.innerWidth) {
                    left = (window.innerWidth - width) / 2;
                    top = (window.innerHeight - height) / 2;
                }
    
                WindowObjectReference = window.open(
                    url,
                    "Face verification",
                    "resizable=no, dialog=yes, scrollbars=auto, menubar=no, toolbar=no, directories=no, location=no, status=no, top=" + top + ", left=" + left + ", width=" + width + ", height=" + height
                );
    
                base.hideBody();
    
                const checkPopup = setInterval(() => {
                    if (WindowObjectReference === null || WindowObjectReference.closed) {
                        base.showBody();
                        clearInterval(checkPopup);
                    }
                }, 1000);
    
                // const currentInstance = this;
                // this.WindowObjectReference.onbeforeunload = function(){
                //     currentInstance.showBody();
                // }
            }
            base.focusPopup();
        },
        createButton:(callToAction)=>{
            callToAction = JSON.parse(callToAction);
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("id", "seven-face-btn");
            button.innerHTML = callToAction.label;
    
            const parentElementTag = document.querySelector("#" + callToAction.id);
    
            if (parentElementTag) {
                parentElementTag.appendChild(button);
            }
        },
        hideBody:()=>{
            const div = document.createElement('div');
            div.setAttribute('id', 'seven-face-background');
    
            div.style.position = 'absolute';
            div.style.top = 0;
            div.style.left = 0;
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.background = 'rgb(0 0 0 / 60%)';
            div.style.zIndex = 9999;
    
            div.addEventListener('click', e => {
                e.preventDefault();
                base.closePopup();
            });
    
            document.body.prepend(div);
        },
        showBody:()=>{
            const div = document.querySelector("div#seven-face-background");
            if (div) {
                document.body.removeChild(div);
            }
        },
        closePopup:()=>{
            if (WindowObjectReference !== null && !WindowObjectReference.closed) {
    
                // if (confirm("Voulez vous vraiment fermer cette fenetre ?")) {
                //     WindowObjectReference.window.close();
                //     base.showBody();
                //     return true;
                // }
    
                base.focusPopup();
            }
        },
        focusPopup:()=>{
            WindowObjectReference.focus();
        },
        scriptEle: () => {
            return document.getElementById("seven-web-face-script");
        },
        main:()=>{
            let script = base.scriptEle();
            let apiKey = base.getAttr(script,"api-key")
            let apiPassword = base.getAttr(script,"api-password")
            let sucessUrl = base.getAttr(script,"success-url")
            let cancelUrl = base.getAttr(script,"cancel-url")
            let callToAction = base.getAttr(script,"api-id-button")

            // ajouter un button
            base.createButton(callToAction)
            base.initScript()
        }
    }

    let WindowObjectReference = null;

    //let script = base.scriptEle();
    // let manualInit = base.getAttr(script, "manual-init");
    // if (manualInit == 'true') {
    //     window.Face = (...args) => {
    //         base.main(...args);
    //     }
    // } else {
    //     base.main();
    // }
     base.main();
})()