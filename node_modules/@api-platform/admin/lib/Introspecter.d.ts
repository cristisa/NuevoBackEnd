/// <reference types="react" />
import PropTypes from 'prop-types';
import type { IntrospecterProps } from './types.js';
declare const Introspecter: {
    ({ component, includeDeprecated, resource, ...rest }: IntrospecterProps): JSX.Element | null;
    propTypes: {
        component: PropTypes.Validator<NonNullable<PropTypes.ReactComponentLike>>;
        includeDeprecated: PropTypes.Requireable<boolean>;
        resource: PropTypes.Requireable<string>;
    };
};
export default Introspecter;
//# sourceMappingURL=Introspecter.d.ts.map