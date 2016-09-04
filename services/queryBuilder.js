'use strict';

function createFilter(filter) {
    var searchQuery = {};
    if (!filter)
        return searchQuery;

    var filters = filter.split(';');

    var obj = {};

    filters.forEach(function (element) {
        var values = element.split('=');
        if (values[0].length > 0) {
            obj[values[0]] = values[1];
        }
    });

    var dateRange = {};

    if (obj.categoryId && obj.categoryId != -1) {
        searchQuery['category.categoryId'] = obj.categoryId;
    }

    if (obj.subcategoryId && obj.subcategoryId != -1) {
        searchQuery['subCategory.subcategoryId'] = obj.subcategoryId;
    }

    if (obj.paymentTypeId && obj.paymentTypeId != -1) {
        searchQuery['paymentType.paymentId'] = obj.paymentTypeId;
    }

    //Check if date range
    if (obj.startDate && obj.endDate) {
        dateRange['$gte'] = new Date(obj.startDate);
        var endDate = new Date(obj.endDate);
        dateRange['$lt'] = endDate.setDate(endDate.getDate() + 1);

        searchQuery['paymentDate'] = dateRange;
    }

    return searchQuery;
};

function createSortQuery(sortString, model) {
    var sortQuery = {};
    var sortOrder = -1;
    if (sortString) {
        var sortItems = sortString.split(',');
        var sortItem = '';
        sortItems.forEach(function (element) {
            if (element.indexOf('-') !== 0) {
                sortOrder = 1;
            }

            sortItem = element.replace('-', '');
            sortQuery[sortItem] = sortOrder;
        });
    }
    else {
        sortQuery['paymentDate'] = sortOrder;
    }

    return model.sort(sortQuery);
}

function createPaginationQuery(offset,limit,model) {
    var $skip = 0;
    var $limit = 10;
    if (limit) {
        $limit = parseInt(limit);
        model = model.limit($limit);
    }

    if (offset) {
        $skip = $limit * (parseInt(offset) - 1);
        model = model.skip($skip);
    }

    return model;
}


function parseQueryString(queryString, model) {
    if (!queryString) return query;
    var _model= model;
    //Filter
    var filterQuery = createFilter(queryString.filter);
   // var countModel = model.find(filterQuery);
    model = model.find(filterQuery);

    //Sorting
    model = createSortQuery(queryString.sort, model);

    // Pagination
    model = createPaginationQuery(queryString.offset,queryString.limit,model);

    var builder = {
        searchQuery: model,
        countQuery:  _model.count(filterQuery)
    };

    return builder;
}

module.exports = {
    // parseFilter: parseFilter,
    parseQueryString: parseQueryString
};