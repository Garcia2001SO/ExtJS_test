Ext.require([
    'Ext.direct.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.tab.*',
    'Ext.window.*',
    'Ext.tip.*',
    'Ext.layout.container.Border',
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.tab.Panel',
]);

Ext.onReady(function() {
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    //MODELS
    let venta = Ext.define('Venta', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'ven_ide', type: 'number' },
            { name: 'ven_ser', type: 'string' }, 
            { name: 'ven_num', type: 'string' },
            { name: 'ven_cli', type: 'string' },
            { name: 'ven_mon', type: 'number' }
        ],
        proxy: {
            type: 'ajax',
            url: 'php/getVenta.php',
            reader: 'json'
        }
    });

    let ventaDetalle = Ext.define('ventaDetalle', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'v_d_ide', type: 'number' },
            { name: 'ven_ide', type: 'number' },
            { name: 'v_d_pro', type: 'string' },
            { name: 'v_d_uni', type: 'number' },
            { name: 'v_d_can', type: 'number' },
            { name: 'v_d_tot', type: 'number' },
            { name: 'est_ado', type: 'number' }
        ]
    });

    //STORES
    let ventaStore = Ext.create('Ext.data.Store', {
        model: venta,
        autoLoad: true
    });

    let detalleStore = Ext.create('Ext.data.Store', {
        model: ventaDetalle
    });


    //VIEWPORT
    let viewport = Ext.create('Ext.Viewport', {
        layout:'border',
        items:[{
            itemId: 'item0',
            region:'center',
            margins:'35 5 5 0',
            layout:'column',
            autoScroll:true,
            defaults: {
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            items: [{
                itemId: 'grids',
                columnWidth: 2/5,
                baseCls:'x-plain',
                bodyStyle:'padding:5px 0 5px 5px',
                items: [{
                    xtype: 'gridpanel',
                    itemId: 'gridCabecera',
                    title: 'Grid Cabecera',
                    // columnWidth: 1/2,
                    store: ventaStore,
                    bodyStyle:'padding:5px 0 5px 5px',
                    height: 300,
                    columns: [
                        {
                            text: 'ID',
                            dataIndex: 'ven_ide',
                            width: 50
                        },{
                            text: 'Serie',
                            dataIndex: 'ven_ser',
                            width: 100
                        },{
                            text: 'Numero',
                            dataIndex: 'ven_num',
                            width: 90
                        },{
                            text: 'Cliente',
                            dataIndex: 'ven_cli',
                            width: 100
                        },{
                            text: 'Mom',
                            dataIndex: 'ven_mon',
                            width: 80
                        }
                    ],
                    tbar: [{
                        text: 'Nuevo',
                        handler: function(){
                            let frm = viewport.getComponent('item0').getComponent('forms').getComponent('form1');
                            frm.show();
                        }
                    },{
                        text: 'Eliminar',
                        handler: function(){
                            let gridCabecera = viewport.getComponent('item0').getComponent('grids').getComponent('gridCabecera');
                            let sm = gridCabecera.getSelectionModel();

                            Ext.Msg.show({
                                title: '¿Eliminar?',
                                msg: 'Esto eliminara una venta ¿Quiere continuar?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if(btn === 'yes'){
                                        let dbParam = JSON.stringify(sm.getSelection()[0].data);

                                        let xmlhttp = new XMLHttpRequest();
                                        xmlhttp.open("GET", "php/deleteVenta.php?x=" + dbParam, true);
                                        xmlhttp.send();
            
                                        xmlhttp.onreadystatechange = function(){
                                            if(this.readyState == 4 &&
                                                this.status == 200){
                                                    detalleStore.sync();
                                                }
                                        }
                                    }
                                }
                            });
                        }
                    }]
                    },{
                    xtype: 'gridpanel',
                    itemId: 'gridDetalle',
                    title: 'Grid Detalle',
                    store: detalleStore,
                    bodyStyle:'padding:5px 0 5px 5px',
                    height: 300,
                    columns: [
                        {
                            text: 'Detalle ID',
                            dataIndex: 'v_d_ide',
                            width: 70
                        },{
                            text: 'Venta ID',
                            dataIndex: 'ven_ide',
                            width: 60
                        },{
                            text: 'Producto',
                            dataIndex: 'v_d_pro',
                            width: 90
                        },{
                            text: 'Precio Unitario',
                            dataIndex: 'v_d_uni',
                            width: 90
                        },{
                            text: 'Cantidad',
                            dataIndex: 'v_d_can',
                            width: 60
                        },{
                            text: 'Total',
                            dataIndex: 'v_d_tot',
                            width: 50
                        },{
                            text: 'Estado',
                            dataIndex: 'est_ado',
                            width: 50
                        }
                    ],
                    tbar: [{
                        text: 'Agregar',
                        handler: function(){
                            let frm = viewport.getComponent('item0').getComponent('forms').getComponent('form2');
                            frm.show();
                        }
                    }]}
                ]
            },{
                itemId: 'forms',
                columnWidth: 1/3,
                items:[{
                    xtype: 'form',
                    itemId: 'form1',
                    title: 'Form1',
                    closable: true,
                    closeAction: 'hide',
                    hidden: true,
                    layout: 'auto',
                    bodyStyle:'padding:15px 0 15px 15px',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100,
                    },
                    defaults: {
                        anchor: '100%',
                        width: 400
                    },
                    defaultType: 'textfield',
                    items:[{
                        fieldLabel: 'Serie',
                        name: 'ven_ser',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Numero',
                        name: 'ven_num',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Cliente',
                        name: 'ven_cli',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Mon',
                        name: 'ven_mon',
                        allowBlank: false
                    },{
                        xtype: 'button',
                        text: 'Aceptar',
                        width: 100,
                        handler: function(){
                            let val = viewport.getComponent('item0').getComponent('forms').getComponent('form1').getValues();

                            let dbParam = JSON.stringify(val);
                            let xmlhttp1 = new XMLHttpRequest();
                            xmlhttp1.open("GET", "php/saveVenta.php?x=" + dbParam, true);
                            xmlhttp1.send();
        
                            xmlhttp1.onreadystatechange = function(){
                                if(this.readyState == 4 &&
                                    this.status == 200){
                                        ventaStore.load();
                                    }
                            }
                        }
                    },{
                        xtype: 'button',
                        text: 'Cancelar',
                        width: 100,
                        handler: function(){
                            this.up('form').getForm().reset();
                            this.up('form').hide();
                        }
                    }]
                },{
                    xtype: 'form',
                    itemId: 'form2',
                    title: 'Form2',
                    closable: true,
                    closeAction: 'hide',
                    hidden: true,
                    layout: 'auto',
                    bodyStyle: 'padding: 15px 0 15px 15px',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100,
                    },
                    defaults: {
                        anchor: '100%',
                        width: 400
                    },
                    defaultType: 'textfield',
                    items:[{
                        fieldLabel: 'Producto',
                        name: 'v_d_pro',
                        allowBlank: false
                    },{
                        fieldLabel: 'Precio Unitario',
                        name: 'v_d_uni',
                        allowBlank: false
                    },{
                        fieldLabel: 'Cantidad',
                        name: 'v_d_can',
                        allowBlank: false
                    },{
                        xtype: 'button',
                        text: 'Aceptar',
                        width: 100,
                        handler: function(){
                            let val = viewport.getComponent('item0').getComponent('forms').getComponent('form2').getValues();
                            let gridCabecera = viewport.getComponent('item0').getComponent('grids').getComponent('gridCabecera');
                            
                            if(gridCabecera.getSelectionModel().getSelection().length !== 0){
                                console.log('lleno');
                                let id = gridCabecera.getSelectionModel().getSelection()[0].data.ven_ide;
                                let dbParam = JSON.stringify(val);
                                let xmlhttp = new XMLHttpRequest();
                                xmlhttp.open("GET", "php/saveVenta_Detalle.php?x=" + dbParam + "&y=" + id, true);
                                xmlhttp.send();
    
                                xmlhttp.onreadystatechange = function(){
                                    if(this.readyState == 4 &&
                                        this.status == 200){
                                            detalleStore.load();
                                        }
                                }
                            }else { console.log('vacio');}
                        }
                    },{
                        xtype: 'button',
                        text: 'Cancelar',
                        width: 100,
                        handler: function(){
                            this.up('form').getForm().reset();
                            this.up('form').hide();
                        }
                    }]
                }]
            }]
        }]
    });

    let gridCabecera = viewport.getComponent('item0').getComponent('grids').getComponent('gridCabecera');

    gridCabecera.on('select', function(e){
        let dbParam = JSON.stringify(e.getSelection()[0].data);

        myProxy = {
            type: 'ajax',
            url: 'php/selectGridCabecera.php?x=' + dbParam,
            reader: 'json'
        }

        detalleStore.setProxy(myProxy);
        detalleStore.load();
    });
});