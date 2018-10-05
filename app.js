Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();
    
    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    // create the data store
    var store = Ext.create('Ext.data.ArrayStore', {
        fields: [
           {name: 'company'},
           {name: 'price',      type: 'float'},
           {name: 'change',     type: 'string'},
           {name: 'pctChange',  type: 'string'},
           {name: 'lastChange', type: 'string'},
           {name: 'est_ado', type: 'number'}
        ],
        // data: myData
        data: myRetrievedData
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
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
                
            }
        }],
        viewConfig: {
            stripeRows: true
        }
    });
});
