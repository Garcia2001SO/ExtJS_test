Ext.require([
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
    Ext.QuickTips.init();

    let myWin;
    
    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    // create the model
    let trabajador = Ext.define('Trabajador', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'company'},
            {name: 'price',      type: 'float'},
            {name: 'change',     type: 'string'},
            {name: 'pctChange',  type: 'string'},
            {name: 'lastChange', type: 'string'},
            {name: 'est_ado', type: 'number'}
         ]
    })

    // create the data store
    let store = Ext.create('Ext.data.Store', {
        model: trabajador,
        proxy: {
            type: 'ajax',
            url: 'getTrabajadores.php',
            reader: 'json'
        },
        autoLoad: true
    });

    // create the Grid
    let grid = Ext.create('Ext.grid.Panel', {
        store: store,
        stateful: true,
        stateId: 'stateGrid',
        columns: [
            {
                text     : 'tra_ide',
                flex     : 1,
                sortable : false,
                dataIndex: 'company'
            },
            {
                text     : 'tra_cod',
                width    : 75,
                sortable : true,
                dataIndex: 'price'
            },
            {
                text     : 'tra_nom',
                width    : 75,
                sortable : true,
                dataIndex: 'change'
            },
            {
                text     : 'tra_pat',
                width    : 75,
                sortable : true,
                dataIndex: 'pctChange'
            },
            {
                text     : 'tra_mat',
                width    : 85,
                sortable : true,
                dataIndex: 'lastChange'
            },
            {
                text     : 'est_ado',
                width    : 85,
                sortable : true,
                dataIndex: 'est_ado'
            }
        ],
        height: 350,
        width: 600,
        title: 'GridArray',
        renderTo: 'grid-example',
        tbar: [{
            text: 'Nuevo',
            handler: function(){
                myWin = newWindow(this, myWin);
            }
        },{
            text: 'Refresh',
            handler: function(){
                myRetrievedData = getTrabajadores();
                var newStore = Ext.create('Ext.data.ArrayStore', {
                    fields: [
                       {name: 'company'},
                       {name: 'price',      type: 'float'},
                       {name: 'change',     type: 'string'},
                       {name: 'pctChange',  type: 'string'},
                       {name: 'lastChange', type: 'string'},
                       {name: 'est_ado', type: 'number'}
                    ],
                    data: myRetrievedData
                });
                //grid.getStore().removeAll();
                grid.bindStore(newStore, true);
            }
        }],
        viewConfig: {
            stripeRows: true
        }
    });
});
