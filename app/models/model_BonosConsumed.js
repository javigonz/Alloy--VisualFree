exports.definition = {
	config: {
		columns: {
		    "nombreBono": "string",
		    "nombreCliente": "string",
		    "dateConsumo": "string",
		    "dateCompra": "string",
		    "nombreValidador": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "model_BonosConsumed"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};