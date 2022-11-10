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
import React from 'react';
import { AppBar, AppBarClasses, ToggleThemeButton, useAuthProvider, } from 'react-admin';
import { Box, Typography } from '@mui/material';
import Logo from './Logo.js';
import { darkTheme, lightTheme } from './themes.js';
const CustomAppBar = (_a) => {
    var { classes, userMenu } = _a, props = __rest(_a, ["classes", "userMenu"]);
    const authProvider = useAuthProvider();
    return (React.createElement(AppBar, Object.assign({ userMenu: userMenu !== null && userMenu !== void 0 ? userMenu : !!authProvider }, props),
        React.createElement(Typography, { variant: "h6", color: "inherit", className: AppBarClasses.title, id: "react-admin-title" }),
        React.createElement(Logo, null),
        React.createElement(Box, { component: "span", sx: { flex: 1 } }),
        React.createElement(ToggleThemeButton, { lightTheme: lightTheme, darkTheme: darkTheme })));
};
export default CustomAppBar;
//# sourceMappingURL=AppBar.js.map