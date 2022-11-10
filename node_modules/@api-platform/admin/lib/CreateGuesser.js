var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Create, FileInput, FormTab, SimpleForm, TabbedForm, useCreate, useNotify, useRedirect, useResourceContext, } from 'react-admin';
import InputGuesser from './InputGuesser.js';
import Introspecter from './Introspecter.js';
import useDisplayOverrideCode from './useDisplayOverrideCode.js';
const getOverrideCode = (schema, fields) => {
    let code = 'If you want to override at least one input, paste this content in the <CreateGuesser> component of your resource:\n\n';
    code += `const ${schema.title}Create = props => (\n`;
    code += `    <CreateGuesser {...props}>\n`;
    fields.forEach((field) => {
        code += `        <InputGuesser source={"${field.name}"} />\n`;
    });
    code += `    </CreateGuesser>\n`;
    code += `);\n`;
    code += `\n`;
    code += `And don't forget update your <ResourceGuesser> component:\n`;
    code += `<ResourceGuesser name={"${schema.name}"} create={${schema.title}Create} />`;
    return code;
};
export const IntrospectedCreateGuesser = (_a) => {
    var { fields, readableFields, writableFields, schema, schemaAnalyzer, resource, mutationOptions, redirect: redirectTo = 'list', mode, defaultValues, transform, validate, toolbar, warnWhenUnsavedChanges, sanitizeEmptyValues = true, formComponent, children } = _a, props = __rest(_a, ["fields", "readableFields", "writableFields", "schema", "schemaAnalyzer", "resource", "mutationOptions", "redirect", "mode", "defaultValues", "transform", "validate", "toolbar", "warnWhenUnsavedChanges", "sanitizeEmptyValues", "formComponent", "children"]);
    const [create] = useCreate();
    const notify = useNotify();
    const redirect = useRedirect();
    const displayOverrideCode = useDisplayOverrideCode();
    let inputChildren = React.Children.toArray(children);
    if (inputChildren.length === 0) {
        inputChildren = writableFields.map((field) => (React.createElement(InputGuesser, { key: field.name, source: field.name })));
        displayOverrideCode(getOverrideCode(schema, writableFields));
    }
    const hasFileFieldElement = (elements) => elements.some((child) => React.isValidElement(child) &&
        (child.type === FileInput ||
            hasFileFieldElement(React.Children.toArray(child.props.children))));
    const hasFileField = hasFileFieldElement(inputChildren);
    const save = useCallback((values) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        let data = values;
        if (transform) {
            data = transform(values);
        }
        try {
            const response = yield create(resource, {
                data: Object.assign(Object.assign({}, data), { extraInformation: { hasFileField } }),
            }, { returnPromise: true });
            const success = (_b = mutationOptions === null || mutationOptions === void 0 ? void 0 : mutationOptions.onSuccess) !== null && _b !== void 0 ? _b : ((newRecord) => {
                notify('ra.notification.created', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                });
                redirect(redirectTo, resource, newRecord.id, newRecord);
            });
            success(response, { data: response }, {});
            return undefined;
        }
        catch (mutateError) {
            const submissionErrors = schemaAnalyzer.getSubmissionErrors(mutateError);
            const failure = (_c = mutationOptions === null || mutationOptions === void 0 ? void 0 : mutationOptions.onError) !== null && _c !== void 0 ? _c : ((error) => {
                let message = 'ra.notification.http_error';
                if (!submissionErrors) {
                    message =
                        typeof error === 'string' ? error : error.message || message;
                }
                let errorMessage;
                if (typeof error === 'string') {
                    errorMessage = error;
                }
                else if (error === null || error === void 0 ? void 0 : error.message) {
                    errorMessage = error.message;
                }
                notify(message, {
                    type: 'warning',
                    messageArgs: { _: errorMessage },
                });
            });
            failure(mutateError, { data: values }, {});
            if (submissionErrors) {
                return submissionErrors;
            }
            return {};
        }
    }), [
        create,
        hasFileField,
        resource,
        mutationOptions,
        notify,
        redirect,
        redirectTo,
        schemaAnalyzer,
        transform,
    ]);
    const hasFormTab = inputChildren.some((child) => typeof child === 'object' && 'type' in child && child.type === FormTab);
    const FormType = hasFormTab ? TabbedForm : SimpleForm;
    return (React.createElement(Create, Object.assign({ resource: resource }, props),
        React.createElement(FormType, { onSubmit: save, mode: mode, defaultValues: defaultValues, validate: validate, toolbar: toolbar, warnWhenUnsavedChanges: warnWhenUnsavedChanges, sanitizeEmptyValues: sanitizeEmptyValues, component: formComponent }, inputChildren)));
};
const CreateGuesser = (props) => {
    const resource = useResourceContext(props);
    return (React.createElement(Introspecter, Object.assign({ component: IntrospectedCreateGuesser, resource: resource }, props)));
};
/* eslint-disable tree-shaking/no-side-effects-in-initialization */
CreateGuesser.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    resource: PropTypes.string,
};
/* eslint-enable tree-shaking/no-side-effects-in-initialization */
export default CreateGuesser;
//# sourceMappingURL=CreateGuesser.js.map