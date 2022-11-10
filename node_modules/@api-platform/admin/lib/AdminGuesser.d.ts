import type { ComponentType } from 'react';
import type { AdminProps, ErrorProps } from 'react-admin';
import type { Resource } from '@api-platform/api-doc-parser';
import type { ApiPlatformAdminDataProvider, SchemaAnalyzer } from './types.js';
export interface AdminGuesserProps extends AdminProps {
    dataProvider: ApiPlatformAdminDataProvider;
    schemaAnalyzer: SchemaAnalyzer;
    includeDeprecated?: boolean;
}
interface AdminGuesserWithErrorProps extends AdminGuesserProps {
    error?: ComponentType<ErrorProps>;
}
interface AdminResourcesGuesserProps extends Omit<AdminProps, 'loading'> {
    admin?: ComponentType<AdminProps>;
    includeDeprecated: boolean;
    loading: boolean;
    loadingPage?: ComponentType;
    resources: Resource[];
}
/**
 * AdminResourcesGuesser automatically renders an `<AdminUI>` component for resources exposed by a web API documented with Hydra, OpenAPI or any other format supported by `@api-platform/api-doc-parser`.
 * If child components are passed (usually `<ResourceGuesser>` or `<Resource>` components, but it can be any other React component), they are rendered in the given order.
 * If no children are passed, a `<ResourceGuesser>` component is created for each resource type exposed by the API, in the order they are specified in the API documentation.
 */
export declare const AdminResourcesGuesser: ({ loadingPage: LoadingPage, admin: AdminEl, children, includeDeprecated, resources, loading, ...rest }: AdminResourcesGuesserProps) => JSX.Element;
declare const AdminGuesserWithError: {
    ({ error: ErrorComponent, i18nProvider, theme, ...props }: AdminGuesserWithErrorProps): JSX.Element;
    propTypes: {
        error: (props: any, propName: any, componentName: any) => Error;
    };
};
export default AdminGuesserWithError;
//# sourceMappingURL=AdminGuesser.d.ts.map