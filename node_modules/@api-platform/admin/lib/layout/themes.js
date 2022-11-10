import { defaultTheme } from 'react-admin';
export const darkTheme = Object.assign(Object.assign({}, defaultTheme), { palette: Object.assign(Object.assign({}, defaultTheme.palette), { background: {
            default: '#424242',
        }, primary: {
            contrastText: '#ffffff',
            main: '#52c9d4',
            light: '#9bf5fe',
            dark: '#21a1ae',
        }, secondary: Object.assign(Object.assign({}, defaultTheme.palette.secondary), { main: '#51b2bc' }), mode: 'dark' }), components: Object.assign(Object.assign({}, defaultTheme.components), { 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore react-admin doesn't add its own components
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    borderLeft: '3px solid #000',
                    '&.RaMenuItemLink-active': {
                        borderLeft: '3px solid #52c9d4',
                    },
                },
            },
        } }) });
export const lightTheme = Object.assign(Object.assign({}, defaultTheme), { palette: Object.assign(Object.assign({}, defaultTheme.palette), { primary: {
            contrastText: '#ffffff',
            main: '#38a9b4',
            light: '#74dde7',
            dark: '#006a75',
        }, secondary: Object.assign(Object.assign({}, defaultTheme.palette.secondary), { main: '#288690' }), mode: 'light' }), components: Object.assign(Object.assign({}, defaultTheme.components), { 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore react-admin doesn't add its own components
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    borderLeft: '3px solid #fff',
                    '&.RaMenuItemLink-active': {
                        borderLeft: '3px solid #38a9b4',
                    },
                },
            },
        } }) });
//# sourceMappingURL=themes.js.map