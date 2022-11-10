import React from 'react';
import { Layout } from 'react-admin';
import AppBar from './AppBar.js';
import DefaultError from './Error.js';
const CustomLayout = (props) => (React.createElement(Layout, Object.assign({ appBar: AppBar, error: DefaultError }, props)));
export default CustomLayout;
//# sourceMappingURL=Layout.js.map