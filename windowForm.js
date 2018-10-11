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
            items: [{
                itemId: 'form1',
                xtype: 'form',
                bodyStyle:'padding:15px 15px 15px 15px',
                fieldDefaults: {
                    msgTarget: 'side',
                    labelWidth: 110
                },
                defaultType: 'textfield',
                defaults: {
                    width: 350
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
                    width: 100,
                    handler: function(){
                        let valores;
                        valores = this.up('form').getValues();
                        console.log(valores);

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
                    width: 100,
                    handler: function(){
                        console.log(this.up('form').getForm());
                        this.up('form').getForm().reset();
                        win.hide(dis);
                    }
                }]
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
