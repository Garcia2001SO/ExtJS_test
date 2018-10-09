Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.tab.Panel'
]);


// Ext JS Library 3.3.1
Ext.onReady(function(){

    Ext.QuickTips.init();

    /*
     * ================  Simple form  =======================
     */

    let simple = Ext.create('Ext.form.Panel', {
        url:'saveForm.php',
        frame:true,
        title: 'Form',
        bodyStyle:'padding:5px 5px 0',
        width: 400,
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
            // vtype:'email'
        }
        ],

        buttons: [{
            text: 'Save',
            handler: function(){
                let valores = simple.getForm().getValues();
                let obj = { Codigo:valores.tra_cod,
                            Nombre:valores.tra_nom,
                            Paterno:valores.tra_pat,
                            Materno:valores.tra_mat };
                let dbParam = JSON.stringify(obj);
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "saveForm.php?x=" + dbParam, true);
                xmlhttp.send();
            }
        },{
            text: 'Cancel',
            handler: function(){
                console.log('cancel button');
            }
        }]
    });

    simple.render(document.body);
});
