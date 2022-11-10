var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Datagrid, DatagridBody, EditButton, List, ShowButton, useResourceContext, useResourceDefinition, } from 'react-admin';
import FieldGuesser from './FieldGuesser.js';
import FilterGuesser from './FilterGuesser.js';
import Introspecter from './Introspecter.js';
import useMercureSubscription from './useMercureSubscription.js';
import useDisplayOverrideCode from './useDisplayOverrideCode.js';
const getOverrideCode = (schema, fields) => {
    let code = 'If you want to override at least one field, paste this content in the <ListGuesser> component of your resource:\n\n';
    code += `const ${schema.title}List = props => (\n`;
    code += `    <ListGuesser {...props}>\n`;
    fields.forEach((field) => {
        code += `        <FieldGuesser source={"${field.name}"} />\n`;
    });
    code += `    </ListGuesser>\n`;
    code += `);\n`;
    code += `\n`;
    code += `And don't forget update your <ResourceGuesser> component:\n`;
    code += `<ResourceGuesser name={"${schema.name}"} list={${schema.title}List} />`;
    return code;
};
export const DatagridBodyWithMercure = (props) => {
    const { data } = props;
    const resource = useResourceContext(props);
    useMercureSubscription(resource, data === null || data === void 0 ? void 0 : data.map((record) => record.id));
    return React.createElement(DatagridBody, Object.assign({}, props));
};
export const IntrospectedListGuesser = (_a) => {
    var { fields, readableFields, writableFields, schema, schemaAnalyzer, datagridSx, bulkActionButtons, rowClick, rowStyle, isRowSelectable, isRowExpandable, body = DatagridBodyWithMercure, header, empty, hover, expand, optimized, size, children } = _a, props = __rest(_a, ["fields", "readableFields", "writableFields", "schema", "schemaAnalyzer", "datagridSx", "bulkActionButtons", "rowClick", "rowStyle", "isRowSelectable", "isRowExpandable", "body", "header", "empty", "hover", "expand", "optimized", "size", "children"]);
    const { hasShow, hasEdit } = useResourceDefinition(props);
    const [orderParameters, setOrderParameters] = useState([]);
    useEffect(() => {
        if (schema) {
            schemaAnalyzer.getOrderParametersFromSchema(schema).then((parameters) => {
                setOrderParameters(parameters);
            });
        }
    }, [schema, schemaAnalyzer]);
    const displayOverrideCode = useDisplayOverrideCode();
    let fieldChildren = children;
    if (!fieldChildren) {
        fieldChildren = readableFields.map((field) => {
            const orderField = orderParameters.find((orderParameter) => orderParameter.split('.')[0] === field.name);
            return (React.createElement(FieldGuesser, { key: field.name + (orderField ? `-${orderField}` : ''), source: field.name, sortable: !!orderField, sortBy: orderField, resource: props.resource }));
        });
        displayOverrideCode(getOverrideCode(schema, readableFields));
    }
    return (React.createElement(List, Object.assign({}, props),
        React.createElement(Datagrid, { bulkActionButtons: bulkActionButtons, rowClick: rowClick, rowStyle: rowStyle, isRowSelectable: isRowSelectable, isRowExpandable: isRowExpandable, body: body, header: header, empty: empty, hover: hover, expand: expand, optimized: optimized, size: size, sx: datagridSx },
            fieldChildren,
            hasShow && React.createElement(ShowButton, null),
            hasEdit && React.createElement(EditButton, null))));
};
const ListGuesser = (_a) => {
    var { filters = React.createElement(FilterGuesser, null) } = _a, props = __rest(_a, ["filters"]);
    const resource = useResourceContext(props);
    return (React.createElement(Introspecter, Object.assign({ component: IntrospectedListGuesser, resource: resource, filters: filters }, props)));
};
/* eslint-disable tree-shaking/no-side-effects-in-initialization */
ListGuesser.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    resource: PropTypes.string,
    filters: PropTypes.element,
    hasShow: PropTypes.bool,
    hasEdit: PropTypes.bool,
    rowClick: PropTypes.string,
};
/* eslint-enable tree-shaking/no-side-effects-in-initialization */
export default ListGuesser;
//# sourceMappingURL=ListGuesser.js.map