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
    Ext.QuickTips.init();

    let myWin;
    let rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToMoveEditor: 1,
		autoCancel: false
	});
    
    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    // create the model
    let trabajador = Ext.define('Trabajador', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'tra_ide', type: 'number'},
            {name: 'tra_cod', type: 'float'},
            {name: 'tra_nom', type: 'string'},
            {name: 'tra_pat', type: 'string'},
            {name: 'tra_mat', type: 'string'},
            {name: 'est_ado', type: 'number'}
         ],
         proxy: {
             type: 'ajax',
             url: 'php/getTrabajadores.php',
             reader: 'json'
         }
    });

    // create the data store
    let store = Ext.create('Ext.data.Store', {
        model: trabajador,
        autoLoad: true
    });

    // create the Grid
    let grid = Ext.create('Ext.grid.Panel', {
        store: store,
        // stateful: true,
        // stateId: 'stateGrid',
        plugins: [
            rowEditing
        ],
        columns: [
            {
                text     : 'tra_ide',
                // flex     : 1,
                width: 50,
                sortable : true,
                dataIndex: 'tra_ide'
            },
            {
                text     : 'Codigo',
                width    : 60,
                sortable : true,
                dataIndex: 'tra_cod',
                field: {
                    type: 'textfield',
                    allowBlank: false
                }
            },
            {
                text     : 'Nombre',
                width    : 100,
                sortable : true,
                dataIndex: 'tra_nom',
                field: {
                    type: 'textfield',
                    allowBlank: false
                }
            },
            {
                text     : 'A. Paterno',
                width    : 100,
                sortable : true,
                dataIndex: 'tra_pat',
                field: {
                    type: 'textfield',
                    allowBlank: false
                }
            },
            {
                text     : 'A. Materno',
                width    : 100,
                sortable : true,
                dataIndex: 'tra_mat',
                editor: 'textfield'
            },
            {
                text     : 'Estado',
                width    : 50,
                sortable : true,
                dataIndex: 'est_ado'
            }
        ],
        height: 500,
        width: 500,
        title: 'GridArray',
        renderTo: Ext.getBody(),
        tbar: [{
            text: 'Nuevo',
            handler: function(){
                rowEditing.cancelEdit();
                myWin = newWindow(this, myWin, store);
            }
        },{
            text: 'Eliminar',
            handler: function(){
                rowEditing.cancelEdit();

                let sm = grid.getSelectionModel();
                Ext.Msg.show({
                    title:'¿Eliminar?',
                    msg: 'Esto eliminara a un usuario ¿Quiere continuar?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(btn){
                        if(btn === 'yes') {
                            let dbParam = JSON.stringify(sm.getSelection()[0].data);

                            let xmlhttp = new XMLHttpRequest();
                            xmlhttp.open("GET", "php/deleteTrabajador.php?x=" + dbParam, true);
                            xmlhttp.send();

                            xmlhttp.onreadystatechange = function(){
                                if(this.readyState == 4 &&
                                    this.status == 200){
                                        store.sync();
                                    }
                            }
                        }
                    }
                });
            }
        },{
            text: 'Refresh',
            handler: function(){
                store.load();
            }
        }],
        viewConfig: {
            stripeRows: true
        }
    });

    grid.on('edit', function(e) {
        console.log('grid.on');
        // console.log(e.record.data);
        let dbParam = JSON.stringify(e.record.data);

        let xmlhttp = new XMLHttpRequest();
        
        xmlhttp.open("GET", "php/modificarTra.php?x=" + dbParam, true);
        xmlhttp.send();
        
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 &&
                this.status == 200){
                    store.sync();
                }
        }
    });
});
