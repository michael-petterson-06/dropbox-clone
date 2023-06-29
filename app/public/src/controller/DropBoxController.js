class DropBoxController {
    
    constructor(){

            this.btnSendFileEl = document.querySelector('#btn-send-file');
            this.inputFilesEl = document.querySelector('#files');
            this.snackModalEl = document.querySelector('#react-snackbar-root');
            this.progressBarEl = this.snackModalEl.querySelector(".mc-progress-bar-fg");
            this.namefileEl = this.snackModalEl.querySelector(".filename");
            this.timeleftEl = this.snackModalEl.querySelector(".timeleft");

            this.initEvents();
        }

        initEvents() {
            
            this.btnSendFileEl.addEventListener('click', event => {
                this.inputFilesEl.click();
            });

            this.inputFilesEl.addEventListener('change', event => {

                this.uploadTask(event.target.files)
                
                // this.snackModalEl.style.display = (show) ? 'block' : 'none';
                this.modalShow();

                this.inputFilesEl.value = '';
                
            });
                   
        };

        modalShow(show = true){

            this.snackModalEl.style.display = (show) ? 'block' : 'none';
    
        }

        uploadTask(files){

            let promises = [];
            [...files].forEach(file => {
                
                promises.push(new Promise((resolve, reject) => {
    
                   let ajax = new XMLHttpRequest();

                   ajax.open('POST', '/upload');

                   ajax.onload = event => {

                        this.modalShow(false);

                        try {
                
                            resolve(JSON.parse(JSON.stringify(ajax.responseText)));
                                
                        } catch (e) {
                                
                            reject(e);
                        }
                    };
                    
                    ajax.onerror = event => {
                        
                        this.modalShow(false);
                        reject(event);
    
                    };

                    // onprogress monitora bits enviados do arquivo
                    ajax.upload.onprogress = event => {
                        this.uploadProgress(event, file);
                    }

                    let formData = new FormData() //Ler arquivo
                    
                    //Cria o nome do campo no servidor e envia o arquivo
                    formData.append('input-file', file); 
                    // let timespent = Date.now() - this.startUploadTime;
                    this.startUploadTime = Date.now();
                    ajax.send(formData);
    
                }));
    
            });

            return Promise.all(promises);
        };

        uploadProgress(event, file){

            let timespent = Date.now() - this.startUploadTime; //tempo gasto
            let loaded = event.loaded; //Dados enviados 
            let total = event.total; //Tamanho do arquivo
            let porcent = parseInt((loaded / total) * 100);
            let timeleft = ((100 - porcent) * timespent) / porcent; //tempo restante
    
            this.progressBarEl.style.width = `${porcent}%`;
            
            this.namefileEl.innerHTML = file.name;
            this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft);
    
        };


        formatTimeToHuman(duration){

            let seconds = parseInt((duration / 1000) % 60);
            let minutes = parseInt((duration / (1000 * 60)) % 60);
            let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

            if (hours > 0) {
                return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
            }

            if (minutes > 0) {
                return `${minutes} minutos e ${seconds} segundos`;
            }

            if (seconds > 0) {
                return `${seconds} segundos`;
            }

            return '';

        }

    }

   