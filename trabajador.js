Ext.define('App.model.Tra', {
    extend: 'Ext.data.Model',
    idProperty: 'tra_ide',
    fields: [
        { name: 'tra_ide', type: 'int' },
        { name: 'tra_cod', type: 'int' },
        { name: 'tra_nom', type: 'string' },
        { name: 'tra_pat', type: 'string' },
        { name: 'tra_mat', type: 'string' },
        { name: 'est_ado', type: 'int' }
    ],
    schema: {
        namespace: 'App.model',  
        proxy: {     
            type: 'ajax',
            url: '../../../api/{entityName}sAssociationsOneToOne',
            reader: {
                type: 'json',
                rootProperty: '{entityName:lowercase}s'
            }
        }
    }
});