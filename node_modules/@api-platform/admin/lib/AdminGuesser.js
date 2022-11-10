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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Admin, ComponentPropType, I18nContextProvider, Loading, ThemeProvider, defaultI18nProvider, } from 'react-admin';
import { createHashHistory, createMemoryHistory } from 'history';
import { ErrorBoundary } from 'react-error-boundary';
import IntrospectionContext from './IntrospectionContext.js';
import ResourceGuesser from './ResourceGuesser.js';
import SchemaAnalyzerContext from './SchemaAnalyzerContext.js';
import { Error as DefaultError, Layout, LoginPage, lightTheme, } from './layout/index.js';
import getRoutesAndResourcesFromNodes, { isSingleChildFunction, } from './getRoutesAndResourcesFromNodes.js';
import useDisplayOverrideCode from './useDisplayOverrideCode.js';
const getOverrideCode = (resources) => {
    let code = 'If you want to override at least one resource, paste this content in the <AdminGuesser> component of your app:\n\n';
    resources.forEach((r) => {
        code += `<ResourceGuesser name={"${r.name}"} />\n`;
    });
    return code;
};
/**
 * AdminResourcesGuesser automatically renders an `<AdminUI>` component for resources exposed by a web API documented with Hydra, OpenAPI or any other format supported by `@api-platform/api-doc-parser`.
 * If child components are passed (usually `<ResourceGuesser>` or `<Resource>` components, but it can be any other React component), they are rendered in the given order.
 * If no children are passed, a `<ResourceGuesser>` component is created for each resource type exposed by the API, in the order they are specified in the API documentation.
 */
export const AdminResourcesGuesser = (_a) => {
    var { 
    // Admin props
    loadingPage: LoadingPage = Loading, admin: AdminEl = Admin, 
    // Props
    children, includeDeprecated, resources, loading } = _a, rest = __rest(_a, ["loadingPage", "admin", "children", "includeDeprecated", "resources", "loading"]);
    const displayOverrideCode = useDisplayOverrideCode();
    if (loading) {
        return React.createElement(LoadingPage, null);
    }
    let adminChildren = children;
    const { resources: resourceChildren, customRoutes } = getRoutesAndResourcesFromNodes(children);
    if (!isSingleChildFunction(adminChildren) &&
        resourceChildren.length === 0 &&
        resources) {
        const guessResources = includeDeprecated
            ? resources
            : resources.filter((r) => !r.deprecated);
        adminChildren = [
            ...customRoutes,
            ...guessResources.map((r) => (React.createElement(ResourceGuesser, { name: r.name, key: r.name }))),
        ];
        displayOverrideCode(getOverrideCode(guessResources));
    }
    return (React.createElement(AdminEl, Object.assign({ loading: LoadingPage }, rest), adminChildren));
};
const AdminGuesser = (_a) => {
    var { 
    // Props for SchemaAnalyzerContext
    schemaAnalyzer, 
    // Props for AdminResourcesGuesser
    includeDeprecated = false, 
    // Admin props
    dataProvider, history, layout = Layout, loginPage = LoginPage, loading: loadingPage, theme = lightTheme, 
    // Other props
    children } = _a, rest = __rest(_a, ["schemaAnalyzer", "includeDeprecated", "dataProvider", "history", "layout", "loginPage", "loading", "theme", "children"]);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState();
    const [introspect, setIntrospect] = useState(true);
    let adminHistory = history;
    if (!adminHistory) {
        adminHistory =
            typeof window === 'undefined'
                ? createMemoryHistory()
                : createHashHistory();
    }
    useEffect(() => {
        if (typeof dataProvider.introspect !== 'function') {
            throw new Error('The given dataProvider needs to expose an "introspect" function returning a parsed API documentation from api-doc-parser');
        }
        if (!introspect) {
            return;
        }
        dataProvider
            .introspect()
            .then(({ data }) => {
            var _a;
            setResources((_a = data.resources) !== null && _a !== void 0 ? _a : []);
            setIntrospect(false);
            setLoading(false);
        })
            .catch((error) => {
            // Allow error to be caught by the error boundary
            setError(() => {
                throw error;
            });
        });
    }, [introspect, dataProvider]);
    const introspectionContext = useMemo(() => ({
        introspect: () => {
            setLoading(true);
            setIntrospect(true);
        },
    }), [setLoading, setIntrospect]);
    return (React.createElement(IntrospectionContext.Provider, { value: introspectionContext },
        React.createElement(SchemaAnalyzerContext.Provider, { value: schemaAnalyzer },
            React.createElement(AdminResourcesGuesser, Object.assign({ includeDeprecated: includeDeprecated, resources: resources, loading: loading, dataProvider: dataProvider, history: adminHistory, layout: layout, loginPage: loginPage, loadingPage: loadingPage, theme: theme }, rest), children))));
};
/* eslint-disable tree-shaking/no-side-effects-in-initialization */
AdminGuesser.propTypes = {
    dataProvider: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
        .isRequired,
    authProvider: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    i18nProvider: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    history: PropTypes.object,
    customSagas: PropTypes.array,
    initialState: PropTypes.object,
    schemaAnalyzer: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    theme: PropTypes.object,
    includeDeprecated: PropTypes.bool,
};
/* eslint-enable tree-shaking/no-side-effects-in-initialization */
const AdminGuesserWithError = (_a) => {
    var { error: ErrorComponent = DefaultError, i18nProvider = defaultI18nProvider, theme = lightTheme } = _a, props = __rest(_a, ["error", "i18nProvider", "theme"]);
    const [errorInfo, setErrorInfo] = useState();
    const handleError = (_error, info) => {
        setErrorInfo(info);
    };
    const renderError = useCallback((fallbackRenderProps) => (React.createElement(ErrorComponent, Object.assign({}, fallbackRenderProps, { errorInfo: errorInfo }))), [ErrorComponent, errorInfo]);
    return (React.createElement(I18nContextProvider, { value: i18nProvider },
        React.createElement(ThemeProvider, { theme: theme },
            React.createElement(ErrorBoundary, { onError: handleError, fallbackRender: renderError },
                React.createElement(AdminGuesser, Object.assign({}, props, { i18nProvider: i18nProvider, theme: theme }))))));
};
AdminGuesserWithError.propTypes = {
    error: ComponentPropType,
};
export default AdminGuesserWithError;
//# sourceMappingURL=AdminGuesser.js.map