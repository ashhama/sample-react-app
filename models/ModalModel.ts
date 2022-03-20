class ModalModel {
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info" | "none";
    linkMain?:{title: string , url: string};
    linkSub?:{title: string , url: string};
    onClose?: () => void;

    constructor(onClose?: () => void) {
        this.title = "";
        this.message = "";
        this.type = "info",
        this.linkMain = {title: '' , url: ''};
        this.linkSub = {title: '' , url: ''};
        this.onClose = onClose;
    }

    //implement call signatures
    open(title: string, message: string, type: "success" | "error" | "warning" | "info" | "none", linkMain?:{title: string , url: string}, linkSub?:{title: string , url: string}, onClose?: () => void) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.linkMain = linkMain;
        this.linkSub = linkSub;
        this.onClose = onClose;

        return this;
    }

    close() {
        this.type = "info";
        if (this.onClose) {
            this.onClose();
        }

        return this;
    }

  
   
  }
  
  export default ModalModel;
  