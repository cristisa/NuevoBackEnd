/// <reference types="react" />
import PropTypes from 'prop-types';
import type { FieldGuesserProps, IntrospectedFieldGuesserProps } from './types.js';
export declare const IntrospectedFieldGuesser: ({ fields, readableFields, writableFields, schema, schemaAnalyzer, ...props }: IntrospectedFieldGuesserProps) => JSX.Element | null;
declare const FieldGuesser: {
    (props: FieldGuesserProps): JSX.Element;
    propTypes: {
        source: PropTypes.Validator<string>;
        resource: PropTypes.Requireable<string>;
        sortable: PropTypes.Requireable<boolean>;
        sortBy: PropTypes.Requireable<string>;
    };
};
export default FieldGuesser;
//# sourceMappingURL=FieldGuesser.d.ts.map