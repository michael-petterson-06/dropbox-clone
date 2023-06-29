class DropBoxController {
    
    constructor(){

            this.btnSendFileEl = document.querySelector('#btn-send-file');
            this.inputFilesEl = document.querySelector('#files');
            this.snackModalEl = document.querySelector('#react-snackbar-root');

            this.initEvents();
        }

        initEvents() {
            
            this.btnSendFileEl.addEventListener('click', event => {
                this.inputFilesEl.click();
            });

            this.inputFilesEl.addEventListener('change', event => {

                this.uploadTask(event.target.files)
                
                // this.snackModalEl.style.display = (show) ? 'block' : 'none';
                this.snackModalEl.style.display = 'block';
            });
                   
        };

        uploadTask(files){

            let promises = [];
            [...files].forEach(file => {
                console.log(file)
                promises.push(new Promise((resolve, reject) => {
    
                   let ajax = new XMLHttpRequest();

                   ajax.open('POST', '/upload');

                   ajax.onload = event => {
                    console.log('entrou no ajax')
                        try {
                            resolve(JSON.parse(JSON.stringify(ajax.responseText)));
                            
                            console.log('deu certo')
                        } catch (e) {
                            
                            console.log('deu errado')
                            reject(e);
                        }
                    };
    
                    ajax.onerror = event => {
                        console.log('deu errado')
                        reject(event);
    
                    };

                    let formData = new FormData() //Le arquivo
                    
                    //Cria o nome do campo no servidor e envia o arquivo
                    formData.append('input-file', file); 
                    console.log(formData)           

                    ajax.send(formData);
    
                }));
    
            });

            return Promise.all(promises);
    
        };
    }

   