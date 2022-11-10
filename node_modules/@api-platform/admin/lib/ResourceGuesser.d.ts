/// <reference types="react" />
import PropTypes from 'prop-types';
import type { ResourceDefinition, ResourceProps } from 'react-admin';
import type { IntrospectedResourceGuesserProps, ResourceGuesserProps } from './types.js';
export declare const IntrospectedResourceGuesser: ({ resource, schema, schemaAnalyzer, list, edit, create, show, ...props }: IntrospectedResourceGuesserProps) => JSX.Element;
declare const ResourceGuesser: {
    ({ name, ...props }: ResourceGuesserProps): JSX.Element;
    raName: string;
    registerResource(props: ResourceProps): ResourceDefinition;
    propTypes: {
        name: PropTypes.Validator<string>;
    };
};
export default ResourceGuesser;
//# sourceMappingURL=ResourceGuesser.d.ts.map