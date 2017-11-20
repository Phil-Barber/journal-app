var state = {
    dateFocus : Date,
    editItem : id,
    dateItems : {
        isFetching : false,
        entriesByDate : {
            Date : {
                items : [{
                    _id : 0,
                    title : "example item",
                    body : "some more info",
                    parent : page
                }]
            }
        }
    },
    pages : {
        isFetching : false,
        entries : [
        {
            _id : 0,
            title : "example page",
            body : "Markdown text",
            children : [item1, item2, page2]
        }
        ]
    }
}
