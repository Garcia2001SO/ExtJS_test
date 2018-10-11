function newWindow(dis, win, store){
    if (!win) {
        win = Ext.create('widget.window', {
            title: 'Form',
            closable: true,
            closeAction: 'hide',
            width: 400,
            minWidth: 350,
            height: 200,
            region: 'center',
            xtype: 'form',
            bodyStyle:'padding:5px 5px 0',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 110
            },
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [{
                fieldLabel: 'Codigo',
                name: 'tra_cod',
                allowBlank:false
            },{
                fieldLabel: 'Nombre',
                name: 'tra_nom'
            },{
                fieldLabel: 'Apellido Paterno',
                name: 'tra_pat'
            }, {
                fieldLabel: 'Apellido Materno',
                name: 'tra_mat',
            },{
                xtype: 'button',
                text: 'Aceptar',
                handler: function(){
                    let valores = [];
                    win.items.items.forEach(element => {
                        valores.push(element.value);
                    });
                    let dbParam = JSON.stringify(valores);
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", "saveForm.php?x=" + dbParam, true);
                    xmlhttp.send();

                    xmlhttp.onreadystatechange = function(){
                        if(this.readyState == 4 &&
                            this.status == 200){
                                store.load();
                            }
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Cancelar',
                handler: function(){
                    // console.log('Cancelar');
                    // win.items.items.clear();
                    // console.log(win);

                    // for(i=0; i<=3; i++){
                    //     win.items.items[i].value = "";
                    //     console.log(i);
                    // }
                    win.hide(dis);
                }
            }],
        });
    }
    
    if (win.isVisible()) {
        win.hide(dis);
    } else {
        win.show(dis);
    }

    return win;
}
