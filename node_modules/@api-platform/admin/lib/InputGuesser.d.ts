/// <reference types="react" />
import PropTypes from 'prop-types';
import type { InputGuesserProps, IntrospectedInputGuesserProps } from './types.js';
export declare const IntrospectedInputGuesser: ({ fields, readableFields, writableFields, schema, schemaAnalyzer, validate, transformEnum, ...props }: IntrospectedInputGuesserProps) => JSX.Element | null;
declare const InputGuesser: {
    (props: InputGuesserProps): JSX.Element;
    propTypes: {
        source: PropTypes.Validator<string>;
        alwaysOn: PropTypes.Requireable<boolean>;
    };
};
export default InputGuesser;
//# sourceMappingURL=InputGuesser.d.ts.map